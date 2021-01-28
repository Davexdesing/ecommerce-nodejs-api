const Size = require("../models/Size");
const { success, error } = require("../network/response");
const ImageStock = require("../models/StockImage");

const update = async (req, res) => {
  try {
    const id = req.params.size;

    const update = {
      quntity: req.body.quantity,
      name: req.body.name
    }

    let size = await Size.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if(!size) error(res, "Resource not found", 404, "");

    success(res, "Has been saved successfully", 201, size);
  } catch (err) {
    console.error('[error]', err)
    error(res, "", 500, err);
  }
};
const create = async (req, res) => {
  try {
    const id = req.params.stock;

    const size = new Size({
      quantity: req.body.quantity,
      name: req.body.name,
      stock: id
    });

    await size.save();

    success(res, "Has been saved successfully", 201, size);
  } catch (err) {
    console.error('[error]', err)
    error(res, "", 500, err);
  }
};
const destroy = async (req, res) => {
  try{
    const id = req.params.image
    const size = await Size.findOneAndDelete(id);

    success(res, "Has been deleted successfully", 201, size);

  }catch(err){
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

module.exports = {
  update,
  create,
  destroy,
};
