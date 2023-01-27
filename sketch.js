var life = 3
var scoreboard
var score = 0
var gameState = 0
var level = 1

var loop = false

var player, playerImg;
var asteroid, asteroidImg
var asteroid2, asteroid2Img
var bullet, bulletImg
var base, baseImg

var backgroundImg;

var resetButton, resetButtonImg

var brick1, brick2, brick3

var bulletGroup = []
var asteroidGroup = []

var gameOverSound = new Audio("./sfx/gameOver.mp3")
var levelUpSound = new Audio("./sfx/levelUp.mp3")

//FUNCTION PRELOAD => => => => => => 
function preload(){
  playerImg = loadImage("./assets/spaceship.png");
  backgroundImg = loadImage("./assets/background2.jpg");
  asteroidImg = loadImage("./assets/asteroid.png")
  bulletImg = loadImage("./assets/bullet.png")
  resetButtonImg = loadImage("./assets/resetButton.png")
  baseImg = loadImage("./assets/Base.png")
  asteroid2Img = loadImage("./assets/asteroid2.png")

}

//FUNCTION SETUP => => => => => => 
function setup() {
  createCanvas(1903,1007);

  bulletGroup = createGroup();
  asteroidGroup = createGroup();


  brick1 = createSprite(1920,500,50,1820)
  brick1.visible = false

  base = createSprite(-100,500)
  base.addImage(baseImg)
  base.rotation = 90
  base.scale = 1.5

  player = createSprite(300,540,10,10);
  player.addImage(playerImg);
  player.rotation = 90;
  player.scale = 1.2;

}

//FUNCTION DRAW => => => => => => 
function draw() {
  background("black")  
  drawAsteriods()
  drawSprites();
  gameOver()


  textSize(30)
  
  text("Life: "+ life, 150,40)

  text("Score: "+ score, 500,40)

  text("Level: "+ level,800,40)
  // bulletGroup.bounceOff(brick1)




  if(gameState===1){
    player.y=mouseY
    player.visible = true
  }

  if(player.isTouching(asteroidGroup)){
    life = life - 1
    asteroidGroup.destroyEach()
  }


  for(var i = 0; i < asteroidGroup.length; i++){
    if(asteroidGroup.get(i).isTouching(bullet)){
      asteroidGroup.get(i).destroy()
      bullet.destroy()
      score = score + 1
    }
  }
  // if(bulletGroup.isTouching(asteroidGroup)){
  //   asteroidGroup.destroyEach()
  //   bullet.destroy()
  //   score = score + 1
  // }

  //Level related 

  if(score>=2){
    level = 2
  }  

  if(score>=5){
    level = 3
  }

  if(level === 2){
    levelUpSound
  }
}//<= close bracket function draw




function drawBullet(){
  bullet = createSprite(10,10);
  bullet.y=player.y
  bullet.addImage(bulletImg);
  bullet.scale = 1;  
}

function resetFrameCount(){
  frameCount = 0
}



function shootBullet(){
  bullet = createSprite(350, width/2,50,20)
  bullet.y = player.y
  bullet.addImage(bulletImg)
  bullet.velocityX = 30
  bulletGroup.add(bullet)
}

function drawAsteriods(){
  //generating asteroids for level 1
  if(level === 1 && gameState ===1){
    if(frameCount%85===0){
      asteroid = createSprite(1920,1080,20,20)
      asteroid.scale = 0.3
      asteroid.addImage(asteroidImg)
      asteroid.velocityX = -20
      asteroid.y=Math.round(random(100,1000))
      asteroidGroup.add(asteroid)
    }
  }
  if(level === 2 && gameState ===1){
    if(frameCount%70===0){
      asteroid = createSprite(1920,1080,20,20)
      asteroid.scale = 0.3
      asteroid.addImage(asteroidImg)
      asteroid.velocityX = -20
      asteroid.y=Math.round(random(100,1000))
      asteroidGroup.add(asteroid)
      
    }    
  }

  if(level === 3 && gameState ===1){
    if(frameCount%55===0){
      asteroid = createSprite(1920,1080,20,20)
      asteroid.scale = 0.3
      
      var rand = Math.round(random(1,2))
      switch(rand){
        case 1: asteroid.addImage(asteroidImg)
                break;
        case 2: asteroid.addImage(asteroid2Img)
                break;
        default: break;
      }
      asteroid.velocityX = -20
      asteroid.y=Math.round(random(100,1000))
      asteroidGroup.add(asteroid)
    }    
  }
}

function asteroidCollision(){
  if(bulletGroup.isTouching(asteroidGroup)){
    handleBulletCollision()
  }
}

function handleBulletCollision(){
  score = score + 1

  asteroidGroup.destroyEach()
  bulletGroup.destroyEach()
}

function handlePlayerCollision(){
  life = life-1
}


function gameOver(){
  //swal, sweetalert for the start
  if(gameState === 0){
    swal({
      title: `How to play:`,
      text: "Avoid getting hit by the incoming asteroids. Shoot the asteroids down before they hit the space station. Score points to advance to the next level. Have Fun!",
      // imageUrl:
      //   "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      // imageSize: "100x100",
      confirmButtonText: "Start"
    });
}

//end game if your lives run out
  if(life === 0){
    gameState = 0
    player.destroy()
    bulletGroup.destroyEach()
    base.destroy()

    gameOverSound.play()
    gameOverSound.volume = 0.3
      
    
    

    swal({
      title: `Game Over`,
      text: "Oops you ran out of lives",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Play again"

    },
    function(isConfirm){
      if(isConfirm){
        location.reload()
      }
    });
    }
  }


  
  function mouseReleased(){
    if(gameState === 0){
      gameState = 1
    }
    shootBullet()
  }















