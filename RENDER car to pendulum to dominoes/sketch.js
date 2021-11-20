const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;



const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;




const drawMouse = Helpers.drawMouse;

const drawConstraint = Helpers.drawConstraint;



let engine;

let boxB;
let ground1, ground2, ground3,ground4;
let ballA, ballB;
var car, car2;

var p1;



const width = window.innerWidth;
const height = window.innerHeight;


let allObjectsArray = [];
let dominoesArray = [];
let numDominoes = 20;
let ground;
let forceApplied = false;
let pend;
let pendConstraint;



let constraint1;
let poly1;

let constraint2;
let poly2;

// let constraint3;
// let poly3;

let constraint3;
let rect3;
let ball3;

let constraint4;
let polyA4;
let polyB4;

var dencityer=1;
var restitutioner = 1;


var currentCamBody;



//Render.run(render);

function setup() {
  const canvas = createCanvas(0, 0);


  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,
    options: { 
                width: 1800, 
                height: 700,
                wireframes: false,
            }
});
Render.run(render);



  for (let index = 0; index < numDominoes; index++) {
    var rectangle = Bodies.rectangle(500 + index*40, 350, 15, 135, {
        frictionAir: 0.005,
        density:.001
    
    });

 

    allObjectsArray.push(rectangle);
    dominoesArray.push(rectangle);
}


ground = Bodies.rectangle(1080, 500, 1200, 10, {
  isStatic: true, 
  // angle: Math.PI * 0.06
});

allObjectsArray.push(ground);



  // setup mouse
  // let mouse = Mouse.create(canvas.elt);
  // let mouseParams = {
  //   mouse: mouse,
  //   constraint: { stiffness: 0.05, angularStiffness: 0 }
  // }
  // mouseConstraint = MouseConstraint.create(engine, mouseParams);
  // mouseConstraint.mouse.pixelRatio = pixelDensity();
  // World.add(engine.world, mouseConstraint);

  // add all of the bodies to the world
  World.add(engine.world, allObjectsArray);




  // create an engine
  // create two boxes and a ground

 
  // boxB = Bodies.rectangle(100, 0, 80, 80);

  ballA = Bodies.circle(1350, 420, 30,{
    density:.0003,
    friction:.1,
    frictionAir:0
  });


  // ballB = Bodies.circle(150, 700, 30, {
  //   frictionStatic: true,
  //   staticfriction: 0.2
  // });
  
  car = Composites.car(100, 0, 120, 20, 30);

 


  // ground1 = Bodies.rectangle(800, 100, 1100, 10, {
  //   isStatic: true, 
  //   angle: Math.PI * -0.11,
  //   friction: 0.4
  // });

  ground2 = Bodies.rectangle(170, 320, 480, 10, {
    isStatic: true, 
    angle: Math.PI * 0.2,
    staticfriction: 0
    // friction: .01
  });
  // ground3 = Bodies.rectangle(800, 600, 700, 10, {
  //   isStatic: true, 
  //   angle: Math.PI * 0.8,
  //   friction: 0.1
  // });
  // ground4 = Bodies.rectangle(440, 470, 200, 10, {
  //   isStatic: true,
  //   friction: 1
  // });

  

  
  // add all of the bodies to the world
  //World.add(engine.world, []);
  // World.add(engine.world, [ballA, ballB, boxB, ground1, ground2, ground3, ground4, car2]);
    World.add(engine.world, [ground2, car, ballA]);



    poly1 = Bodies.circle(380, 410, 30,{
      restitution: 0,
      frictionAir: 0,
      friction:0,
      density: .001
    });

    constraint1 = Constraint.create({
      pointA: { x: 380, y: 100 },
      bodyB: poly1,
      
    });
    World.add(engine.world, [poly1, constraint1]);






    currentCamBody=car.bodies;



  // run the engine

  Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
  
    for (var i=0, j= pairs.length; i!=j; ++i) {
      var pair = pairs[i];
      if (car.x === ground.x){
        collisionNum++;

        //FIX THIS
        if (collisionNum>30){
          // currentCamBody = dominoesArray[collisionNum-30];
        }
      }
    }
  });


  // Events.on(engine, 'beforeTick', function() {
  //   Render.lookAt(render, currentCamBody, {
  //     x:800,
  //     y:800
  //   })
  // }.bind(this));



  Engine.run(engine);



}

var collisionNum = 0;

// function getCar(xx, yy, width, height, wheelSize) {
//   var Body = Matter.Body,
//       Bodies = Matter.Bodies,
//       Composite = Matter.Composite,
//       Constraint = Matter.Constraint;

//   var group = Body.nextGroup(true),
//       wheelBase = 20,
//       wheelAOffset = -width * 0.5 + wheelBase,
//       wheelBOffset = width * 0.5 - wheelBase,
//       wheelYOffset = 0;

//   var car = Composite.create({ label: 'Car' }),
//       body = Bodies.rectangle(xx, yy, width, height, { 
//           collisionFilter: {
//               group: group
//           },
//           chamfer: {
//               radius: height * 0.5
//           },
//           density: 0.0002
//       });

//   var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
//       collisionFilter: {
//           group: group
//       },
//       frictionStatic: .8
//   });

  
              
//   var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
//       collisionFilter: {
//           group: group
//       },
//       frictionStatic:.8
//   });
              
//   var axelA = Constraint.create({
//       bodyB: body,
//       pointB: { x: wheelAOffset, y: wheelYOffset },
//       bodyA: wheelA,
//       stiffness: 1,
//       length: 0
//   });
                  
//   var axelB = Constraint.create({
//       bodyB: body,
//       pointB: { x: wheelBOffset, y: wheelYOffset },
//       bodyA: wheelB,
//       stiffness: 1,
//       length: 0
//   });


  
//   // Composite.addBody(car, body);
//   // Composite.addBody(car, wheelA);
//   // Composite.addBody(car, wheelB);
//   // Composite.addConstraint(car, axelA);
//   // Composite.addConstraint(car, axelB);

//   return car;
// };






function draw() {

  // var collision = Matter.SAT.collides(car.bodies, ground2);
  // if (collision.collided) {
  //   console.log("car ground");
  // }
  
  background(0);
  
  fill(255);
  renderVertices(ballA)
  renderVertices(ground2)
  renderVertices(ground)

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





// function draw() {




//   background(0);




//   fill(255);
//   drawBody(ballA);
//   // drawBody(boxB);
//   // drawBody(ballB);
//   // drawBody(ballA);
//   dominoesArray.forEach(element => {
//       drawBody(element);
//   });


//   fill(128);


//   // drawBody(ground1);
//   drawBody(ground2);
//   drawBody(ground);
//   // drawBody(ground3);



  
  
//   fill(255);
//   drawBodies(car.bodies);


//   drawBody(poly1);
//   // drawBody(poly2);
//   // drawBody(poly3);
//   // drawBody(rect3);
//   stroke(128);
//   strokeWeight(2);
//   drawConstraint(constraint1);
//   // drawConstraint(constraint2);
//   // drawConstraint(constraint3);

// }





