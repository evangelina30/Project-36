//Create variables here
var dog;
var happydog;
var database;
var sfood;
var foodObj;
var feed,addFood;
var fedTime,lastFed;
var foodstock;
var BackgroundImage;

function preload()
{
	//load images here
  BackgroundImage =loadImage("images/real-space-BG.png");
  dogimage = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
 
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 1000);


  dog = createSprite(150,150,50,50);
  dog.addImage(dogimage);
  dog.scale=0.15;
  feed=createButton("Feed the dog")
   feed.position(700,95);
    feed.mousePressed(feedDog);
     addFood=createButton("Add Food");
     addFood.position(800,95);
     addFood.mousePressed(addFoods);

  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(BackgroundImage);
  
   fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
       lastFed=data.val();
       });
       fill(255,255,254); 
       textSize(15); 
       if(lastFed>=12){ text("Last Feed : "+ lastFed%12 + " PM", 350,30);
       }
       else if(lastFed==0){ 
         text("Last Feed : 12 AM",350,30);
         }
         else{
            text("Last Feed : "+ lastFed + " AM", 350,30);
           }
            drawSprites(); 
          }
function readStock(data){ 
foodS=data.val();

 }
 function feedDog(){
    dog.addImage(happydog); 
 if(foodObj.getFoodStock()<= 0){
       foodObj.updateFoodStock(foodObj.getFoodStock()*0);
       }else{
          foodObj.updateFoodStock(foodObj.getFoodStock()-1);
         } database.ref('/').update({ 
           Food:foodObj.getFoodStock(),
            FeedTime:hour() })
           }
function addFoods(){ 
  foodS++; database.ref('/').update({ Food:foodS })
 }


