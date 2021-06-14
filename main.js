Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");
Webcam.attach("#camera");

prediction1 = ""
prediction2 = ""


function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedimage' src='" + data_uri + "'/>";
    });
}
console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);



function modelLoaded(){
console.log("Model Loaded");
}



function speak(){
var synth =window.speechSynthesis;
speakdata1 = "the first prediction is "+prediction1;
speakdata2 = "and the second prediction is"+prediction2;
var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
synth.speak(utterThis);
}



function check(){
img = document.getElementById("captured_image");
classifier.classify(img,gotResult);
}


function gotResult(error,results){
if(error){
console.error(error);
}else{
console.log(results);
document.getElementById("result_name").innerHTML=results[0].label;
document.getElementById("result_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if(results[0].label=="happy"){
document.getElementById("update_emoji").innerHTML="&#128522;";
}
if(results[0].label=="sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
    }
    if(results[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
            }
            if(results[1].label=="sad"){
                document.getElementById("update_emoji").innerHTML="&#128532;";
                }
                if(results[1].label=="angry"){
                    document.getElementById("update_emoji").innerHTML="&#128548;";
                    }
}
}
