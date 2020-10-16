
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
   
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  obstacleImage=loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  console.log(ground.x);
  score=0;
}


function draw() {
background(900);



  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if (keyDown("space")&& monkey.y > 100){
    monkey.velocityY=-10;
  }
  
 
  
  monkey.velocityY=monkey.velocityY+0.4
  
  food();
  rocks();
  drawSprites();
  Time();
   if (obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
    ground.velocityX=0;
  }
}

function food(){
  if (frameCount%80===0){
    var banana=createSprite(400,200,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-8;
    banana.lifetime=50;
    foodGroup.add(banana);
  }
}

function rocks(){
  if (frameCount%300===0){
  var stone=createSprite(400,310,20,20);
  stone.addImage(obstacleImage);
  stone.scale=0.2;
  stone.velocityX=-5;
  stone.lifetime=80;
  obstacleGroup.add(stone);
  }
  
}

function Time(){
  var survivalTime=0;
stroke("white");
textSize(20);
text("score: "+ score,500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime,100,50);
}