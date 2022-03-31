const express = require('express');
const txRouter = require('./tx');
const productRouter = require('./product');

const v1Router = express.Router();

v1Router.use('/tx', txRouter);
v1Router.use('/products', productRouter);

module.exports = v1Router;
