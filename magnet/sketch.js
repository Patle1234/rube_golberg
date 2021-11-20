

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


var ball, ground, ground2, ground3, ground4;

let rect, rect2, rect3;

let magnet, magnetHandle

let magnetActivate = false, magnetActivate2 = false, magnetActivate3 = false;
let pushBall = false;

let color = "#F01515",  color2 = "#F01515",  color3 = "#F01515";





function setup() {
  const canvas = createCanvas(1920, 1080);


  ball = Bodies.circle(0, -100, 50);
  
  ground = Bodies.rectangle(0, 100, 300, 10, {
    isStatic: true, 
    angle: Math.PI * 0.16,
    // angle: Math.PI * 0.06
  });

  ground2 = Bodies.rectangle(250, 350, 300, 10, {
    isStatic: true, 
    angle: Math.PI * 0.16,
    // angle: Math.PI * 0.06
  });

  ground3 = Bodies.rectangle(500, 600, 300, 10, {
    isStatic: true, 
    angle: Math.PI * 0.16,
    // angle: Math.PI * 0.06
  });

  ground4 = Bodies.rectangle(1100, 1000, 900, 10, {
    isStatic: true
  });

  magnet = Bodies.rectangle(1100, 400, 700, 50, {
    isStatic: true
  });

  magnetHandle = Bodies.rectangle(1100, 175, 50, 400, {
    isStatic: true
  });


 
  rect = Bodies.rectangle(900, 700, 30, 200, {
  });

  rect2 = Bodies.rectangle(1100, 760, 30, 200, {
  });

  rect3 = Bodies.rectangle(1300, 820, 30, 200, {
  });
  
  World.add(engine.world, [ball, ground, ground2, ground3, ground4, rect, rect2, rect3, magnet, magnetHandle]);

 
  Events.on(engine, 'collisionStart', function(event) {
    if((Matter.SAT.collides(ball, ground).collided)){
      color =  "#13FE66"
      magnetActivate = true;
    }
    if((Matter.SAT.collides(ball, ground2).collided)){
      color2 =  "#13FE66"
      magnetActivate2 = true;

    }
    if((Matter.SAT.collides(ball, ground3).collided)){
      color3 =  "#13FE66"
      magnetActivate3 = true;

    }
    if((Matter.SAT.collides(ball, ground4).collided)){
      pushBall = true;
    }
    
  });











Engine.run(engine);

}





function draw() {



  background(0);




  fill(128);
  
  drawBody(ground4);
  drawBody(magnet);
  drawBody(magnetHandle);

  fill(color);
  drawBody(ground);

  fill(color2);
  drawBody(ground2);

  fill(color3);
  drawBody(ground3);

  
  fill(255);
  if(pushBall){
    Body.applyForce(ball, {x: ball.position.x , y: ball.position.y} , { x: 0.005, y: 0 });
  }
  drawBody(ball);

  if(magnetActivate){
    Body.applyForce(rect, {x: rect.position.x , y: rect.position.y} , { x: 0, y: -0.05 });
  }
  if(magnetActivate2){
    Body.applyForce(rect2, {x: rect2.position.x , y: rect2.position.y} , { x: 0, y: -0.05 });
  }
  if(magnetActivate3){
    Body.applyForce(rect3, {x: rect3.position.x , y: rect3.position.y} , { x: 0, y: -0.05 });
  }
  drawBody(rect);
  drawBody(rect2);
  drawBody(rect3);



  
}