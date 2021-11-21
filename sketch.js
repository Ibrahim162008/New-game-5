var player;
var monster;
var spike1, spike2;
var bg
var bgImg
var gameOver;
var coinGroup, coinImg, coin;
var life1, life2, life3;
var playerImg, monsterImg, trap1, trap2;
var invisibleGround;
var end = 1;
var Play = 2;
var gameState = Play;
var restart;
var score = 0;

function preload() {
playerImg = loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png");
monsterImg = loadImage("Monster1.png");
trap1 = loadImage("spike1.png");
trap2 = loadImage("spike2.png");
bgImg = loadImage("Background.png");
coinImg = loadImage("Coin.png");
lifeImg = loadImage("life.png");
gameoverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
coinImg = loadImage("Coin.png");
};

function setup() {
  createCanvas(950,600);
  restart = createSprite(450, 500, 300,200);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.8;
  gameOver = createSprite(450, 300, 50, 50);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 1.8;
  player = createSprite(600, 540, 50, 50);
  player.addAnimation("running",playerImg);
  player.scale = 1.15;
  monster = createSprite(100, 410, 50, 50);
  monster.addImage(monsterImg);
  monster.scale = 0.7;
  spike1 = createSprite(2350, 550, 50, 50);
  spike1.scale = 0.15;
  spike1.addImage(trap1);
  spike1.velocityX  = -9.7;
  spike2 = createSprite(3350, 110, 50, 50);
  spike2.scale = 0.9;
  spike2.addImage(trap2);
  spike2.velocityX  = -15;
  life1 = createSprite(100, 70, 50, 50);
  life1.scale = 0.17;
  life1.addImage(lifeImg);
  life2 = createSprite(200, 70, 50, 50);
  life2.scale = 0.17;
  life2.addImage(lifeImg);
  life3 = createSprite(300, 70, 50, 50);
  life3.scale = 0.17;
  life3.addImage(lifeImg);
  invisibleGround = createSprite(420,584, 1000, 1);
  invisibleGround.visible = false;
  bg = createSprite(630, 300, 50, 50);
  bg.addImage(bgImg);
  coinGroup = createGroup();
}

function draw() { 
  restart.depth = 5;
  gameOver.depth = 4;
  monster.depth = 3;
  spike1.depth = 2;
  player.depth = 3;
  bg.depth = 1;
  bg.velocityX = -10;
  textSize(30);
  text("press space to jump & avoid obstactles", 350, 370);
  textSize(35);
  fill("black");
  text("Coins collected: " + score, 390, 50);
  if (gameState === Play) {
    gameOver.visible = false
    restart.visible = false
    life1.visible = true
    life2.visible = true
    life3.visible = true
    spike1.visible = true;
    spike2.visible = true;
    player.visible = true;
    monster.visible = true;
  } else if (gameState === end) {
    spike1.visible = false;
    spike2.visible = false;
    player.visible = false;
    monster.visible = false;
    coinGroup.destroyEach();
    gameOver.visible = true;
    restart.visible = true;
  }
  
  player.collide(invisibleGround);
  if (bg.x < -860) {
    bg.x = 670;
    }
    if (spike1.x < -860) {
      spike1.x = 950;
      }
      if (spike2.x < -960) {
        spike2.x = 1150;
        }
      if((keyDown("space")&& player.y >= 160)) {
        player.velocityY = -14;
      }
      player.velocityY = player.velocityY + 0.8;
      if (player.isTouching(spike1)||player.isTouching(spike2)) {
        spike1.x = -850;
        player.x = player.x - 150;
        player.y = 540;
      }
      if (player.x < 460) {
        life3.visible = false
      };
      if (player.x < 310) {
        life2.visible = false
      };
      if (player.x < 160) {
        life1.visible = false
      };
      if (life1.visible === false) {
        gameState = end; 
      }
      if (mousePressedOver(restart)) {
       reset();
      }
      if (coinGroup.isTouching(player)) {
        score = score + 1;
        coinGroup.destroyEach();
      }
      spawnCoins();
  drawSprites();
};
function reset() {
  gameState = Play;
  gameOver.visible = false;
  restart.visible = false;
  restart.depth = 0;
  gameOver.depth = 0;
  life1.visible = true
    life2.visible = true
    life3.visible = true
    player.x = 600;
    spike1.x = 2350;
    spike2.x = 3350;
    score = 0;
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
     coin = createSprite(4000,100,40,10);
    coin.y = Math.round(random(560,70));
    coin.addImage(coinImg);
    coin.scale = 0.2;
    coin.velocityX = -10.78;
    
     //assign lifetime to the variable
    if (coin.x === -10) {
     coin.lifetime = 0;
    }
    //adjust the depth
    coin.depth = 6;
    
    //adding cloud to the group
   coinGroup.add(coin);
    }
}