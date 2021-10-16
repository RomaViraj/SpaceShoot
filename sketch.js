var playerShip,enemyShip;
var start,pause,gameOver;
var plasmaBall;
var blast;
var gameState = 1;
var enemyGroup;
var plasmaBallGroup;
var score = 0;
var life = 3;

function preload(){

  player_img = loadImage("./assets/playerShip.png")
  enemy_img = loadImage("./assets/enemyShip.png")
  space_img = loadImage("./assets/space.jpg")
  plasmaBalls_img = loadImage("./assets/plasmaBall.png")
  blast = loadAnimation("./assets/blast 1.png","./assets/blast 2.png","./assets/blast 3.png","./assets/blast 4.png","./assets/blast 5.png","./assets/blast 6.png","./assets/blast 7.png")
  // life1_img = loadImage("./assets/1.png")
  // life2_img = loadImage("./assets/2.png")
  // life3_img = loadImage("./assets/3.png")

}
function setup() {
  createCanvas(windowWidth,windowHeight);

  playerShip = createSprite(400, 660, 50, 50);
  playerShip.scale = 0.4;
  playerShip.addImage(player_img)
  // playerShip.debug = true

  // life1 = createSprite(20, 20, 50, 50);
  // life1.scale = 0.09;
  // life1.addImage(life1_img)
  // life1.visible = false

  // life2 = createSprite(40, 20, 50, 50);
  // life2.scale = 0.09;
  // life2.addImage(life2_img)
  // life2.visible = false

  // life3 = createSprite(60, 20, 50, 50);
  // life3.scale = 0.09;
  // life3.addImage(life3_img)
  // life3.visible = false

  enemyGroup = new Group()
  plasmaBallGroup = new Group()

}

function draw() {
  background(space_img);  
  console.log(life)
  drawSprites();

 if(gameState === 1){

    
    // if(life == 3){

    //   life3.visible = true
    //   life2.visible = false
    //   life1.visible = false
    // }

    // if(life == 2){

    //   life3.visible = false
    //   life2.visible = true
    //   life1.visible = false
    // }

    // if(life == 1){

    //   life3.visible = false
    //   life2.visible = false
    //   life1.visible = true
    // }
    spawnEnemyShip();
    if(keyDown (RIGHT_ARROW)){
  
      playerShip.x = playerShip.x +20
    }
  
    if(keyDown (LEFT_ARROW)){
  
      playerShip.x = playerShip.x -20
    }

    if(keyWentDown("space")){

      spawnBullets();
      
    }
    if (enemyGroup.collide(playerShip)){

      handleGameOver(enemyGroup);
    }
    if(plasmaBallGroup.collide(enemyGroup)){

      handleCollision(plasmaBallGroup);
 }
 }
 if(gameState === 2){

  console.log("GameOver......!!")
 }
}
function spawnEnemyShip(){
if(frameCount%100==0){

  enemyShip = createSprite(random(50,width-100), 0, 50, 50);
  enemyShip.scale = 0.8;
  enemyShip.addImage(enemy_img)
  enemyShip.velocityY = 10
  enemyGroup.add(enemyShip)
  enemyShip.life = height+10
  // enemyShip.debug = true
}
}
function spawnBullets(){

  plasmaBall = createSprite(playerShip.x, playerShip.y, 50, 50);
  plasmaBall.addImage(plasmaBalls_img)
  plasmaBall.velocityY = -20;
  plasmaBall.scale = 0.5;
  plasmaBallGroup.add(plasmaBall)
}
function handleCollision(plasmaBallGroup){

  if(life>0){

    score = score+1
  }

  blast = createSprite(enemyShip.x, enemyShip.y, 50, 50);
  blast.scale = 0.5;
  blast.addAnimation(blast)
  blast.life = 18;

  enemyGroup.destroyEach()
  plasmaBallGroup.destroyEach()
  
}
function handleGameOver(enemyGroup){

  enemyGroup.destroyEach()

  life = life-1
  if(life = 0){

    gameState = 2;
    swal({
      title:'Oh Shit.......',
      text:'You died',
      text:'your killed'+ score,
      imageUrl:'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png',
      imageSize:'100x100',
      confirmButtonText:'Thanx For Playing'
    })
  }
}