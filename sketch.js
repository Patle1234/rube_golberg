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
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;

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
var rest = 1.14; 
var car;
progX=595//the originial x of the progectile
progY=130//the originial y of the progectile
function setup() {
  //this is where you create canvas
  canvas = createCanvas(0, 0,WEBGL);
  // create an engine
    engine = Engine.create();
       //     create a renderer
          var render = Render.create({
              element: document.body,
              engine: engine,
              options: { 
                          width: 1400, 
                          height: 800,
                          wireframes: false,
                      }
          });
          Render.run(render);


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        
    World.add(engine.world, mouseConstraint);

   
        car=Bodies.circle(progX, progY,40)

      World.add(engine.world,car)

      var anchor={ x: progX, y: progY };

      var elastic =Matter.Constraint.create({ 
        pointA: anchor, 
        bodyB: car, 

        stiffness: 0.05
    });
    World.add(engine.world,elastic)
    



      ramp1 = Bodies.rectangle(400, 400, 900, 30, {
        isStatic: true,
        angle: Math.PI * 0.75
      })
        World.add(engine.world, ramp1)
        currentCamBody=ramp1


        stopper = Bodies.rectangle(400, 350, 70, 30, {
          isStatic: true,
          angle: Math.PI * 0.25//x-50
        })
          World.add(engine.world, stopper)

  ramp2 = Bodies.rectangle(3500, 400, 900, 30, {
    isStatic: true,
    angle: Math.PI * 0.05//x-70
  })
    World.add(engine.world, ramp2)



var firing=false;
    Events.on(mouseConstraint, 'enddrag', function(e) {
      if(e.body===car){
        firing=true
        console.log("in the drag ")
      }

  });


  Matter.Events.on(engine,'afterUpdate', function() {
    if (firing && Math.abs(car.position.x-progX) < 20 && Math.abs(car.position.y-progY) < 20) {
      currentCamBody=car
      car=Bodies.circle(progX, progY,40)
        Matter.World.add(engine.world, car);
        elastic.bodyB = car;
        firing = false;
        console.log("in the fire ")


    }

      //camera
  Events.on(engine, 'beforeTick', function() {
    Render.lookAt(render, currentCamBody, {
      x: 800,
      y: 800
    });
    if(currentCamBody.position.y==405){
    console.log(currentCamBody.position.x)
    console.log(currentCamBody.position.y)
    }

  }.bind(this));

  });



  render.mouse = mouse;




  Engine.run(engine);

}
// function draw() {

//   const size = width * 0.2 ;
//   const spacing=40;
//   rotate(PI/2);
//   triangle(-(size/2), 0, 0,0, 0, size*1.6);
//   rotate(PI);
//   triangle((size/2), spacing, 0,spacing, 0, size*1.6+spacing);

//   drawBodies(car.bodies);
// }


// function drawVertices(vertices) {
//   beginShape();
//   for (let i = 0; i < vertices.length; i++) {
//     vertex(vertices[i].x, vertices[i].y);
//   }
//   endShape(CLOSE);
// }

// function drawBody(body) {
//   if (body.parts && body.parts.length > 1) {
//     for (let p = 1; p < body.parts.length; p++) {
//       drawVertices(body.parts[p].vertices)
//     }
//   } else {
//     drawVertices(body.vertices);
//   }
// }

// function drawBodies(bodies) {
//   for (let i = 0; i < bodies.length; i++) {
//     drawBody(bodies[i]);
//   }
// }







