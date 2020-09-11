const express = require('express');

const cartsRepo = require('../repositories/carts');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;

  // check if cart exists, else create cart
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);
  res.send('added to cart');
});

router.get('/cart/products', async (req, res) => {});

// router.post('/cart/:id/delete', async (req, res) => {});

module.exports = router;
