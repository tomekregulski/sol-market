const express = require('express');
const controllers = require('../../../controllers/v1/product');

const productRouter = express.Router();

productRouter.route('/').get(controllers.get.all);
productRouter.route('/').post(controllers.post);
productRouter.route('/:id').put(controllers.put);

module.exports = productRouter;
