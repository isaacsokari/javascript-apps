const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.send(`<h1>hi there</h1>
  <form method="post">
  <input type="email" name="email" placeholder="Enter Email Address" />
  <input type="password" name="password" placeholder="Enter password" />
  <input
    type="password"
    name="passwordConfirm"
    placeholder="Re-enter password"
  />
  <button type="submit">Sign Up</button>
</form>
`);
});

const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', (data) => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};

      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }

      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.post('/', bodyParser, (req, res) => {
  console.log(req.body);
  res.send('<h1>Account Created</h1>');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
