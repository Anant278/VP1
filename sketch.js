var dog, dog1, happy_dog;
var database, foodS, foodStock;

function preload()
{
  dog1 = loadImage("images/dogImg.png");
	happy_dog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250, 300, 30, 30);
  dog.addImage(dog1);
  dog.scale = 0.3;
}

function draw() {  
  background("green");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happy_dog);
  }

  fill("black");
  textSize(20);
  text("Press UP_ARROW key to feed the dog", 80, 70);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}