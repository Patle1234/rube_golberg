
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const Render = Matter.Render;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;
const Events=Matter.Events;
const Constraint = Matter.Constraint;

var engine;
var mouseConstraint;
var currentCamBody;

//variables for bouncyball
var ground;
var ramps=[];
var ramp;
var bouncyBall;
var startingBall;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 80;
var rest = 1.14; 

//variables for catapult
var catapultBall;
var catapultRamp;
var platform, catapultPlatform;
var catapult, catapultSpacer, catapultSpacer2;
var catapultConstraint, bucketConstraint;
var projectile;
var bucket, bucketPlatform;
var plinkoBall, plinkoBall2, plinkoBall3, plinkoBall4;

//variables for plinko
var plinkoRamp;
var plinkoWall, plinkoWall2, plinkoWallAngle, plinkoWallAngle2;
var spinnyStuff, spinnyStuff2, spinnyStuff3;
var plinkoConstraint, plinkoConstraint2, plinkoConstraint3;
var plinkoSquares = [];


function setup() {
  //this is where you create canvas
  canvas = createCanvas(0, 0);

  // create an engine
    engine = Engine.create();
            // create a renderer
        render = Render.create({
          element: document.body,
          engine: engine,
          options: { 
                      width: 1400, 
                      height: 800,
                      wireframes: false,
                  }
      });
      Render.run(render);

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


  tramp1 = Bodies.rectangle(570, 700, 145, 30, {
    isStatic: true,

    angle:  Math.PI * 0.12
  })
  World.add(engine.world, tramp1);

  tramp2 = Bodies.rectangle(840, 750, 145, 30, {
    angle:  Math.PI * 0.07,
    isStatic: true,
  })
  World.add(engine.world, tramp2);

  platform = Bodies.rectangle(1200, 900, 400, 30, {
    isStatic: true,
  })
  World.add(engine.world, platform);

  startingBall = Bodies.circle(150, 20, 55);
  World.add(engine.world, startingBall);

  currentCamBody=startingBall//setting big ball as camera focus

  bouncyBall = Bodies.circle(420, 568, 30,{ restitution: rest });
  World.add(engine.world, bouncyBall);



  //set catapult variables

  catapultRamp = Bodies.rectangle(1450,1024,300,30, {isStatic: true, angle: Math.PI*0.35})
  World.add(engine.world, [catapultRamp])

  catapultPlatform = Bodies.rectangle(1900, 2000, 1000, 25, {isStatic: true})
  World.add(engine.world, [catapultPlatform])

  catapult = Bodies.rectangle(1560, 1900, 300, 10);
  catapultConstraint = Constraint.create({
    pointA: {x: 1560, y: 1900},
    bodyB: catapult,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [catapult, catapultConstraint]);

  catapultSpacer = Bodies.rectangle(1560, 1950, 10, 75, {isStatic: true });
  catapultSpacer2 = Bodies.rectangle(1410, 1975, 10, 40, {isStatic: true});

  World.add(engine.world, [catapultSpacer, catapultSpacer2]);

  bucket = Bodies.rectangle(2105,1730,400,15)
  World.add(engine.world, [bucket])

  bucketConstraint = Constraint.create({
    pointA:{x: 2105, y: 1730},
    bodyB: bucket,
    stiffness:0.1,
  });
 World.add(engine.world, [bucketConstraint])

 bucketPlatform = Bodies.rectangle(2105, 1820, 30, 150, {isStatic: true });
 World.add(engine.world, [bucketPlatform])

 catapultBall = Bodies.circle(1380, 800, 40, {mass: 4}); // make big one more 'heavy'
  World.add(engine.world, [catapultBall])

  projectile = Bodies.rectangle(1500, 1750, 25, 25, {mass: 1});
  World.add(engine.world, [projectile])
  

  plinkoBall = Bodies.circle(1950, 1680, 20)
  World.add(engine.world, [plinkoBall])

  plinkoBall2 = Bodies.circle(2000, 1680, 20)
  World.add(engine.world, [plinkoBall2])

  plinkoBall3 = Bodies.circle(2200, 1680, 20)
  World.add(engine.world, [plinkoBall3])

  plinkoBall4 = Bodies.circle(2270.128, 1680, 20)
  World.add(engine.world, [plinkoBall4])



  //set plinko variables

 plinkoRamp = Bodies.rectangle(2400, 2000, 650, 30, {
  isStatic: true,
  angle: Math.PI * 0.15
  })
  World.add(engine.world, plinkoRamp);

  plinkoWall = Bodies.rectangle(2500, 2700, 20, 600, {isStatic: true});
  World.add(engine.world, [plinkoWall]);

  plinkoWall2 = Bodies.rectangle(3300, 2700, 20, 600, {isStatic: true});
  World.add(engine.world, [plinkoWall2]);

  plinkoWallAngle = Bodies.rectangle(2630, 3130, 400, 20, {isStatic: true, angle: 0.785398});
  plinkoWallAngle2 = Bodies.rectangle(3170, 3130, 400, 20, {isStatic: true, angle: -0.785398});

  World.add(engine.world, [plinkoWallAngle]);
  World.add(engine.world, [plinkoWallAngle2]);

  spinnyStuff = Bodies.rectangle(2700, 2450, 200, 10);
  plinkoConstraint = Constraint.create({
    pointA: {x: 2700, y: 2450},
    bodyB: spinnyStuff,
    stiffness: 1,
    length: 0
  });

  World.add(engine.world, [spinnyStuff, plinkoConstraint]);

  spinnyStuff2 = Bodies.rectangle(3100, 2450, 200, 10);
  plinkoConstraint2 = Constraint.create({
    pointA: {x: 3100, y: 2450},
    bodyB: spinnyStuff2,
    length: 0
  });

  World.add(engine.world, [spinnyStuff2, plinkoConstraint2]);

  spinnyStuff3 = Bodies.rectangle(2900, 2650, 200, 10);
  plinkoConstraint3 = Constraint.create({
    pointA: {x: 2900, y: 2650},
    bodyB: spinnyStuff3,
    length: 0
  });

  World.add(engine.world, [spinnyStuff3, plinkoConstraint3]);

  for (let index = 0; index < 3; index++) {
    var rectangle = Bodies.rectangle(2700 + index*200, 2850, 50, 50, {
        isStatic: true,
        angle: 0.785398
    
    });


    plinkoSquares.push(rectangle);
}

World.add(engine.world, plinkoSquares);



  




  






  Engine.run(engine);

  //camera
  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 400,
      y: 400
    });
 }.bind(this));

}
function draw() {

  Events.on(engine, 'collisionStart', function(event) {
    if((Matter.SAT.collides(bouncyBall, startingBall).collided)){
      currentCamBody=bouncyBall//switching camera focus

    }
    if((Matter.SAT.collides(bouncyBall, catapultBall).collided)){
      currentCamBody=catapultBall//switching camera focus
    }
    if((Matter.SAT.collides(catapultBall, catapultPlatform).collided)){
      currentCamBody=plinkoBall3//switching camera focus
    }
  });

 
  
  background(170);
  renderVertices(ramp1)
  renderVertices(ramp2)
  renderVertices(ramp3)
  renderVertices(block1)
  renderVertices(tramp1)
  renderVertices(tramp2)
  renderVertices(startingBall)
  renderVertices(bouncyBall)
  renderVertices(platform);
  renderVertices(catapultBall);
  renderVertices(catapultRamp);
  renderVertices(catapultPlatform);
  renderVertices(catapultSpacer);
  renderVertices(catapultSpacer2);
  renderVertices(catapult);
  renderVertices(catapultConstraint);
  renderVertices(projectile);

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
