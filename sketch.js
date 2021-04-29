
var balloon,balloonAnime
var cityImg
var database
var height
function preload(){
 cityImg=loadImage("City Background.png")
 balloonAnime=loadAnimation("Hot Air Ballon-1.png","Hot Air Ballon-2.png","Hot Air Ballon-3.png")
}
function setup() {

  database=firebase.database()

  createCanvas(1200,800);
  
  balloon=createSprite(250,650)
  balloon.scale=0.8
  balloon.addAnimation("Ballon",balloonAnime)

  var balloonPosition=database.ref('balloon/height')
  balloonPosition.on("value",readHeight,showError)
}

function draw() {
  background(cityImg);  




  if (keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
  }
  else if (keyDown(RIGHT_ARROW)){
    updateHeight(+10,0)
  }
  else if (keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.scale=balloon.scale-0.01
  }
  else if (keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon.scale=balloon.scale+0.01
  }

   drawSprites()
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,  
    'y': height.y + y 
})
}

function readHeight(data){
  height = data.val()
  balloon.x = height.x 
  balloon.y = height.y 

}

function showError(){
  console.log("Erorr in writing to database ")
}