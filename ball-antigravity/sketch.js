// Benedikt Groß

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Events = Matter.Events

const drawMouse = Helpers.drawMouse;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;
const drawConstraints = Helpers.drawConstraints;

let engine;
let ground;
let bridge;
let ball;
let r = .05
let ceiling;
let ramp;
let wall1;
let wall2;
let wall3;
let wall4;
let wall5;
let button;
let color = "#F01515"
let ground2;
let ground3;
let balls = [];
let rise = false;
let removed = false;
let bouncyBouncy;
let wind;
let startWind = false;

function setup() {
  const canvas = createCanvas(1400, 600);


  // create an engine
  engine = Engine.create();



  ball = Bodies.circle(75, 300, 50);
  // ball.invertedGravity()
  // Matter.invertedGravity()
  World.add(engine.world, [ball]);

 

  // ground
  ground = Bodies.rectangle(400, height, 2900, 50, {isStatic: true});
  World.add(engine.world, [ground]);

  

  ramp = Bodies.rectangle(0, 400, 600, 20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp])

  button = Bodies.rectangle(340, 495, 100, 20, {isStatic: true})
  World.add(engine.world, [button])

  wall2 = Bodies.rectangle(400, 495, 20, 700, {isStatic: true})
  World.add(engine.world, [wall2])

  wall1 = Bodies.rectanglebutton = Bodies.rectangle(850, 495, 20, 500, {isStatic: true})
  World.add(engine.world, [wall1])
  
  wall3 = Bodies.rectanglebutton = Bodies.rectangle(555, 100, 350, 20, {isStatic: true, angle: Math.PI * 0.9})
  World.add(engine.world, [wall3])

  wall4 = Bodies.rectanglebutton = Bodies.rectangle(1020, 45, 600, 20, {isStatic: true})
  World.add(engine.world, [wall4])

  wall5 = Bodies.rectanglebutton = Bodies.rectangle(1310, 150, 20, 225, {isStatic: true})
  World.add(engine.world, [wall5])

  ground2 = Bodies.rectangle(1080, 254, 475, 20, {isStatic: true})
  World.add(engine.world, [ground2])

  ground3 = Bodies.rectangle(625,565,430,20, {isStatic: true})
  World.add(engine.world, [ground3])

  bouncyBouncy = Bodies.circle(630,300,70, {isStatic: true, restitution : 10})
  World.add(engine.world, [bouncyBouncy])

  
  for (let i = 0; i < 35; i++) {
    let ballsball = Bodies.circle(500, 300, Math.random() * (30 - 5) + 5)
    balls.push(ballsball)
    World.add(engine.world, [balls[i]])

  }



  
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);



  Events.on(engine, 'collisionStart', function(event) {
    if((Matter.SAT.collides(ball, button).collided)){
      color =  "#13FE66"
      rise = true;
      engine.world.gravity.y = -0.5
      World.remove(engine.world, ball)
      removed = true;

    }

    
    
  });
  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  if (!removed){
  drawBody(ball);
}

 
  stroke(128);
  
  strokeWeight(2);
  drawBody(ramp)
  fill(color)
  drawBody(button)
  fill(128)
  drawBody(wall1)
  drawBody(wall2)
  drawBody(wall3)
  drawBody(wall4)
  drawBody(wall5)
  drawBody(bouncyBouncy)

  for (let i = 0; i < 35; i++){
    startWind = false;
   if(balls[i].position.y < 250){
     startWind = true;
   }
  }
   if (startWind){
     for (let i = 0; i < 35; i++){
      Body.applyForce( balls[i], {x: balls[i].position.x, y: balls[i].position.y}, {x: 0.0005, y: 0});

     }
   }
   
  


  balls.forEach(element => {
    drawBody(element);
    // if(riseMotherF){
    //   element.position.y -= r;
    //   r+=0.01
    // }
});
  noStroke();
  fill(128);
  drawBody(ground);
  drawBody(ground2)
  fill(color)
  drawBody(ground3)

  drawMouse(mouseConstraint);
}
