var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

var pulleyCenter;


var mConstraint;

function setup() {
  var canvas = createCanvas(1000, 600);
  engine = Engine.create();
  world = engine.world;

  

  var prev2 = null;
  for (var x = 100; x < 700; x += 20) {
    var fixed2 = false;
    // if(x == 100 || x == 680){
    //   var rect = Bodies.rectangle(x, 150, 30, 30);
    //   World.add(world, rect);
    //   particles.push(rect);
    // }
    //else{
    var string = new Particle(x, 150, 10, fixed2);
    // var p2 = new Particle(200, 150, 10);
    particles.push(string);
    //}
  
    if (prev2) {
      var options = {
        bodyA: string.body,
        bodyB: prev2.body,
        length: 20,
        stiffness: .4
      };
      var constraint2 = Constraint.create(options);
      World.add(world, constraint2);
    }

    prev2 = string;
  }

  pulleyCenter = Bodies.circle(400, 200, 40, {
    isStatic: true
  })
  
  World.add(world, pulleyCenter);






  boundaries.push(new Boundary(500, height, width, 50, 0));


  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  //console.log(canvasmouse);
  var options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  console.log(mConstraint);
}


function draw() {
  background(51);
  Engine.update(engine);
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }


  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;
    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }

  



}