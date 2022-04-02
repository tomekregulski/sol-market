const express = require('express');
const controllers = require('../../../controllers/v1/tx');

const txRouter = express.Router();

txRouter.route('/').get(controllers.get.all);
txRouter.route('/specific/:type').get(controllers.get.specificList);
txRouter.route('/user/:wallet').get(controllers.get.user);
txRouter.route('/').post(controllers.post);

module.exports = txRouter;
