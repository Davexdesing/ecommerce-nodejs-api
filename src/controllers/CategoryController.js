const Category = require("../models/Category");
const urlSlug = require("url-slug");
const { upload, destroyImage } = require("../traits/upload");

const all = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limited = req.query.limited || 15;
    limited = Number(limited);
    let category = await Category.find({}).populate('info').skip(from).limit(limited).exec();
    let count = await Category.count();

    res.json({
      data: category,
      count: count,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req, res) => {
  try {
    const img = upload(req.files, res, req.body.name, "category");

    let category = new Category({
      name: req.body.name,
      img: img,
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.lowercase,
      }),
    });

    await category.save();

    res.json({
      data: category,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  try {
    let name = req.params.name;
    let category = await Category.findOne({ name: name });

    if (!category) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: category,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const edit = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id).populate('products');

    if (!category) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }
    let data = {
      category,
      image: "/api/images/public/category/" + category.img,
    };

    res.json({
      data,
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
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.lowercase,
      }),
    };

    if (req.files) {
      let img = upload(req.files.img, res, req.body.name, "category");
      destroyImage("category", body.oldImage);
      updates.img = img;
    }

    let category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!category) {
      return res.status(400).json({
        message: "No se Ha encontrado el recurso",
      });
    }

    res.json({
      data: category,
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
  update,
  show,
  create,
  all,
  edit,
};
