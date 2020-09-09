const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', async (req, res) => {
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

router.get('/signout', (req, res) => {
  req.session = null;

  res.send('You are signed out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
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

module.exports = router;
