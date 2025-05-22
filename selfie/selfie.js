const selfie = {};
selfie.startup = () => {
    video = document.getElementById("cameraView");
    canvas = document.getElementById("selfieGIF")
    ctx = canvas.getContext("2d");
    selfie.getCamera();
}
selfie.getCamera = () => {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        video.addEventListener('loadeddata', () => {
            selfie.drawFrame(video);
          });
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });
}

selfie.drawFrame = (video) => {
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
    ctx.globalCompositeOperation='destination-in';
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,canvas.height/2,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
}

window.onload = selfie.startup;

