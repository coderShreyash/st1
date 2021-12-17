const Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Runner = Matter.Runner,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Composites = Matter.Composites,
  Common = Matter.Common;

var Render = Matter.Render;
var engine, world, render, runner, ground, ground1, ground2, mouse, mouseConstraint, stack1;
engine = Engine.create();
world = engine.world;
render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1400,
    height: 650,
    background: "gold",
  }
})

ground = Bodies.rectangle(700, 640, 1400, 20, {
  isStatic: true,
  render: {
    fillStyle: "brown"
  }
})

ground1 = Bodies.rectangle(1100, 200, 600, 20, {
  isStatic: true,
  angle: -Math.PI / 18,

  render: {
    fillStyle: "brown"
  }
})

ground2 = Bodies.rectangle(300, 400, 600, 20, {
  isStatic: true,
  angle: Math.PI / 18,
  render: {
    fillStyle: "brown"
  }
})
stack1 = Composites.stack(100, 150, 10, 5, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(10, 20), { friction:0.05, density: 0.01, restitution: 0.8,
    render: {
      fillStyle: `rgb(${Common.random(0, 200)},${Common.random(0, 200)},${Common.random(
        0,
        200
      )})`
    }
  });
})


stack2 = Composites.stack(1000, 0, 10, 5, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.1, density: 0.01, restitution: 0.8, render:{
    fillStyle: `rgb(${Common.random(0, 200)},${Common.random(0, 200)},${Common.random(
      0,
      200
    )})`
  } });
})

mouse = Mouse.create(render.canvas)
mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.25,
    render: {
      visible: true
    }
  },
})

Render.run(render);
Composite.add(world, [ground2, ground1, ground, mouse, mouseConstraint, stack1, stack2]);
runner = Runner.create();
Runner.run(runner, engine);