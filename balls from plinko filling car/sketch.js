// Benedikt Groß
// Example for matter-attractors an attractors plugin for matter.js
// https://github.com/liabru/matter-attractors

Matter.use('matter-attractors');

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;
const Events = Matter.Events;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

let engine;
let attractor;

let boxes;

let balls = [];
let platforms = [];
let car;

var collisions = 0;

var rectangle1 = Bodies.rectangle(380, 300, 800, 20, {
  isStatic: true,
  density:.0001,
  angle:Math.PI*.12

});

// var rectangle2 = Bodies.rectangle(450, 450, 200, 20, {
//   isStatic: true,
//   density:.0001,
//   angle:Math.PI*.08

// });

var rectangle3  = Bodies.rectangle(870, 650, 20, 1000, {
  isStatic: true,
  density:.0001,
});





var circleY = 0;
var platformY = 30;
function setup() {
  const canvas = createCanvas(1600, 800);

  // create an engine
  engine = Engine.create();

  // no gravity
  // engine.world.gravity.scale = 0;

  // add attractor



  for (let i = 0; i < 50; i++) {
    let p = Bodies.rectangle(820, platformY, 100, 16, {
     
      isStatic: true,
      density:.0001,
      angle:Math.PI*.2
    });

    platformY+=250;

    platforms.push(p)
    World.add(engine.world, [platforms[i]])
  
  }

  
  for (let i = 0; i < 10; i++) {
    let ballsball = Bodies.circle(100, circleY, 25)
    circleY-=300;
    balls.push(ballsball)
    World.add(engine.world, [balls[i]])
    
  }



  World.add(engine.world, [rectangle1, rectangle3]);

  // add boxes
  // xx, yy, columns, rows, columnGap, rowGap



  // setup mouse









  Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
  
    for (var i=0, j= pairs.length; i!=j; ++i) {
      var pair = pairs[i];
      if (circle.x === rectangle1.x){
        collisions++;
        console.log(collisions)
      }
    }
  });




  // run the engine
  Engine.run(engine);
}



function draw() {
  background(0);



  stroke(128);
  strokeWeight(1);
  fill(255);

  drawBody(rectangle1)

  drawBody(rectangle3)



  balls.forEach(element => {
    drawBody(element);
  
});

platforms.forEach(element => {


  if (element.position.y>30 && element.position.y<1000){
    drawBody(element);
  }
    Body.translate(element, {
      x: 0,
      y: -4
    });


});


 

  // drawBody(rectangle2)
  // drawBodies(car.bodies)
}
