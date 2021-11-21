
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
var currentCamBody;
var ball;
var rocket;
var mouseConstraint;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 80;
var rest = 1.14 
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
     // var ragdoll = alien(20, 20, 3);


  Engine.run(engine);

    rocket =Bodies.circle(100, 30, 46, {
    render: {
      sprite: {
        texture: './rocket.png',
        xScale: .1,
        yScale: .1
      }
    },
    isStatic:true
  });
  currentCamBody=rocket;
  World.add(engine.world,rocket)


  person =Bodies.circle(0, 0, 46);
World.add(engine.world,person)















//   //camera
  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 200,
      y: 200
    });
 }.bind(this));

}


function draw() {


    cGap=0
    rGap=0
    col=2
    row=2
  const bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8,
    render: { fillStyle: "gray" }
  };

  

        World.add(
            engine.world,
            Matter.Composites.stack(rocket.position.x-5, rocket.position.y+42, col,row, rGap, cGap, (x, y) =>
              Matter.Bodies.circle(x, y, Matter.Common.random(3, 1), bodyOptions)
            ));
            explosion(engine)
          
        rocket.velocity.y=1

}



function explosion(engine) {
    const bodies = Matter.Composite.allBodies(engine.world);
    for (let i = 0; i < bodies.length; ++i) {
      const body = bodies[i];
  
      if (!body.isStatic && body.position.y >= 500) {
        const forceMagnitude = 0.0001 * body.mass;//.025
  
        Matter.Body.applyForce(body, body.position, {
          x:
            (forceMagnitude + Matter.Common.random() * forceMagnitude) *
            Matter.Common.choose([1, -1]),
          y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
        });
      }
    }
  }
