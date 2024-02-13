var musica_play1;
var musica_play2;

var music1_status="";
var music2_status="";
var canvas;
var video;
var musica;
var pose_net;

var pulso_esqX=0;
var pulso_esqY=0;
var pulso_dirX=0;
var pulso_dirY=0;
var score_pulso_esq=0;
var score_pulso_dir=0;

function preload(){
    musica_play1=loadSound("music.mp3");
    musica_play2=loadSound("music2.mp3");
}

function setup( ){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose_net=ml5.poseNet(video, model_loaded);
    pose_net.on("pose", got_poses);
}

function got_poses(results){
    if(results.length>0){
        console.log(results);
        score_pulso_esq=results[0].pose.keypoints[9].score;
        score_pulso_dir=results[0].pose.keypoints[10].score;

        pulso_esqX=results[0].pose.leftWrist.x;
        pulso_esqY=results[0].pose.leftWrist.y;
        pulso_dirX=results[0].pose.rightWrist.x;
        pulso_dirY=results[0].pose.rightWrist.y;

        console.log("valorX do pulso esquerdo: "+pulso_esqX);
        console.log("valorY do pulso esquerdo: "+pulso_esqY);
        console.log("valorX do pulso direito: "+pulso_dirX);
        console.log("valorY do pulso direito: "+pulso_esqY);
    }


}

function model_loaded(){
    console.log("pose net foi carregado");
}



function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    music1_status=musica_play1.isPlaying();
    music2_status=musica_play2.isPlaying();
    
    if(score_pulso_esq>0.2){
        console.log("entrou1");
        circle(pulso_esqX, pulso_esqY, 20);
        musica_play1.stop();

        if(music2_status==false){
            musica_play2.play();
            document.getElementById("musica").innerHTML="tocando musica peter pan";
        }
    }
    if(score_pulso_dir>0.2){
        console.log("entrou1");
        circle(pulso_dirX, pulso_dirY, 20);
        musica_play2.stop();

        if(music1_status==false){
            musica_play1.play();
            document.getElementById("musica").innerHTML="tocando musica do harry potter";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}