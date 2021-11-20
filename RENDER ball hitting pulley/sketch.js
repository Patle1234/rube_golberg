// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;
const Events=Matter.Events;


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
  const canvas = createCanvas(0, 0);

  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,
    options: { 
                width: 800, 
                height: 600,
                wireframes: false,
            }
});
Render.run(render);



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

  ground = Bodies.rectangle(400, 590, 810, 25, {isStatic: true});
  World.add(engine.world, [ground]);

  var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: {
                    visible: false
                }
            }
        });

    World.add(engine.world, mouseConstraint);


  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  renderVertices(pulley);
  renderVertices(pulley2);
  renderVertices(ramp);
  renderVertices(ball1);  
  renderVertices(ball2);
  stroke(128);
  strokeWeight(2);

  noStroke();
  fill(128);
  renderVertices(ground);

  drawMouse(mouseConstraint);
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