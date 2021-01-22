const Product = require("../models/Product");
const Category = require("../models/Category");
const urlSlug = require("url-slug");
const { success, error } = require("../network/response");
const { upload, destroyImage } = require("../traits/upload");

const all = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let product = await Product.find({})
      .populate([
        "category",
        {
          path: "stocks",
          model: "Stock",
          populate: {
            path: "stockimages",
            model: "StockImage",
          },
        },
        {
          path: "stocks",
          model: "Stock",
          populate: {
            path: "sizes",
            model: "Size",
          },
        },
      ])
      .skip(from)
      .limit(limited)
      .exec();
    let count = await Product.count();

    success(res, "", 200, {
      product: product,
      count: count,
    });
  } catch (err) {}
};

const create = async (req, res) => {
  try {
    const img = upload(req.files.img, res, req.body.name, "product");
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      img: img,
      price: req.body.price,
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.uppercase,
      }),
    });

    await product.save();

    success(res, "Has been saved successfully", 201, product);
  } catch (err) {
    error(res, "", 500, err);
  }
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id).populate([
      "category",
      {
        path: "stocks",
        model: "Stock",
        populate: {
          path: "stockimages",
          model: "StockImage",
        },
      },
      {
        path: "stocks",
        model: "Stock",
        populate: {
          path: "sizes",
          model: "Size",
        },
      },
    ]);

    if (!product) {
      error(res, "Resource not found", 404, "");
      return;
    }

    const image = "/api/images/public/product/" + product.img;

    const data = {
      product: product,
      image: image,
    };

    success(res, "", 200, data);
  } catch (err) {
    error(res, "", 500, err);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let img;

    const name = body.name;

    const updates = {
      name,
      description: body.description,
      category: body.category,
      available: body.available,
      price: body.price
    };

    if (req.files) {
      let img = upload(req.files.img, res, req.body.name, "product");
      updates.img = img;
    }

    let product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!product) {
      destroyImage("product", img);
      error(res, "Resource not found", 404, "");
    }

    if (img) {
      destroyImage("product", body.oldImage);
    }

    success(res, "Has been saved successfully", 201, product);
  } catch (err) {
    error(res, "", 500, err);
  }
};

const showPublic = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id).populate([
      "category",
      {
        path: "stocks",
        model: "Stock",
        populate: {
          path: "stockimages",
          model: "StockImage",
        },
      },
      {
        path: "stocks",
        model: "Stock",
        populate: {
          path: "sizes",
          model: "Size",
        },
      },
    ]);

    if (!product) {
      error(res, "Resource not found", 404, "");
    }

    const response = {
      name: product.name,
      category: product.category.name,
      stock: product.stocks[0],
      description: product.description,
      price: product.price,
      stocks: product.stocks
    }


    success(res, "", 200, response);
  } catch (err) {
    console.log(err)
    error(res, "", 500, err);
  }
};

module.exports = {
  all,
  show,
  update,
  create,
  showPublic
};
