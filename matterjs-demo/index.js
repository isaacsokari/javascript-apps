const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
} = Matter;

const width = 400,
  height = 300;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, { mouse: Mouse.create(render.canvas) })
);

// walls
const walls = [
  Bodies.rectangle(200, 0, 400, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(200, 300, 400, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(0, 150, 20, 300, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 150, 20, 300, {
    isStatic: true,
  }),
];

// random shapes
for (let i = 0; i < 20; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 30, 30)
    );
  }
  World.add(
    world,
    Bodies.circle(Math.random() * width, Math.random() * height, 15)
  );
}

World.add(world, walls);
