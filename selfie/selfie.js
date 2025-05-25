const selfie = {};

selfie.startup = () => {
    selfie.video = document.getElementById("cameraView");
    selfie.result = document.getElementById("selfieResult");
    selfie.canvas = document.getElementById("selfieGIF");
    selfie.ctx = selfie.canvas.getContext("2d", { willReadFrequently: true });
    selfie.overlay = document.getElementById("selfieOverlay");
    selfie.octx = selfie.overlay.getContext("2d", { willReadFrequently: true });
    selfie.timeout = 3000;
    selfie.timeoutStart;
    document.getElementById("stopSelfie").onclick = selfie.removeCamera;
    
    selfie.frame = 0;
    selfie.gifLength = 31; //number of frames
    selfie.delay = 100;

    selfie.gif = new GIF({
        workers: 10,
        quality: 300,
        width: 450,
        height: 450,
        dispose: 2,
        transparent: "#FFFFFF",
        dither: 'Atkinson',
        worker: 'gif.worker.js'
    });
    selfie.gif.on('finished', function(blob) {
        selfie.result.src = (URL.createObjectURL(blob));
        document.getElementById("downloadLink").href = selfie.result.src;
        document.getElementById("downloadLink").setAttribute("data-disabled", "false");
        document.getElementById("startSelfie").setAttribute("data-disabled", "false");
        selfie.ctx.clearRect(0, 0, selfie.canvas.width, selfie.canvas.height);
        selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
        selfie.canvas.setAttribute("data-processing", "false");
        document.getElementById("loadingcontainer").style.visibility = "hidden";
        //mark render as finished so it can properly run again
        selfie.gif.running = false;
        selfie.gif.frames = [];
    });

    selfie.recording = false;
    document.getElementById("startSelfie").onclick = selfie.getCamera;
}

selfie.getCamera = () => {
    if(selfie.recording) return;
    document.getElementById("stopSelfie").setAttribute("data-disabled", "false")
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
        selfie.video.srcObject = stream;
        selfie.video.play();
        selfie.video.removeEventListener('loadeddata', selfie.startCountdown);
        selfie.video.addEventListener('loadeddata', selfie.startCountdown);
    })
    .catch((err) => {
        alert(`An error occurred: ${err}`);
    });
}

selfie.removeCamera = () => {
    if(document.getElementById("stopSelfie").getAttribute("data-disabled") == "true") return;
    selfie.video.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });
    document.getElementById("stopSelfie").setAttribute("data-disabled", "true")
}

selfie.startCountdown = () => {
    document.getElementById("downloadLink").removeAttribute("href");
    document.getElementById("downloadLink").setAttribute("data-disabled", "true");
    document.getElementById("startSelfie").setAttribute("data-disabled", "true");
    document.getElementById("stopSelfie").setAttribute("data-disabled", "true");
    selfie.timeout = 3000 + selfie.delay;
    selfie.timeoutStart = performance.now();
    selfie.canvas.setAttribute("data-processing", "true");
    clearInterval(selfie.interval)
    selfie.interval = setInterval(selfie.drawFrame, selfie.delay);
}

selfie.drawFrame = () => {
    const video = selfie.video
    const ctx = selfie.ctx;
    const canvas = selfie.canvas;

    if(selfie.timeout > 0) {
        selfie.timeout -= selfie.delay;
        selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
        selfie.octx.font = "100px formiga";
        selfie.octx.fillStyle = "white";
        selfie.octx.fillText(Math.round(selfie.timeout / 1000), selfie.overlay.width / 2 - 30, selfie.overlay.height / 2 + 30);

        if(selfie.timeout <= 0) {
            selfie.recording = true;
            selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
            selfie.canvas.setAttribute("data-processing", "false");
        }
    }

    selfie.result.src = "";

    if(video.videoWidth > video.videoHeight) {
        //keep height same, center horizontally
        const scale = video.videoWidth / video.videoHeight;
        const offset = (canvas.width - (canvas.height * scale)) / 2;
        ctx.drawImage(video, offset, 0, canvas.height * scale, canvas.height);
    } else {
        //keep width same, center vertically
        const scale = video.videoHeight / video.videoWidth;
        const offset = (canvas.height - (canvas.width * scale)) / 2;
        ctx.drawImage(video, 0, offset, canvas.width, canvas.width * scale);
    }
    //circle boundary
    ctx.globalCompositeOperation='destination-in';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation='source-over';
    
    if(selfie.recording) {
        selfie.frame++;
        selfie.gif.addFrame(canvas, {copy: true, delay: selfie.delay});
        
        //circular progress bar
        const startingAngle = 3 * Math.PI / 2;
        selfie.octx.beginPath();
        selfie.octx.lineWidth = 8;
        selfie.octx.arc(canvas.width/2, canvas.height/2, canvas.height/2 - 5, startingAngle, (startingAngle + 0.001) + ((Math.PI * 2) / selfie.gifLength * selfie.frame));
        selfie.octx.strokeStyle = "rgb(240, 97, 97)";
        selfie.octx.stroke();
        selfie.octx.closePath();

        if(selfie.frame >= selfie.gifLength) {
            selfie.canvas.setAttribute("data-processing", "true");
            document.getElementById("stopSelfie").setAttribute("data-disabled", "false");
            document.getElementById("loadingcontainer").style.visibility = "visible";
            selfie.gif.render();
            clearInterval(selfie.interval);
            selfie.frame = 0;
            selfie.recording = false;
        }
    }
}

window.onload = selfie.startup;

