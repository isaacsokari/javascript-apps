const fs = require('fs');
const crypto = require('crypto');
const Repository = require('./repository');

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository('products.json');
