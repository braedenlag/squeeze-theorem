const selfie = {};
selfie.startup = () => {
    selfie.video = document.getElementById("cameraView");
    selfie.canvas = document.getElementById("selfieGIF");
    selfie.ctx = selfie.canvas.getContext("2d");
    selfie.overlay = document.getElementById("selfieOverlay");
    selfie.octx = selfie.overlay.getContext("2d");
    
    selfie.frame = 0;
    selfie.gifLength = 31; //number of frames

    selfie.recording = false;
    document.getElementById("startSelfie").onclick = selfie.getCamera;
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

selfie.startCountdown = () => {
    selfie.gif = new GIF({
        workers: 5,
        quality: 100,
        worker: 'gif.worker.js'
    });
    selfie.gif.on('finished', function(blob) {
        window.open(URL.createObjectURL(blob));
        selfie.ctx.clearRect(0, 0, selfie.canvas.width, selfie.canvas.height);
        selfie.octx.clearRect(0, 0, selfie.overlay.width, selfie.overlay.height);
    });
    selfie.recording = true;
    selfie.interval = setInterval(selfie.drawFrame, 100); //10 fps
}

selfie.drawFrame = () => {
    console.log(performance.now())
    const video = selfie.video
    const ctx = selfie.ctx;
    const canvas = selfie.canvas;
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
        selfie.gif.addFrame(canvas, {copy: true, delay: 10});
        
        //circular progress bar
        const startingAngle = 3 * Math.PI / 2;
        selfie.octx.beginPath();
        selfie.octx.lineWidth = 8;
        selfie.octx.arc(canvas.width/2, canvas.height/2, canvas.height/2 - 5, startingAngle, startingAngle + Math.PI * 2 / selfie.gifLength * selfie.frame);
        selfie.octx.strokeStyle = "rgb(240, 97, 97)";
        selfie.octx.stroke();
        selfie.octx.closePath();

        if(selfie.frame >= selfie.gifLength) {
            selfie.gif.render();
            clearInterval(selfie.interval);
            selfie.frame = 0;
            selfie.recording = false;
            selfie.video.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    }
}

window.onload = selfie.startup;

