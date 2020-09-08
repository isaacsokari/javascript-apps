const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
    // throw new Error('')
  }

  console.log(filenames);
});
