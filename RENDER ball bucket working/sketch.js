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
const Body = Matter.Body
const Events = Matter.Events
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;



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
let keepForce = true
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
  const canvas = createCanvas(0 , 0);

  // create an engine
  engine = Engine.create();


  render = Render.create({
    element: document.body,
    engine: engine,
    options: { 
                width: 1500, 
                height: 600,
                wireframes: false,
            }
});
Render.run(render);

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
  ground = Bodies.rectangle(400, 600, 2500, 25, {isStatic: true});
  World.add(engine.world, [ground]);

  ground1 = Bodies.rectangle(50,50,150,10, {isStatic: true, angle: Math.PI*0.35})
  World.add(engine.world, [ground1])

  bucket = Bodies.rectangle(555,350,400,15)
  World.add(engine.world, [bucket])

  bucket1 = Bodies.rectangle(550, 400, 10, 100, {isStatic: true})
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


  
  Events.on(engine, 'collisionStart', function(event) {
    console.log(Matter.SAT.collides(ball2, bucket).collided)
    if((Matter.SAT.collides(ball2, bucket).collided)){
      Body.applyForce( bucket, {x:bucket.position.x, y: bucket.position.y}, {x: 0, y: 100000});


  
    }

    
    
  });


  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  renderVertices(catapult);
  renderVertices(catapultSpacer);
 
  renderVertices(ball1);
  renderVertices(ball2);
  renderVertices(bucket)
  renderVertices(balls1)
  renderVertices(balls2)
  renderVertices(balls)
  renderVertices(bucket1)
  drawConstraint(bucketConstraint)
  renderVertices(balls3)
  renderVertices(ground1)
  renderVertices(catapultSpacer2)
console.log(ball2.position.y)
if (keepForce){
  if (ball2.position.y < 300 && ball2.position.y){
    Body.applyForce( ball2, {x:ball2.position.x, y: ball2.position.y}, {x: 0.003, y: 0});
  }
}
  if (ball2.position.x> 100){
    keepForce = false;
  }



  stroke(128);
  strokeWeight(2);
  drawConstraint(constraint);

  noStroke();
  fill(128);
  console.log("RUN HERE")
  renderVertices(ground)
  

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