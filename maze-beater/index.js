const { Engine, Render, Runner, World, Bodies } = Matter;

const width = document.body.clientWidth > 600 ? 600 : 300;
const height = width;
const cells = 3;

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

// maze generation

const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const moveThroughCell = (row, column) => {
  // if cell is visited, return
  if (grid[row][column]) return;

  // mark current cell as visited
  grid[row][column] = true;

  // assemble randomly ordered list of neighbor
  const neighbors = shuffle([
    [row - 1, column],
    [row, column + 1],
    [row + 1, column],
    [row, column - 1],
  ]);
  // for each neighbor,
  // check if the neighbor is out of bounds
  // if the neighbour has been visiited, continue to next neighbour
  // remove a wall from horizontals/verticals
  // visit next cell
};

moveThroughCell(1, 1);
