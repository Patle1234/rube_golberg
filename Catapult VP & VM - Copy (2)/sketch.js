// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Grid = Matter.Grid;

const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

const drawMouse = Helpers.drawMouse;
const drawConstraint = Helpers.drawConstraint;

let engine;
let ground;
let ground1;
let block;

let ball1;
let ball2;

let catapult;
let catapultSpacer;
let constraint;

let bucket;
let bucket1;
let balls;
let balls1;
let balls2;
let balls3;
let pyramid;
let bucketConstraint;
let catapultSpacer2



function setup() {
  const canvas = createCanvas(1500 , 600);

  // create an engine
  engine = Engine.create();

 // add revolute constraint for catapult
  catapult = Bodies.rectangle(700, 520, 200, 10);
  constraint = Constraint.create({
    pointA: {x: 100, y: 520},
    bodyB: catapult,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [catapult, constraint]);



  
  

  // balls and catapult spacer for limit
  catapultSpacer = Bodies.rectangle(100, 555, 10, 50, {isStatic: true });
  catapultSpacer2 = Bodies.rectangle(20, 560, 10, 30, {isStatic: true});

  ball1 = Bodies.circle(40, 0, 30, {mass: 40000}); // make big one more 'heavy'
  ball2 = Bodies.rectangle(30, 500, 25, 25, {mass: 1});
  World.add(engine.world, [catapultSpacer,catapultSpacer2, ball1, ball2]);
 // ground
  ground = Bodies.rectangle(400, height-10, 2500, 25, {isStatic: true});
  World.add(engine.world, [ground]);

  ground1 = Bodies.rectangle(50,50,150,10, {isStatic: true, angle: Math.PI*0.32})
  World.add(engine.world, [ground1])

  bucket = Bodies.rectangle(555,350,400,15)
  World.add(engine.world, [bucket])

  bucket1 = Bodies.rectangle(550, 400, 50, 100, {isStatic: true})
  World.add(engine.world, [bucket1])

  balls = Bodies.circle(400, 300, 20)
  World.add(engine.world, [balls])

  balls1 = Bodies.circle(455, 300, 20)
  World.add(engine.world, [balls1])

  balls2 = Bodies.circle(650, 300, 20)
  World.add(engine.world, [balls2])

  balls3 = Bodies.circle(700, 300, 20)
  World.add(engine.world, [balls3])


  bucketConstraint = Constraint.create({
    pointA:{x: 550, y: 350},
    bodyB: bucket,
    stiffness:0.1,
  });
 World.add(engine.world, [bucketConstraint])


 

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
  drawBody(catapult);
  drawBody(catapultSpacer);
  drawBody(ball1);
  drawBody(ball2);
  drawBody(bucket)
  drawBody(balls1)
  drawBody(balls2)
  drawBody(balls)
  drawBody(bucket1)
  drawConstraint(bucketConstraint)
  drawBody(balls3)
  drawBody(ground1)
  drawBody(catapultSpacer2)

  



  stroke(128);
  strokeWeight(2);
  drawConstraint(constraint);


  noStroke();
  fill(128);
  drawBody(ground);
  

  drawMouse(mouseConstraint);
}
