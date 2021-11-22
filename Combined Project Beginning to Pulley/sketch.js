
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
const Body = Matter.Body;
const Composites = Matter.Composites;



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

//variables for part after plinko before car
let balls = [];
let platforms = [];
let rectangle1, rectanagle2;
let circleY, platformY;


//variables for car to pendulum and dominoes
let boxB;
let ground1, ground2, ground3,ground4;
let ballA, ballB;
var car, car2;
var p1;
let allObjectsArray = [];
let dominoesArray = [];
let numDominoes = 20;
let groundPD;
let forceApplied = false;
let pend;
let pendConstraint;
let constraint1;
let poly1;
let constraint2;
let poly2;
let constraint3;
let rect3;
let ball3;
let constraint4;
let polyA4;
let polyB4;
var dencityer=1;
var restitutioner = 1;
var carBR1, carBR2, carBR3;
var stopper;


//variables for pulley part
let groundP;

let ball1P, ball2P;

let rampP, ramp2P, pulleyP, pulley2P;
let constraintP, constraint2P;

let rampYP = 520;
let weightP = 0.01;



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
                      width: 1600, 
                      height: 800,
                      wireframes: false,
                  }
      });
      Render.run(render);

  //first ramp
  ramp1 = Bodies.rectangle(100, -200, 400, 30, {
    isStatic: true,
    angle: Math.PI * 0.15
  })
  World.add(engine.world, ramp1);

  //second ramp 
  ramp2 = Bodies.rectangle(375, 50, 500, 30, {
    isStatic: true,
    angle: Math.PI * 0.85
  })
  World.add(engine.world, ramp2);

  //third ramp
  ramp3 = Bodies.rectangle(150, 400, 600, 30, {
    isStatic: true,
    angle:  Math.PI * 0.25
  })
  World.add(engine.world, ramp3);


  block1 = Bodies.rectangle(470, 610, 145, 30, {
    isStatic: true,
  })
  World.add(engine.world, block1);


  tramp1 = Bodies.rectangle(660, 700, 155, 30, {
    isStatic: true,

    angle:  Math.PI * 0.12
  })
  World.add(engine.world, tramp1);

  tramp2 = Bodies.rectangle(910, 820, 145, 30, {
    angle:  Math.PI * 0.1,
    isStatic: true,
  })
  World.add(engine.world, tramp2);

  platform = Bodies.rectangle(1150, 900, 450, 30, {
    isStatic: true,
  })
  World.add(engine.world, platform);

  startingBall = Bodies.circle(0, -300, 55);
  World.add(engine.world, startingBall);

  currentCamBody=startingBall//setting big ball as camera focus

  bouncyBall = Bodies.circle(460, 580, 30,{ restitution: rest });




  //set catapult variables

  catapultRamp = Bodies.rectangle(1390,1024,200,30, {isStatic: true, angle: Math.PI*0.4})
  World.add(engine.world, [catapultRamp])

  catapultPlatform = Bodies.rectangle(1410, 2000, 100, 25, {isStatic: true})
  World.add(engine.world, [catapultPlatform])



  catapult = Bodies.rectangle(1460, 1550, 400, 10, {
  });
  catapultConstraint = Constraint.create({
    pointA: {x: 1460, y: 1550},
    bodyB: catapult,
    stiffness: .004,
    length: 0
  });
  World.add(engine.world, [catapult, catapultConstraint]);

  catapultSpacer = Bodies.rectangle(1460, 1600, 10, 75, {isStatic: true });


  catapultSpacer2 = Bodies.rectangle(1420, 1625, 10, 40, {isStatic: true});

  World.add(engine.world, [catapultSpacer, catapultSpacer2]);

  bucket = Bodies.rectangle(2085,1730,400,15)
  World.add(engine.world, [bucket])

  bucketConstraint = Constraint.create({
    pointA:{x: 2085, y: 1730},
    bodyB: bucket,
    stiffness:0.1,
  });
 World.add(engine.world, [bucketConstraint])

 bucketPlatform = Bodies.rectangle(2085, 1820, 30, 150, {isStatic: true });
 World.add(engine.world, [bucketPlatform])

 catapultBall = Bodies.circle(1370, 800, 40, {mass: 40}); // make big one more 'heavy'
  World.add(engine.world, [catapultBall])

  projectile = Bodies.rectangle(1320, 1550, 25, 25, {
    density:.0001
  });
 
  

  plinkoBall = Bodies.circle(2035, 1690, 20)
  // World.add(engine.world, [plinkoBall])

  plinkoBall2 = Bodies.circle(1985, 1690, 20)
  // World.add(engine.world, [plinkoBall2])

  plinkoBall3 = Bodies.circle(2135, 1690, 20)
  // World.add(engine.world, [plinkoBall3])

  plinkoBall4 = Bodies.circle(2185.1595, 1690, 20)
  // World.add(engine.world, [plinkoBall4])



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






  

//part after plinko before car variables
rectangle1 = Bodies.rectangle(3200, 3600, 1200, 20, {
  isStatic: true,
  density:.0001,
  angle:Math.PI*.12

});


rectangle3  = Bodies.rectangle(3800, 4380, 20, 3000, {
  isStatic: true,
  density:.0001,
});


World.add(engine.world, [rectangle1, rectangle3]);


circleY = 2700;
platformY = 5750;
  
for (let i = 0; i < 10; i++) {
  let p = Bodies.rectangle(3780, platformY, 40, 16, {
   
    isStatic: true,
    density:.0001,
    angle:Math.PI*.2
  });

  platformY+=250;

  platforms.push(p)
  World.add(engine.world, [platforms[i]])

}


// for (let i = 0; i < 10; i++) {
//   let ballsball = Bodies.circle(3120, circleY, 25)
//   circleY-=300;
//   balls.push(ballsball)
//   World.add(engine.world, [balls[i]])
  
// }




//car to pendulum to dominoes stuff

for (let index = 0; index < numDominoes; index++) {
  var rectangle = Bodies.rectangle(4700 + index*50, 3970, 15, 135, {
      frictionAir: 0.005,
      density:.001
  
  });

  allObjectsArray.push(rectangle);
  dominoesArray.push(rectangle);
}




groundPD = Bodies.rectangle(5350, 4000, 1400, 10, {
  isStatic: true, 
  // angle: Math.PI * 0.06
});

allObjectsArray.push(groundPD);

World.add(engine.world, allObjectsArray);


ballA = Bodies.circle(5750, 3950, 30,{
  density:.0002,
  friction:.1,
  frictionAir:0
});

car = Composites.car(3900, 3480, 120, 20, 30, {
  isStatic:true
});

ground2 = Bodies.rectangle(4150, 3700, 800, 20, {
  isStatic: true, 
  angle: Math.PI * 0.2,
  staticfriction: 0
  // friction: .01
});

World.add(engine.world, [ground2, ballA]);

poly1 = Bodies.circle(4550, 3900, 30,{
  restitution: 0,
  frictionAir: 0,
  friction:0,
  density: .001
});

constraint1 = Constraint.create({
  pointA: { x: 4550, y: 3400 },
  bodyB: poly1,
  
});
World.add(engine.world, [poly1, constraint1]);

carBR1 =  Bodies.rectangle(3880, 3350, 120, 20, {
  isStatic: true, 
 
  staticfriction: 0
  // friction: .01
});

carBR2 =  Bodies.rectangle(3930, 3300, 20, 100, {
  isStatic: true, 
 
  staticfriction: 0
  // friction: .01
});

carBR3 =  Bodies.rectangle(3830, 3300, 20, 100, {
  isStatic: true, 
 
  staticfriction: 0
  // friction: .01
});

stopper  = Bodies.rectangle(4000, 3540, 20, 100, {
  isStatic: true, 
  angle: Math.PI * 0.2,
  staticfriction: 0
  // friction: .01
});

World.add(engine.world, [carBR1, carBR2, carBR3, stopper, car])







//pulley stuff

pulleyP = Bodies.rectangle(6300, 4100, 400, 20);
  constraintP = Constraint.create({
    pointA: {x: 6300, y: 4100},
    bodyB: pulleyP,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [pulleyP, constraintP]);


  pulley2P = Bodies.rectangle(6650, 4050, 500, 20);
  constraint2P = Constraint.create({
    pointA: {x: 6650, y: 4050},
    bodyB: pulley2P,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [pulley2P, constraint2P]);


  // rampP = Bodies.rectangle(-100, 20, 300, 20, {isStatic: true, angle: Math.PI * 0.11});
  // World.add(engine.world, [rampP]);


  // ball1P = Bodies.circle(-100, -200, 25);
  // World.add(engine.world, [ball1P]);

  ball2P = Bodies.circle(6650, 4000, 20);
  World.add(engine.world, [ball2P]);

  // groundP = Bodies.rectangle(400, 590, 810, 25, {isStatic: true});
  // World.add(engine.world, [groundP]);





  Engine.run(engine);



  // camera
  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 1200,
      y: 1200
    });
 }.bind(this));

}

var rerun = false;
//prevents camera from switching twice in case of accidental secondary collision; use in all collision ifs
var col0, col1, col2, col3, col4, col5, col6, col7 = false
var collisionNum = 0;
function draw() {


  if (startingBall.position.y>400 && !rerun){
      World.add(engine.world, bouncyBall)
      rerun = true;
  }
  Events.on(engine, 'collisionStart', function(event) {

    // if((Matter.SAT.collides(startingBall, ramp3).collided) && !col0){
    //   currentCamBody=bouncyBall//switching camera focus
    //   World.add(engine.world, bouncyBall)
    //   col0 = true;

    // }

    if((Matter.SAT.collides(bouncyBall, startingBall).collided) && !col1){
      currentCamBody=bouncyBall//switching camera focus
      col1 = true;

    }
    if((Matter.SAT.collides(bouncyBall, catapultBall).collided) && !col2){
      currentCamBody=catapultBall//switching camera focus

      World.add(engine.world, [projectile])
      col2 = true;
      World.add(engine.world, [plinkoBall, plinkoBall2, plinkoBall3, plinkoBall4])                                 
    }
    
    if((Matter.SAT.collides(catapultBall, catapult).collided) && !col3){
      currentCamBody=plinkoBall//switching camera focus
      col3 = true;
      
    }

    if((Matter.SAT.collides(plinkoBall4, plinkoRamp).collided) && !col4){
      currentCamBody=plinkoBall//switching camera focus
      col4 = true;
      World.remove(engine.world, projectile)
    }


    if(((Matter.SAT.collides(plinkoBall, carBR3).collided) || (Matter.SAT.collides(plinkoBall, carBR2).collided))&& !col5){
      // World.add(engine.world, car);
      World.remove(engine.world, stopper);
      currentCamBody=car.bodies//switching camera focus
      col5 = true;
    }
    if((Matter.SAT.collides(poly1, allObjectsArray[0]).collided) && !col6){
      currentCamBody=groundPD//switching camera focus
      col6 = true;
    }
    if((Matter.SAT.collides(allObjectsArray[19], ballA).collided) && !col7){
      currentCamBody=ballA//switching camera focus
      col7 = true;
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
  // renderVertices(catapultConstraint);
  renderVertices(projectile);





  console.log(platforms[0].position.y)

  renderVertices(rectangle1)
  renderVertices(rectangle3)

//  balls.forEach(element => {
//     renderVertices(element);
// });

platforms.forEach(element => {

  // if (element.position.y>30 && element.position.y<1000){
    renderVertices(element);
  // }
    Body.translate(element, {
      x: 0,
      y: -4
    });

    if (element.position.y<2800){
      World.remove(engine.world, element)
    }




});

renderVertices(ballA)
  renderVertices(ground2)
  renderVertices(groundPD)
  renderVertices(poly1)











  renderVertices(pulleyP);
  renderVertices(pulley2P);
  // renderVertices(rampP);
  // renderVertices(ball1P);  
  renderVertices(ball2P);






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
