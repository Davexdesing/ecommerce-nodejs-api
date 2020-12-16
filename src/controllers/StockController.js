const { upload } = require('../traits/upload')
const Stock = require('../models/Stock')

const all = async (req,res) => {
  try{
    console.log(req.params.id)

    const stock = await Stock.find({ product: req.params.id }).exec();

    res.json({
      data: stock,
    });

  }catch (err){
    console.log(err)
  }
}
const create = async (req, res) => {
  try {
    let id = req.params.id;
    const imageOne = upload(req.files.imgOne, res, id + "-one", "product");
    const imageTwo = upload(req.files.imgTwo, res, id+ "-two", "product");
    const imageThree = upload(req.files.imgThree, res, id+ "-three", "product");
    const imageFour = upload(req.files.imgFour, res, id+ "-four", "product");
    const images = [imageOne, imageTwo, imageThree, imageFour];
    let stock = new Stock({
      price: req.body.price,
      color: req.body.color,
      size: req.body.size,
      product: id,
      empty: req.body.empty,
      images: images
    });

    await stock.save();

    res.json({
      data: stock,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
};
const update = async (req, res) => {
  try {
    let id = req.params.id;
    let stockId = req.params.stock
    let body = req.body;


    const updates = {
      price: body.price,
      color: body.color,
      size: body.size,
      empty: body.empty
    };

    let stock = await Stock.findByIdAndUpdate(stockId, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!stock) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: stock,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      message: "Ups, Have a problem!",
    });
  }
};
const destroy = async (req, res) => {};
const show = async (req,res) => {
  try {
    let id = req.params.id;
    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: stock,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  destroy,
  update,
  show,
  all
};
