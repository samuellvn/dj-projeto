var canvas;
var video;
var posenet;
var nariz_x;
var nariz_y;
var pulso_esq_x;
var pulso_dir_x;
var diferenca;

function setup(){
    canvas=createCanvas(500, 300);
    canvas.position(560, 150);
    video=createCapture(VIDEO);
    video.size(500, 300);
    posenet=ml5.poseNet(video, model_loded);
    posenet.on("pose", got_poses);
}
function model_loded(){
    console.log("posenet foi inicializado");
}
function got_poses(results){
    if(results.length>0){
        console.log(results);
        nariz_x=results[0].pose.nose.x;
        nariz_y=results[0].pose.nose.y;
        pulso_esq_x=results[0].pose.leftWrist.x;
        pulso_dir_x=results[0].pose.rightWrist.x;
        diferenca=floor(pulso_esq_x-pulso_dir_x);
    }
}
function draw(){
   background("white");
   textSize(diferenca);
   fill("black")
   text("sei que nada sei",pulso_dir_x=100,pulso_esq_x=100);
}
