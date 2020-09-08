#!/usr/bin/env node

const fs = require('fs');

const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((name) => lstat(name));

  const allStats = await Promise.all(statPromises);

  for (let stat of allStats) {
    const index = allStats.indexOf(stat);

    console.log(filenames[index], stat.isFile());
  }
});
