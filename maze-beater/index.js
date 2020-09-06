const { Engine, Render, Runner, World, Bodies } = Matter;

const width = document.body.clientWidth > 600 ? 600 : 300,
  height = width;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    // wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 20, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 20, height, {
    isStatic: true,
  }),
];

World.add(world, walls);
