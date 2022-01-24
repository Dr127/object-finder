input ="";
objects =[];
status ="";
function setup() {
    canvas = createCanvas(480,380);
    canvas.position(500,120);
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
    if(status !=""){
        objectDetector.detect(video,gotResults);
        for(i =0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Detecting Objects";

            document.getElementById("number_of_objects").innerHTML="Number of objects detected are :" + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label+percent+"%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            stroke("#FF0000")
            if(objects[i].label == input){
                video.stop()
                objectDetector.detect(gotResults);
                document.getElementById("object mentioned found");
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("object mentioned found");
                synth.speak(utterThis);
            }
        }
        
    }
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}