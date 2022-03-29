const express = require('express');
const txRouter = require('./tx');

const v1Router = express.Router();

v1Router.use('/tx', txRouter);

module.exports = v1Router;
