function newGame() {
  const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const cellsHorizontal = 3;
  const cellsVertical = 3;

  const cellLength = width / cellsHorizontal;
  const cellHeight = height / cellsVertical;
  const wallSize = 10;

  const engine = Engine.create();

  const { world } = engine;

  // set gravity to 0
  world.gravity.y = 0;

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

  // walls
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, height, width, 2, {
      isStatic: true,
    }),
    Bodies.rectangle(0, height / 2, 2, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width, height / 2, 2, height, {
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

  const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));

  const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);

  const moveThroughCell = (row, column) => {
    // if cell is visited, return
    if (grid[row][column]) return;

    // mark current cell as visited
    grid[row][column] = true;

    // assemble randomly ordered list of neighbor
    const neighbors = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'],
      [row, column - 1, 'left'],
    ]);
    // for each neighbor,
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;

      // check if the neighbor is out of bounds
      if (
        nextRow < 0 ||
        nextRow >= cellsVertical ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal
      ) {
        continue;
      }

      // if the neighbour has been visiited, continue to next neighbour
      if (grid[nextRow][nextColumn]) continue;

      // remove a wall from horizontals/verticals
      if (direction === 'left') {
        verticals[row][column - 1] = true;
      } else if (direction === 'right') {
        verticals[row][column] = true;
      } else if (direction === 'up') {
        horizontals[row - 1][column] = true;
      } else if (direction === 'down') {
        horizontals[row][column] = true;
      }

      // visit next cell
      moveThroughCell(nextRow, nextColumn);
    }
  };

  moveThroughCell(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }

      const xPosition = columnIndex * cellLength + cellLength / 2;
      const yPosition = rowIndex * cellHeight + cellHeight;

      const wall = Bodies.rectangle(
        xPosition,
        yPosition,
        cellLength,
        wallSize,
        {
          isStatic: true,
          label: 'wall',
          render: {
            fillStyle: 'red',
          },
        }
      );
      World.add(world, wall);
    });
  });

  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) return;

      const xPosition = columnIndex * cellLength + cellLength;
      const yPosition = rowIndex * cellHeight + cellHeight / 2;

      const wall = Bodies.rectangle(
        xPosition,
        yPosition,
        wallSize,
        cellHeight,
        {
          isStatic: true,
          label: 'wall',
          render: {
            fillStyle: 'red',
          },
        }
      );
      World.add(world, wall);
    });
  });

  // the goal/objective

  const goal = Bodies.rectangle(
    width - cellLength / 2,
    height - cellHeight / 2,
    cellLength * 0.7,
    cellHeight * 0.7,
    {
      isStatic: true,
      label: 'goal',
      render: {
        fillStyle: 'green',
      },
    }
  );

  World.add(world, goal);

  // ball
  const ballRadius = Math.min(cellLength, cellHeight) / 4;
  const ball = Bodies.circle(cellLength / 2, cellHeight / 2, ballRadius, {
    label: 'ball',
    render: {
      fillStyle: 'blue',
    },
  });

  World.add(world, ball);

  document.addEventListener('keydown', (event) => {
    const { x, y } = ball.velocity;

    if (event.keyCode === 87) {
      Body.setVelocity(ball, { x, y: y - 3 });
    }
    if (event.keyCode === 68) {
      Body.setVelocity(ball, { x: x + 3, y });
    }
    if (event.keyCode === 83) {
      Body.setVelocity(ball, { x, y: y + 3 });
    }
    if (event.keyCode === 65) {
      Body.setVelocity(ball, { x: x - 3, y });
    }
  });

  // check win condition

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      const labels = ['ball', 'goal'];
      if (
        labels.includes(collision.bodyA.label) &&
        labels.includes(collision.bodyB.label)
      ) {
        document.querySelector('.winner').classList.remove('hidden');
        world.gravity.y = 1;
        world.bodies.forEach((body) => {
          if (body.label === 'wall') {
            Body.setStatic(body, false);
          }
        });
      }
      return;
    });
  });
}

newGame();

document.querySelector('button').addEventListener('click', () => {
  // document.querySelector('canvas').remove();
  // document.querySelector('.winner').classList.add('hidden');
  // newGame();

  window.location.reload();
});
