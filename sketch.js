const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;
const Render = Matter.Render;
const Runner= Matter.Runner;
const Bounds=Matter.Bounds;
const Events=Matter.Events;
const Body   = Matter.Body;
const Common = Matter.Common;
const Composites = Matter.Composites;

var engine;
var ground;
var ramps=[];
var ramp;
var currentCamBody;
var ball;
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
      var mouse = Mouse.create(document.body);
      var mouseParams = {
        mouse : mouse,
        constraint: {
          stiffness: 0.01,
        }
      }
      mouseConstraint = MouseConstraint.create(engine, mouseParams);
      mouseConstraint.mouse.pixelRatio = pixelDensity();
      World.add(engine.world, mouseConstraint);


  plat1 = Bodies.rectangle(250, 100, 400, 30, {
    isStatic: true,
  })

  World.add(engine.world, plat1);



  plat2 = Bodies.rectangle(250, 400, 400, 30, {
    isStatic: true,
  })

  World.add(engine.world, plat2);


  testRect = Bodies.rectangle(100,0, 50, 50)
  World.add(engine.world, testRect);
  currentCamBody=testRect










  
  //create portal
  portal1 = Bodies.circle(400, 30, 50,{
    isStatic: true,
    render: {
      sprite: {
        texture: '/Users/dpatel/Desktop/portal_golberg/portal.jpeg',
        xScale: 2,
        yScale: 2
        //Is there a 'width:' or 'height' property?  
      }
    }
  //   render: {
  //     sprite: {
  //         texture: '/Users/dpatel/Desktop/portal_golberg/portal.jpeg'
  //     }
  // }
  });
  World.add(engine.world, portal1);

  portal2 = Bodies.circle(400,330, 50,{
    isStatic: true,
  });

  //PORTALING CODE
  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        console.log("helos")
        Body.setVelocity(testRect, {x:10, y:testRect.velocity.y});
    }
}

  World.add(engine.world, portal2);
  Engine.run(engine);
  //camera
  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 800,
      y: 800
    })
 }.bind(this));

}
function draw() {
  var collision = Matter.SAT.collides(portal1, testRect);
  if (collision.collided) {
    Matter.Body.set(testRect, "position", {x: testRect.position.x-50, y: portal2.position.y});
  }
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
