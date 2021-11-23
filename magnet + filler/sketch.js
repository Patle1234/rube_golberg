

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
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;



const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;




const drawMouse = Helpers.drawMouse;

const drawConstraint = Helpers.drawConstraint;



let engine;

var currentCamBody;
var chain, chain2, chain3, chain4, chain5;



var ball, ground, ground2, ground3, ground4, ground5;

var ramp, ramp2;

let rect, rect2, rect3;

let magnet, magnetHandle

let magnetActivate = false, magnetActivate2 = false, magnetActivate3 = false;
let pushBall = false, pushBall2 = false;

let color = "#F01515",  color2 = "#F01515",  color3 = "#F01515";





function setup() {
  const canvas = createCanvas(0, 0);

  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,
    options: { 
                width: 1920, 
                height: 1080,
                wireframes: false,
            }
});
Render.run(render);


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
  

  ramp = Bodies.rectangle(2200, 1000, 600, 10, {
    isStatic: true, 
    angle:  -1.0472,
    // angle: Math.PI * 0.06
  });

  ramp2 = Bodies.rectangle(1900, 1800, 600, 10, {
    isStatic: true, 
    angle:   0.785398,
    // angle: Math.PI * 0.06
  });

  ground5 = Bodies.rectangle(2850, 2025, 1500, 10, {
    isStatic: true
  });

  var boxes = Composites.stack(2300, 1820, 3, 1, 10, 0, function(x, y) {
    return Bodies.rectangle(x, y, 50, 40);
});

var boxes2 = Composites.stack(2500, 1820, 3, 1, 10, 0, function(x, y) {
  return Bodies.rectangle(x, y, 50, 40);
});

var boxes3 = Composites.stack(2700, 1820, 3, 1, 10, 0, function(x, y) {
    return Bodies.rectangle(x, y, 50, 40);
});

var boxes4 = Composites.stack(2900, 1820, 3, 1, 10, 0, function(x, y) {
  return Bodies.rectangle(x, y, 50, 40);
});

var boxes5 = Composites.stack(3100, 1820, 3, 1, 10, 0, function(x, y) {
    return Bodies.rectangle(x, y, 50, 40);
});

  chain = Composites.chain(boxes, 0.5, 0, -0.5, 0, { stiffness: 1});

  chain2 = Composites.chain(boxes2, 0.5, 0, -0.5, 0, { stiffness: 1});

  chain3 = Composites.chain(boxes3, 0.5, 0, -0.5, 0, { stiffness: 1});

  chain4 = Composites.chain(boxes4, 0.5, 0, -0.5, 0, { stiffness: 1});

  chain5 = Composites.chain(boxes5, 0.5, 0, -0.5, 0, { stiffness: 1});



Composite.add(boxes, Constraint.create({ 
        bodyA: boxes.bodies[0],
        pointB: { x: 2300, y: 1755 },
        stiffness: 0.8
    }));

  Composite.add(boxes2, Constraint.create({ 
      bodyA: boxes2.bodies[0],
      pointB: { x: 2500, y: 1755 },
      stiffness: 0.8
  }));

  Composite.add(boxes3, Constraint.create({ 
    bodyA: boxes3.bodies[0],
    pointB: { x: 2700, y: 1755 },
    stiffness: 0.8
}));

Composite.add(boxes4, Constraint.create({ 
  bodyA: boxes4.bodies[0],
  pointB: { x: 2900, y: 1755 },
  stiffness: 0.8
}));

Composite.add(boxes5, Constraint.create({ 
bodyA: boxes5.bodies[0],
pointB: { x: 3100, y: 1755 },
stiffness: 0.8
}));

  World.add(engine.world, [ball, ground, ground2, ground3, ground4, rect, rect2, rect3, magnet, magnetHandle, ramp, ramp2, ground5, chain, chain2, chain3, chain4, chain5]);

 
  Events.on(engine, 'collisionStart', function(event) {
    if((Matter.SAT.collides(ball, ground).collided)){
      color =  "#13FE66"
      magnetActivate = true;
      console.log("C1")
    }
    if((Matter.SAT.collides(ball, ground2).collided)){
      color2 =  "#13FE66"
      magnetActivate2 = true;
      console.log("C2")
    }
    if((Matter.SAT.collides(ball, ground3).collided)){
      color3 =  "#13FE66"
      magnetActivate3 = true;
      console.log("C3")
    }
    
    if((Matter.SAT.collides(ball, ground5).collided)){
      pushBall2 = true;
      console.log("P2")
    }
  });


  currentCamBody = ball;





  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 800,
      y: 800
    });
 }.bind(this));


Engine.run(engine);

}





function draw() {



  background(0);




  fill(128);
  
  renderVertices(ground4);
  renderVertices(magnet);
  renderVertices(magnetHandle);

 
  renderVertices(ground);

  fill(color2);
  renderVertices(ground2);

  fill(color3);
  renderVertices(ground3);

  if((ball.position.x >= 800 && ball.position.x <= 1400)){
    pushBall = true;
  }
  else{
    pushBall = false;
  }
  
  fill(255);
  if(pushBall){
    Body.applyForce(ball, {x: ball.position.x , y: ball.position.y} , { x: 0.01, y: -0.013 });
    
  }
  if(pushBall2){
    Body.applyForce(ball, {x: ball.position.x , y: ball.position.y} , { x: 0.01, y: 0 });
  }

  renderVertices(ball);

  if(magnetActivate){

    Body.applyForce(rect, {x: rect.position.x , y: rect.position.y} , { x: 0, y: -0.05 });
    
  }
  if(magnetActivate2){
    Body.applyForce(rect2, {x: rect2.position.x , y: rect2.position.y} , { x: 0, y: -0.05 });
  }
  if(magnetActivate3){
    Body.applyForce(rect3, {x: rect3.position.x , y: rect3.position.y} , { x: 0, y: -0.05 });
  }
  renderVertices(rect);
  renderVertices(rect2);
  renderVertices(rect3);



  
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
