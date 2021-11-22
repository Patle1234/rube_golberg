
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
var forcePower=.01;
var ifClicked=false
var currentCamBody;
var ball;
var rocket;
var endCard
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
        xScale: .2,
        yScale: .2
      }
    }
    // ,
    // isStatic:true
  });
  currentCamBody=rocket;
  World.add(engine.world,rocket)

  platform =Bodies.rectangle(100, 40, 200,30,{
    isStatic: true,
    render: { 
      fillStyle: "gray" 
    }
  }
  );
World.add(engine.world,platform)

  button =Bodies.rectangle(0, 0, 70,30,{
    isStatic: true,
    render: { 
      fillStyle: "red" 
    }
  }
  );
World.add(engine.world,button)

buttonPresser =Bodies.rectangle(0, -10, 70,30,{
  render: { 
    fillStyle: "blue" 
  }
}
);
World.add(engine.world,buttonPresser)


endCard =Bodies.circle(300, -3000, 46, {
  render: {
    sprite: {
      texture: './endCard.jpeg',
      xScale: 1,
      yScale: 1
    }
  }
  ,isStatic:true
});


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
  col=3
  row=3
  const bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8,
    render: { fillStyle: "gray" }
  }

  const fireworkBlueOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 2,
    render: { fillStyle: "blue" }
  }
  var collision = Matter.SAT.collides(button, buttonPresser);
  if (collision.collided) {
    ifClicked=true
  }

  const fireworkRedOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 2,
    render: { fillStyle: "red" }
  }
  var collision = Matter.SAT.collides(button, buttonPresser);
  if (collision.collided) {
    ifClicked=true
  }



  const fireworkWhiteOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 2,
    render: { fillStyle: "white" }
  }
  var collision = Matter.SAT.collides(button, buttonPresser);
  if (collision.collided) {
    ifClicked=true
  }


  var collision2 = Matter.SAT.collides(rocket, endCard);
  if (collision2.collided) {

    World.remove(engine.world,    Matter.Composite.allBodies(engine.world))
    World.add(engine.world,endCard)
    currentCamBody=endCard

    ifClicked=false
    forcePower=.25
    World.add(
      engine.world,
      Matter.Composites.stack(endCard.position.x-25, endCard.position.y-150, col,row, rGap, cGap, (x, y) =>
        Matter.Bodies.circle(x, y, Matter.Common.random(5, 2), fireworkBlueOptions )
      ));

      World.add(
        engine.world,
        Matter.Composites.stack(endCard.position.x-25, endCard.position.y-150, col,row, rGap, cGap, (x, y) =>
          Matter.Bodies.circle(x, y, Matter.Common.random(5, 2), fireworkWhiteOptions )
        ));

        World.add(
          engine.world,
          Matter.Composites.stack(endCard.position.x-25, endCard.position.y-150, col,row, rGap, cGap, (x, y) =>
            Matter.Bodies.circle(x, y, Matter.Common.random(5, 2), fireworkRedOptions )
          ));
      explosion(engine)
  }


    if(ifClicked) {
        World.add(
            engine.world,
            Matter.Composites.stack(rocket.position.x-12, rocket.position.y+20, col,row, rGap, cGap, (x, y) =>
              Matter.Bodies.circle(x, y, Matter.Common.random(5, 2), bodyOptions)
            ));
            console.log(rocket.position.y)
            Matter.Body.setVelocity(rocket,{x:rocket.velocity.x-.001, y:rocket.velocity.y-.4})
            explosion(engine)
        }
}

function explosion(engine) {
    const bodies = Matter.Composite.allBodies(engine.world);
    for (let i = 0; i < bodies.length; ++i) {
      const body = bodies[i];
  
      if (!body.isStatic && body.position.y >= 500) {
        const forceMagnitude = forcePower * body.mass;//.025
  
        Matter.Body.applyForce(body, body.position, {
          x:
            (forceMagnitude + Matter.Common.random() * forceMagnitude) *
            Matter.Common.choose([1, -1]),
          y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
        });
      }
    }
  }
