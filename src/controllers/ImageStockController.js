const ImageStock = require("../models/StockImage");
const { success, error } = require("../network/response")
const { upload,destroyImage } = require("../traits/upload");

const create = async (req, res) => {
  try {
    const id = req.params.stock;

    if(!req.files){
      error(res, "There is no image", 400, "")
    }
    const img = upload(req.files.img, res,  req.files.img.name , "product");

    const image = new ImageStock({
      image: img,
      stock: id,
    });

    await image.save();

    success(res, "Has been saved successfully", 201, image);
  } catch (err) {
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};
const destroy = async (req, res) => {
  try{
    const id = req.params.image
    const image = await ImageStock.findOneAndDelete(id);
    destroyImage("product", req.body.oldImage);

    success(res, "Has been deleted successfully", 201, image);

  }catch(err){
    console.error("[error]", err)
    error(res, "", 500, err);
  }
};

module.exports = {
  create,
  destroy,
};
