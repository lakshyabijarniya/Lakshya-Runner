var runner,runnerImg;
var coin,coinImg,coinSound;
var obGroup,ob1,ob2,ob3;
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,invisibleGround;
var coinGroup,coinImage;
var score=0;
var gameOverImg,gameOver,gameOverSound;
var restart,restartImg;
var life=5;



function preload(){
  runnerImg=loadImage("run run run.png");
  coinImg=loadImage("coin100.png");
  ob1=loadImage("bike100.png");
  ob2=loadImage("color car 1000 edit.png");
  ob3=loadImage("monster100.png");
  gameOverImg=loadImage("game-over-3.jpg");
  restartImg=loadImage("restart2.png");
  coinSound=loadSound("Coin-pick-up-sound-effect.mp3");
  gameOverSound=loadSound("salamisound-3019782-slight-impact-with-sheet.mp3")
  
 
  

}

function setup() {
  createCanvas(400,400);
  runner=createSprite(35,330);
  runner.addImage("run",runnerImg);
  runner.scale=0.2;
  
  ground=createSprite(50,375,800,20);
  ground.x=ground.width/2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver=createSprite(200,150);
  gameOver.addImage("replay",gameOverImg)
  gameOver.scale=0.5;
  
  restart=createSprite(200,250);
  restart.addImage("over",restartImg);
  restart.scale=0.1;
  
  gameOver.visible=false;
  restart.visible=false;
  
  coinsGroup=new Group();
  obGroup=new Group();
  
  score=0;
  
}

function draw() {
  background("lightgreen");
  text("score="+score,200,30)
  
  drawSprites();
  
 
if(gameState===PLAY){
 
if(score>=0){
  ground.velocityX=-6;
}  
if(ground.x<0){
  ground.x=ground.width/2;
}
if(keyDown("space")&&runner.y>=315){
  runner.velocityY=-12;
}
  runner.velocityY=runner.velocityY+1;
  runner.collide(ground);
  spawnCoins();
  spawnOb();
    
if(coinsGroup.isTouching(runner)){
  score=score+1;
  coinsGroup[0].destroy();
  coinSound.play();
}
    
if(obGroup.isTouching(runner)){
  gameState=END;
  gameOverSound.play();
}
  
}else if(gameState===END){
  ground.velocityX=0;
  runner.velocityY=0;
  obGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  gameOver.visible=true;
  restart.visible=true;
    
if(mousePressedOver(restart)){
  reset();
}
}

 
}

function spawnCoins(){
if(frameCount%60===0){
var coin=createSprite(400,200,10,10);
  coin.y=Math.round(random(230,250));
  coin.velocityX=-6;
  coin.addImage("yah",coinImg);
  coin.scale=0.1;
  coinsGroup.add(coin);
}
}

function spawnOb(){
if(frameCount%80===0){
var obstacle=createSprite(400,350,10,10);
    
  obstacle.velocityX=-6;
var rand=Math.round(random(1,3));
switch(rand){
case 1:obstacle.addImage("now",ob1);
break;
case 2:obstacle.addImage("before",ob2);
break;
case 3:obstacle.addImage("after",ob3);
break;
}
  
  obstacle.scale=0.1;
  obGroup.add(obstacle);
}
  
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  coinsGroup.destroyEach();
  obGroup.destroyEach();
  score=0;
}