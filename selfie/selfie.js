const selfie = {};

selfie.startup = () => {
    selfie.video = document.getElementById("cameraView");
    selfie.result = document.getElementById("selfieResult");
    selfie.canvas = document.getElementById("selfieGIF");
    selfie.ctx = selfie.canvas.getContext("2d", { willReadFrequently: true });
    selfie.overlay = document.getElementById("selfieOverlay");
    selfie.octx = selfie.overlay.getContext("2d", { willReadFrequently: true });
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
        dither: 'Atkinson',
        worker: 'gif.worker.js'
    });
    
    selfie.originalGif = {};

    selfie.gif.on('finished', function(blob) {
        selfie.result.src = (URL.createObjectURL(blob));
        document.getElementById("downloadLink").href = selfie.result.src;
        document.getElementById("downloadLink").setAttribute("data-disabled", "false");
        document.getElementById("startSelfie").setAttribute("data-disabled", "false");
        document.getElementById("selfie-filter").disabled = false;
        selfie.ctx.clearRect(0, 0, selfie.canvas.width, selfie.canvas.height);
        selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
        selfie.canvas.setAttribute("data-processing", "false");
        document.getElementById("loadingcontainer").style.visibility = "hidden";
        selfie.gif.running = false;
    });

    selfie.recording = false;
    document.getElementById("startSelfie").onclick = selfie.getCamera;

    document.getElementById("selfie-filter").onchange = () => {
        if(document.getElementById("selfieResult").src == "") return;
        selfie.doRender();
    }
}

selfie.getCamera = () => {
    if(selfie.recording) return;
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
    selfie.timeout = 3000;
    //mark render as finished so it can properly run again
    selfie.gif.frames = [];
    selfie.originalGif.frames = [];

    document.getElementById("downloadLink").removeAttribute("href");
    document.getElementById("downloadLink").setAttribute("data-disabled", "true");
    document.getElementById("startSelfie").setAttribute("data-disabled", "true");
    document.getElementById("stopSelfie").setAttribute("data-disabled", "true");
    document.getElementById("selfie-filter").disabled = true;
    selfie.timeout += selfie.delay;
    selfie.timeoutStart = performance.now();
    selfie.canvas.setAttribute("data-processing", "true");
    clearInterval(selfie.interval)
    selfie.interval = setInterval(selfie.drawFrame, selfie.delay);
}

selfie.applyFilter = () => {
    const selectedFilter = document.getElementById("selfie-filter").value;
    switch (selectedFilter) {
        case "no-filter":
            selfie.revert();
            break;
        case "grayscale":
            selfie.grayscale();
            break;
        case "night-vision":
            selfie.nightVision();
            break;
        case "invert":
            selfie.invert();
            break;
    }
}

selfie.revert = () => {
    for(let i = 0; i < selfie.originalGif.frames.length; i++)
    {
        let data = selfie.originalGif.frames[i].data;
        selfie.gif.frames[i].data = new Uint8ClampedArray(data);;
    }
}

selfie.grayscale = () => {
    for(let i = 0; i < selfie.originalGif.frames.length; i++)
    {
        let data = new Uint8ClampedArray(selfie.originalGif.frames[i].data);
        for (let j = 0; j < data.length; j += 4) {
            let gray = (data[j] + data[j+1] + data[j+2]) / 3
            data[j] = gray; // red
            data[j + 1] = gray; // green
            data[j + 2] = gray; // blue
        }
        selfie.gif.frames[i].data = new Uint8ClampedArray(data);;
    }
}

selfie.nightVision = () => {
    for(let i = 0; i < selfie.originalGif.frames.length; i++)
    {
        let data = new Uint8ClampedArray(selfie.originalGif.frames[i].data);
        for (let j = 0; j < data.length; j += 4) {
            let gray = ((data[j] + data[j+1] + data[j+2]) / 3) * (Math.random() * (0.7 - 0.5) + 0.5);
            data[j] = gray * 0.5; // red
            data[j + 1] = gray * 2; // green
            data[j + 2] = gray * 0.5; // blue
        }
        selfie.gif.frames[i].data = new Uint8ClampedArray(data);;
    }
}

selfie.invert = () => {
    for(let i = 0; i < selfie.originalGif.frames.length; i++)
    {
        let data = new Uint8ClampedArray(selfie.originalGif.frames[i].data);
        for (let j = 0; j < data.length; j += 4) {
            data[j] = 255 - data[j]; // red
            data[j + 1] = 255 - data[j + 1]; // green
            data[j + 2] = 255 - data[j + 2]; // blue
        }
        selfie.gif.frames[i].data = new Uint8ClampedArray(data);;
    }
}

selfie.drawFrame = () => {
    let video = selfie.video
    const ctx = selfie.ctx;
    const canvas = selfie.canvas;

    if(selfie.timeout > 0) {
        selfie.timeout -= selfie.delay;
        selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
        selfie.octx.font = "100px formiga";
        selfie.octx.fillStyle = "white";
        selfie.octx.textAlign = "center";
        selfie.octx.textBaseline = "middle";
        selfie.result.src = ""
        selfie.octx.fillText(Math.ceil(selfie.timeout / 1000), selfie.overlay.width / 2, selfie.overlay.height / 2);

        if(selfie.timeout <= 0) {
            selfie.recording = true;
            selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
            selfie.canvas.setAttribute("data-processing", "false");
        }
    }

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
        const imageData = selfie.ctx.getImageData(0, 0, selfie.canvas.width, selfie.canvas.height);
        selfie.originalGif.frames.push({ data: new Uint8ClampedArray(imageData.data), delay: selfie.delay });
        //circular progress bar
        const startingAngle = 3 * Math.PI / 2;
        selfie.octx.beginPath();
        selfie.octx.lineWidth = 8;
        selfie.octx.arc(canvas.width/2, canvas.height/2, canvas.height/2 - 5, startingAngle, (startingAngle + 0.001) + ((Math.PI * 2) / selfie.gifLength * selfie.frame));
        selfie.octx.strokeStyle = "rgb(240, 97, 97)";
        selfie.octx.stroke();
        selfie.octx.closePath();

        if(selfie.frame >= selfie.gifLength) {
            selfie.doRender();
        }
    }
}

selfie.doRender = () => {
    selfie.result.src = "";
    selfie.canvas.setAttribute("data-processing", "true");
    document.getElementById("selfie-filter").disabled = true;
    document.getElementById("stopSelfie").setAttribute("data-disabled", "false");
    document.getElementById("loadingcontainer").style.visibility = "visible";
    selfie.applyFilter();
    selfie.gif.render();
    clearInterval(selfie.interval);
    selfie.frame = 0;
    selfie.recording = false;
}

window.onload = selfie.startup;

