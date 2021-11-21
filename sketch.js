
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const Render = Matter.Render;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;
const Events=Matter.Events;

var engine;
var ground;
var ramps=[];
var ramp;
var tnt;
var currentCamBody;
var ball;
var mouseConstraint;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 80;
var rest = 1.14 
var ifExplode=false
function setup() {
  //this is where you create canvasasdf
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

      platform = Bodies.rectangle(415, 570, 2000, 30, {
        isStatic: true,
      }) 
      World.add(engine.world, platform);


      //trigger
      boomBox = Bodies.rectangle(415, 200, 50, 50, {
        isStatic: true,

      }) 
      World.add(engine.world, boomBox);

      dBox = Bodies.rectangle(415, -700, 50, 50, {
      }) 
      currentCamBody=boomBox
      World.add(engine.world, dBox);


      //exploding box

     tnt = Bodies.rectangle(415, 300, 300, 300, {
      }) 
      World.add(engine.world, tnt);



  




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

  var collision = Matter.SAT.collides(dBox, boomBox);
  if (collision.collided) {
    if(!ifExplode){


      cGap=0
      rGap=0
      col=10
      row=10
    const bodyOptions = {
      frictionAir: 0,
      friction: 0.0001,
      restitution: 0.8,
      render: { fillStyle: "red" }
    };
    World.add(
      engine.world,
      Matter.Composites.stack(tnt.position.x-10, tnt.position.y-60, col,row, rGap, cGap, (x, y) =>
        Matter.Bodies.circle(x, y, Matter.Common.random(3, 15), bodyOptions)
      ));
    World.remove(engine.world,tnt)
    explosion(engine)
    ifExplode=true
    }
  }
}


function explosion(engine) {
  const bodies = Matter.Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; ++i) {
    const body = bodies[i];

    if (!body.isStatic && body.position.y >= 500) {
      const forceMagnitude = 0.05 * body.mass;//.025

      Matter.Body.applyForce(body, body.position, {
        x:
          (forceMagnitude + Matter.Common.random() * forceMagnitude) *
          Matter.Common.choose([1, -1]),
        y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
      });
    }
  }
}
