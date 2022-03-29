const TX = require('../../../models/v1/tx');

module.exports = async (req, res, next) => {
  try {
    const newTX = new TX(req.body);
    await newTX.save();

    res.status(201).json(newTX);
  } catch (err) {
    next(err);
  }
};
