var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, boxLeft, boxRight, boxBottom;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color("yellow")


	engine = Engine.create();
	world = engine.world;

	// create ground body
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	// create package body
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	

	
	
	//create landing box for package
	fill ("red");
	boxBottom = new Ground (width/2,groundSprite.y-15,200,20);
	//create left landing box for package
	var boxLeftX = boxBottom.body.position.x - 90 ;
	var boxLeftY = boxBottom.body.position.y-60 ;
	boxLeft = new Ground (boxLeftX, boxLeftY,20,100);
	//create Right landing box for package
	var boxRightX = boxBottom.body.position.x + 90 ;
	var boxRightY = boxBottom.body.position.y-60 ;
	boxRight = new Ground (boxRightX, boxRightY,20,100);
	

//	Engine.run(engine);
  
}


function draw() {
  Engine.update(engine);
  rectMode(CENTER);
  background("green");
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  drawSprites();
  
  boxBottom.display ();
  boxLeft.display ();
  boxRight.display ();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	Matter.Body.setStatic(packageBody,false);
    
  }
  if (keyCode === LEFT_ARROW) {

    helicopterSprite.x=helicopterSprite.x-20;    
    translation={x:-20,y:0}
    Matter.Body.translate(packageBody, translation)
  }
  if (keyCode === RIGHT_ARROW) {

    helicopterSprite.x=helicopterSprite.x+20;    
    translation={x:20,y:0}
    Matter.Body.translate(packageBody, translation)
  }


}
