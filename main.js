Love = "";
Tum = "";

RightWristX = 0;
RightWristY = 0;

LeftWristX = 0;
LeftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

Status1 = "";
Status2 = "";


function preload() {

Love = loadSound("I_Am_In_Love_With_You.mp3");
Tum = loadSound("Tum_Se_Hi.mp3");

}


function setup() {

    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}


function modelLoaded() {

    console.log("PoseNet is intialized");

}


function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist cordinates" + RightWristX + RightWristY);


        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist cordinates" + LeftWristX + LeftWristY);


        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

    }
}



function draw()
{

    background("white");
    image(video, 0, 0, 500, 500);

    Status1 = Love.isPlaying();


    fill("red");
    stroke("deep red");


    if (scoreLeftWrist > 0.2) {
        
     circle(LeftWristX, LeftWristY, 20);
     Tum.stop();

     if (Status1 == false) {

       Love.play()
       
       document.getElementById("song_name").innerHTML = "Song playing = I'm in Love with You ";


     }
    
    }



    if (scoreRightWrist > 0.2) {
        
        circle(RightWristX, RightWristY, 20);
        Love.stop();
   
        if (Status2 == false) {
   
          Tum.play()
          
          document.getElementById("song_name").innerHTML = "Song playing = Tum se Hi";
   
   
        }
       
       }

}