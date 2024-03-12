const express = require('express');
const router = express.Router();
const getAllProducts = require('../controllers/getAllProducts.js');
const getAllCategories = require('../controllers/getCategories.js');
const getByCategory = require('../controllers/getByCategory.js');
const getProductsById = require('../controllers/getProductById.js');
const getSIngleProduct = require('../controllers/getAllProducts.js');
const getTitles = require('../controllers/getTitles.js');
router.get('/products/all',getAllProducts);
router.get('/categories',getAllCategories);
router.get('/category/:category',getByCategory);
router.get('/products/:id',getProductsById);
router.get('/titles',getTitles);
module.exports = router;