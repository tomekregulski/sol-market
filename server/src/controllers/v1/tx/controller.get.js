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
      let data = await TX.find().populate('product_id');
      data = data.filter((item) => item.productId === type);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },

  user: async (req, res, next) => {
    const { wallet } = req.params;
    console.log(wallet);

    try {
      let data = await TX.find().populate('product_id');
      data = data.filter((item) => item.wallet === wallet);

      let userPurchases = {};

      data.map((tx) => {
        userPurchases[tx.product_id._id]
          ? (userPurchases[tx.product_id._id] =
              userPurchases[tx.product_id._id] + tx.quantity)
          : (userPurchases[tx.product_id._id] = tx.quantity);
      });

      data = { data, userPurchases };

      console.log(data);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
