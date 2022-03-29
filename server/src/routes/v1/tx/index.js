const express = require('express');
const controllers = require('../../../controllers/v1/tx');

const txRouter = express.Router();

txRouter.route('/').get(controllers.get.all);
txRouter.route('/:type').get(controllers.get.specificList);
txRouter.route('/').post(controllers.post);

module.exports = txRouter;
