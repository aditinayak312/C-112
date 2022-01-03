Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("cam");
Webcam.attach("#cam");

function start(){
    Webcam.snap(function(data_uri){
        document.getElementById("picture").innerHTML="<img id='selfie' src='"+data_uri+"'>";
    });
}

console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J62utMnUe/model.json",modelloaded);
function modelloaded(){
console.log("model loaded");
}

prediction1="";
prediction2="";

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is "+prediction1;
    speak_data_2="the second prediction is "+prediction2;
    utterthis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    utterthis.rate=0.5;
    synth.speak(utterthis);
}

function predict(){
     var img=document.getElementById("selfie");
     classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotionresult").innerHTML=results[0].label;
        document.getElementById("emotionresult2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        
        if(results[0].label=="happy"){
            document.getElementById("emojiresult").innerHTML="&#128512;";
        }

        if(results[0].label=="sad"){
            document.getElementById("emojiresult").innerHTML="&#128542;";
        }

        if(results[0].label=="angry"){
            document.getElementById("emojiresult").innerHTML="&#128544;";
        }

        if(results[0].label=="thumbs up"){
            document.getElementById("emojiresult").innerHTML="&#128077;";
        }

        if(results[1].label=="happy"){
            document.getElementById("emojiresult2").innerHTML="&#128512;";
        }
        if(results[1].label=="sad"){
            document.getElementById("emojiresult2").innerHTML="&#128542;";
        }
        if(results[1].label=="angry"){
            document.getElementById("emojiresult2").innerHTML="&#128544;";
        }
        if(results[1].label=="thumbs up"){
            document.getElementById("emojiresult2").innerHTML="&#128077;";
        }
    }
}