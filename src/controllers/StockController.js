const { upload } = require("../traits/upload");
const Stock = require("../models/Stock");
const ImageStock = require("../models/StockImage");
const Size = require("../models/Size");
const { success, error } = require("../network/response");

const all = async (req, res) => {
  try {
    console.log(req.params.id);

    const stock = await Stock.find({ product: req.params.id })
      .populate(["stockimages", "product"])
      .exec();

    success(res, "Has been saved successfully", 200, stock);
  } catch (err) {
    error(res, "", 500, err);
  }
};
const create = async (req, res) => {
  try {
    let id = req.params.id;

    let stock = new Stock({
      color: req.body.color,
      product: id,
    });

    await stock.save();

    success(res, "Has been saved successfully", 201, stock);
  } catch (err) {
    console.log('[error]', err)
    error(res, "", 500, err);
  }
};
const update = async (req, res) => {
  try {
    let stockId = req.params.stock;
    let body = req.body;

    const updates = {
      color: body.color,
    };

    let stock = await Stock.findByIdAndUpdate(stockId, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!stock) {
      error(res, "Resource not found", 404, "");
    }

    success(res, "Has been saved successfully", 201, stock);
  } catch (err) {
    
    error(res, "", 500, err);
  }
};
const destroy = async (req, res) => {};
const show = async (req, res) => {
  try {
    let id = req.params.stock;
    const stock = await Stock.findById(id).populate(["stockimages","sizes", "product"]);

    if (!stock) {
      error(res, "Resource not found", 404, "");
    }

    success(res, "Has been saved successfully", 200, stock);
  } catch (err) {
    console.log('[error]', err)
    error(res, "", 500, err);
  }
};

const showPublic = async (req, res) => {
  try {
    let id = req.params.stock;
    const stock = await Stock.findById(id).populate(["stockimages","sizes", "product"]);

    if (!stock) {
      error(res, "Resource not found", 404, "");
    }
    const response = {
      _id: stock._id,
      id: stock._id,
      color: stock.color,
      stock: stock,
      stockimages: stock.stockimages,
      product: stock.product

    }

    success(res, "Has been saved successfully", 200, response);
  } catch (err) {
    console.log('[error]', err)
    error(res, "", 500, err);
  }
};


module.exports = {
  create,
  destroy,
  update,
  show,
  all,
  showPublic
};
