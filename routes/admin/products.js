const express = require('express');
const productsRepo = require('../../repositories/products');

const router = express.Router();

const app = express();

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {});

module.exports = router;
