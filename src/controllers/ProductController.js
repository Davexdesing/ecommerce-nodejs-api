const Product = require("../models/Product");
const Category = require("../models/Category");
const urlSlug = require("url-slug");
const { upload, destroyImage } = require("../traits/upload");

const all = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let product = await Product.find({})
      .populate("category")
      .skip(from)
      .limit(limited)
      .exec();
    let count = await Product.count();

    res.json({
      data: product,
      count: count,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req, res) => {
  try {
    const img = upload(req.files, res, req.body.name, "product");
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      img: img,
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.uppercase,
      }),
    });

    await product.save();

    res.json({
      data: product,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id).populate('stocks');

    if (!product) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }
    const image = "/api/images/public/product/" + product.img;

    res.json({
      data: product,
      image: image,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;

    const name = body.name;

    const updates = {
      name,
      description: body.description,
      category: body.category
    };

    if (req.files) {
      let img = upload(req.files.img, res, req.body.name, "product");
      destroyImage("product", body.oldImage);
      updates.img = img;
    }

    let product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!product) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: product,
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

module.exports = {
  all,
  show,
  update,
  create,
  destroy,
};
