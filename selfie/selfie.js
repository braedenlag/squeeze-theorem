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
        ctx.drawImage(video, 0, 0);
        console.log(canvas.toDataURL("image/png"));
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });
}

window.onload = selfie.startup;

