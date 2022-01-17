status ="";
function setup() {
    canvas = createCanvas(480,380);
    canvas.position(500,110);
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    input = document.getElementById("input").value;
}
function draw(){
    image(video, 0,0,480,380)
}