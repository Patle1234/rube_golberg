// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;
const drawConstraint = Helpers.drawConstraint;

let engine;
let ground;

let ball1, ball2;

let ramp, ramp2, pulley;
let constraint, constraint2;

let rampY = 520;
let weight = 0.01;


function setup() {
  const canvas = createCanvas(800, 600);

  engine = Engine.create();

  pulley = Bodies.rectangle(200, 400, 300, 20);
  constraint = Constraint.create({
    pointA: {x: 200, y: 400},
    bodyB: pulley,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [pulley, constraint]);

  pulley2 = Bodies.rectangle(550, 350, 500, 20);
  constraint2 = Constraint.create({
    pointA: {x: 550, y: 350},
    bodyB: pulley2,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [pulley2, constraint2]);

  ramp = Bodies.rectangle(-100, 20, 300, 20, {isStatic: true, angle: Math.PI * 0.11});
  World.add(engine.world, [ramp]);


  ball1 = Bodies.circle(-100, -200, 25);
  World.add(engine.world, [ball1]);

  ball2 = Bodies.circle(550, 325, 25);
  World.add(engine.world, [ball2]);

  ground = Bodies.rectangle(400, height-10, 810, 25, {isStatic: true});
  World.add(engine.world, [ground]);

  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  drawBody(pulley);
  drawBody(pulley2);
  drawBody(ramp);
  drawBody(ball1);  
  drawBody(ball2);
  stroke(128);
  strokeWeight(2);

  noStroke();
  fill(128);
  drawBody(ground);

  drawMouse(mouseConstraint);
}
