const express = require('express');

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
const { handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, checkPassword, confirmPasswordsMatch],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    // create user to represent this person
    const user = await usersRepo.create({ email, password });

    // store the id in the users cookie
    req.session.userId = user.id;

    res.redirect('/admin/products');
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
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.redirect('/admin/products');
  }
);

module.exports = router;
