const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['asdfasdf;lj sadf sfa'],
  })
);

app.get('/signup', (req, res) => {
  res.send(`
  <!-- <h1>hi there, your id is ${req.session.userId}</h1> -->
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

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirm) {
    return res.send('passwords do not match');
  }

  // create user to represent this person
  const user = await usersRepo.create({ email, password });

  // store the id in the users cookie
  req.session.userId = user.id;

  res.send('<h1>Account Created</h1>');
});

app.get('/signout', (req, res) => {
  req.session = null;

  res.send('You are signed out');
});

app.get('/signin', (req, res) => {
  res.send(`
  <form method="post">
  <input type="email" name="email" placeholder="Enter Email Address" />
  <input type="password" name="password" placeholder="Enter password" />
  <button type="submit">Sign In</button>
</form>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userId = user.id;

  res.send('You are signed in');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
