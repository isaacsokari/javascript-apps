const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

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

  const existingItem = await cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, { items: cart.items });

  res.redirect('back');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    const cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;

    return res.send(cartShowTemplate({ items: cart.items }));
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  // if cartId on cookie has expired, create a new cart and replace it
  if (!cart) {
    req.session.cartId = null;
    const cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;

    return res.send(cartShowTemplate({ items: cart.items }));
  }

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect('back');
});

module.exports = router;
