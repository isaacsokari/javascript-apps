#!/usr/bin/env node

const fs = require('fs');
const { lstat } = fs.promises;
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((name) =>
    lstat(path.join(targetDir, name))
  );

  const allStats = await Promise.all(statPromises);

  for (let stat of allStats) {
    const index = allStats.indexOf(stat);

    if (stat.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.blue.bold(filenames[index]));
    }
  }
});
