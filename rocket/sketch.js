

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Events = Matter.Events;


const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;




const drawMouse = Helpers.drawMouse;

const drawConstraint = Helpers.drawConstraint;



let engine;


engine = Engine.create();


var car, ground;


var rocket = {
  y: 500,
  x: 800,
  t1: 0,
  t2: 0,
  t3: 0

}


var rectangle = Bodies.rectangle(580, 460, 200, 20, {
  isStatic: true,
  density:.0001,
  

});


function setup() {
  const canvas = createCanvas(1800, 700);


  car = Composites.car(100, 250, 120, 20, 30);

  
  
  ground = Bodies.rectangle(0, 300, 1000, 10, {
    isStatic: true, 
    angle: Math.PI * 0.1,
    // angle: Math.PI * 0.06
  });



  World.add(engine.world, [car, ground, rectangle]);

 




  

  
Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;

  for (var i=0, j= pairs.length; i!=j; ++i) {
    var pair = pairs[i];
    if (car.x === ground.x){
      numRocket++;
    }
  }
});

Engine.run(engine);

}




var a = 0;
var numRocket = 0;
var color = "128";

function draw() {



  background(0);


  color = 128;

  if (numRocket >= 4){
    color = "#32a852";
    rocket.y-=a;
    a +=.05;
  }

  fill(128);
  drawBody(ground);


  fill(color)
  drawBody(rectangle);

  
  fill(255);
  drawBodies(car.bodies);
  // rocket body
  rect(rocket.x,rocket.y,50,100);
  // rocket cone
  triangle(rocket.x, rocket.y, rocket.x+25, rocket.y -50, rocket.x+50, rocket.y);
  //rocket fins
  triangle(rocket.x-25, rocket.y+100, rocket.x, rocket.y +50, rocket.x, rocket.y+100);
	triangle(rocket.x+50, rocket.y+50, rocket.x+75, rocket.y +100, rocket.x, rocket.y+100);
  // rocket window
  fill(220);
  ellipse(rocket.x+25, rocket.y+25, 25,25);
  
  // if (keyIsPressed === true) {

  //   if (keyCode == UP_ARROW) {

  //     rocket.y -= 10
  //   } else if(keyCode == DOWN_ARROW) {
  //     rocket.y += 10
  //   }

  //   //return false;

  // }



  
}