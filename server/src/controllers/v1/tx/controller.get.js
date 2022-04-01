const TX = require('../../../models/v1/tx');

module.exports = {
  all: async (req, res, next) => {
    try {
      const data = await TX.find().populate('product_id');

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },

  specificList: async (req, res, next) => {
    const { type } = req.params;

    try {
      let data = await TX.find();
      data = data.filter((item) => item.productId === type);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
