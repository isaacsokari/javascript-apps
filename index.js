#!/usr/bin/env node

const fs = require('fs');

// const { lstat } = fs.promises;

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const allStats = Array(filenames.length).fill(null);

  for (let name of filenames) {
    const index = filenames.indexOf(name);

    fs.lstat(name, (err, stats) => {
      if (err) {
        console.log(err);
      }

      allStats[index] = stats;

      const ready = allStats.every((stat) => {
        return stat;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }
    });
  }
});
