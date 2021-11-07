const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const Render = Matter.Render;


var engine;
var ground;
var ramps=[];
var ramp;
var ball;
var mouseConstraint;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 80;
var rest = 1.15
function setup() {
  //this is where you create canvas
  canvas = createCanvas(1400, 800);

  // create an engine
    engine = Engine.create();

  //first ramp
  ramp1 = Bodies.rectangle(200, 100, 300, 30, {
    isStatic: true,
    angle: Math.PI * 0.15
  })
  World.add(engine.world, ramp1);

  //second ramp 
  ramp2 = Bodies.rectangle(375, 300, 300, 30, {
    isStatic: true,
    angle: Math.PI * 0.85
  })
  World.add(engine.world, ramp2);

  //third ramp
  ramp3 = Bodies.rectangle(200, 500, 300, 30, {
    isStatic: true,
    angle:  Math.PI * 0.15
  })
  World.add(engine.world, ramp3);


  block1 = Bodies.rectangle(415, 570, 145, 30, {
    isStatic: true,
  })
  World.add(engine.world, block1);


  tramp1 = Bodies.rectangle(550, 700, 145, 30, {
    isStatic: true,
    angle:  Math.PI * 0.12
  })
  World.add(engine.world, tramp1);

  tramp2 = Bodies.rectangle(800, 750, 145, 30, {
    isStatic: true,
  })
  World.add(engine.world, tramp2);

  //create ball
  ball = Bodies.circle(150, 20, 55);
  World.add(engine.world, ball);

  bouncyBall = Bodies.circle(420, 568, 30,{ restitution: rest });
  World.add(engine.world, bouncyBall);
  //createBall()

  Engine.run(engine);

}
function createBall(){
  ball = Bodies.circle(150, 20, 30,{ restitution: rest });
  World.add(engine.world, ball);
}
function draw() {
  background(170);
  renderVertices(ramp1)
  renderVertices(ramp2)
  renderVertices(ramp3)
  renderVertices(block1)
  renderVertices(tramp1)
  renderVertices(tramp2)
  renderVertices(ball)
  renderVertices(bouncyBall)


}


function renderVertices(body){
  var verts = body.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < verts.length; i++) {
    vertex(verts[i].x, verts[i].y);
  }
  endShape();
}
