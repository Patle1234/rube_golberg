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

const drawMouse = Helpers.drawMouse;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;
const drawConstraints = Helpers.drawConstraints;

let engine;
let ground;
let bridge;
let ball;
let ramp;
let wall;
let ramp1;
let wall1;
let ramp2;
let ball1;
let wall2;
let wall3;
let ramp3;
let ramp4; 
let wall4;
let wall5;
let ramp5;
let balls = []


function setup() {
  const canvas = createCanvas(1200, 600);

  // create an engine
  engine = Engine.create();

  

  // add ball
  ball = Bodies.circle(200, 0, 35);
  World.add(engine.world, [ball]);

  ball1 = Bodies.circle(0,0,35)
  World.add(engine.world, [ball1])

  for (let i = 0; i < 10; i++){
    let ball = Bodies.circle(0,0,35)
    balls.push(ball)
    World.add(engine.world, [balls[i]])
  }


  ramp = Bodies.rectangle(0, 100,500,20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp])

  wall = Bodies.rectangle(230,220,20,100, {isStatic: true})
  World.add(engine.world, [wall])

  ramp1 = Bodies.rectangle(270,280,100,20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp1])

  wall1 = Bodies.rectangle(320,250,20,110, {isStatic: true})
  World.add(engine.world, [wall1])

  ramp2 = Bodies.rectangle(455, 250, 300, 20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp2])
  // ground
  ground = Bodies.rectangle(400, height, 1600, 100, {isStatic: true});
  World.add(engine.world, [ground]);

  wall2 = Bodies.rectangle(600,340,20,100, {isStatic: true  })
  World.add(engine.world, [wall2])

  ramp3 = Bodies.rectangle(640,400,100,20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp3])

  wall3 = Bodies.rectangle(690,375,20,100, {isStatic: true  })
  World.add(engine.world, [wall3])

  ramp4 = Bodies.rectangle(825,380,300,20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp4])

  wall4 = Bodies.rectangle(975, 470,20,100, {isStatic: true})
  World.add(engine.world, [wall4])
  
  wall5 = Bodies.rectangle(1070, 500, 20,100, {isStatic: true})
  World.add(engine.world, [wall5])

  ramp5 = Bodies.rectangle(1030,520,100,20, {isStatic: true, angle: Math.PI * 0.1})
  World.add(engine.world, [ramp5])

  
  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  drawBody(ball);
  drawBody(ramp)
  drawBody(wall)
  drawBody(ramp1)
  drawBody(wall1)
  drawBody(ramp2)
  drawBody(ball1)
  drawBody(wall2)
  drawBody(ramp3)
  drawBody(wall3)
  drawBody(ramp4)
  drawBody(wall4)
  drawBody(wall5)
  drawBody(ramp5)
  balls.forEach(element => {
    drawBody(element);
});
  stroke(128);
  strokeWeight(2);
 

  noStroke();
  fill(128);
  drawBody(ground);

  drawMouse(mouseConstraint);
}
