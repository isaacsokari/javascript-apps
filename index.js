const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('<h1>Account Created</h1>');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
