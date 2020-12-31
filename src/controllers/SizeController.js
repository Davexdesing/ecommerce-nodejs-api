const Size = require("../models/Size");
const { success, error } = require("../network/response");
const ImageStock = require("../models/StockImage");

const update = async (req, res) => {
  try {
    const id = req.params.size;

    let size = await Size.findByIdAndUpdate(
      id,
      {
        quantity: req.body.quantity,
      },
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

    const image = new Size({
      quantity: req.body.quantity,
      name: req.body.name,
      stock: id
    });

    await image.save();

    success(res, "Has been saved successfully", 201, image);
  } catch (err) {
    console.error('[error]', err)
    error(res, "", 500, err);
  }
};
const destroy = async (req, res) => {
  try{
    const id = req.params.image
    const image = await Size.findOneAndDelete(id);
    destroyImage("product", req.body.oldImage);

    success(res, "Has been deleted successfully", 201, image);

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
