prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z9bDSXJFs/model.json",modelLoaded);
//define function modelLoaded
function modelLoaded() {
    console.log("Model has been loaded.")
}
//define function check() 
function check() {
    var image = document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}

//define function gotResult(error, results)
function gotResult(error, results) {
    if(error) {
        console.log(error);
        
    }
    else {
        console.log(results);
        document.getElementById("status").innerHTML = "status:"+results[0].label;

    }
    if(results[0].label=="Proper Mask") {
        document.getElementById("update_emoji").innerHTML = "&#x1F637;";


    }
    else {
        document.getElementById("update_emoji").innerHTML = "&#x26d4;"; 
    }
}