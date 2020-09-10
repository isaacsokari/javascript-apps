const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const newProductsTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
  res.send(newProductsTemplate({}));
});

router.post(
  '/admin/products/new',
  [requireTitle, requirePrice],
  upload.single('image'),
  async (req, res) => {
    const errors = validationResult(req);

    console.log(req.file, req.body);

    if (!errors.isEmpty()) {
    }

    const { title, price, image } = req.body;

    // await productsRepo.create({ title, price, image });
    res.send('submitted');
  }
);

module.exports = router;
