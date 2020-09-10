const express = require('express');
const { validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  checkPassword,
  confirmPasswordsMatch,
  checkEmailExists,
  checkSigninPassword,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, checkPassword, confirmPasswordsMatch],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const { email, password, passwordConfirm } = req.body;

    // create user to represent this person
    const user = await usersRepo.create({ email, password });

    // store the id in the users cookie
    req.session.userId = user.id;

    res.send('<h1>Account Created</h1>');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;

  res.send('You are signed out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [checkEmailExists, checkSigninPassword],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send('You are signed in');
  }
);

module.exports = router;
