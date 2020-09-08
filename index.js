#!/usr/bin/env node

const fs = require('fs');
const { lstat } = fs.promises;
const chalk = require('chalk');

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((name) => lstat(name));

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
