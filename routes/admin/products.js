const express = require('express');
const productsRepo = require('../../repositories/products');
const newProductsTemplate = require('../../views/admin/products/new');

const router = express.Router();

const app = express();

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
  res.send(newProductsTemplate({}));
});

module.exports = router;
