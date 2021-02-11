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
    let category = await Category.find({})
      .populate("info")
      .skip(from)
      .limit(limited)
      .exec();
    let count = await Category.countDocuments();

    success(res, "", 200, {
      category: category,
      count: count,
    });
  } catch (err) {
    console.log(err);
    error(res, "", 500, err);
  }
};

const create = async (req, res) => {
  try {
    const create ={
      name: req.body.name,
      parent: req.body.parent,
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.lowercase,
      }),
    }

    if(req.files){
      const img = upload(req.files.img, res, req.body.name, "category");
      create.img = img
    }
    

    let category = new Category(create);

    await category.save();

    success(res, "Has been saved successfully", 201, category);
  } catch (err) {
    console.log(err)
    error(res, "", 500, err);
  }
};

const show = async (req, res) => {
  try {
    let name = req.params.name;
    let category = await Category.findOne({ name: name }).populated(["parent"]);

    if (!category) {
      error(res, "Resource not found", 404, "");
    }

    success(res, "", 200, category);
  } catch (err) {
    error(res, "", 500, err);
  }
};

const edit = async (req, res) => {
  try {
    let id =req.params.id;
    let category = await Category.findOne({ _id: id }).populate(["products", 'parent', 'childs']);

    if (!category) {
      error(res, "Resource not found", 404, "");
    }

    let data = {
      category,
      image: "/api/images/public/category/" + category.img,
    };
    
    success(res, "", 200, data);
  } catch (err) {
    console.log(['[ERROR]', err])
    error(res, "", 500, err);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;

    const name = body.name;

    const updates = {
      name,
      parent: req.body.parent,
      slug: urlSlug(req.body.name, {
        transformer: urlSlug.transformers.lowercase,
      }),
    };

    if (req.files) {
      let img = upload(req.files.img, res, req.body.name, "category");
      updates.img = img;
    }

    let category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!category) {
      destroyImage("category", body.img);
      error(res, "Resource not found", 404, "");
    }

    destroyImage("category", body.oldImage);

    success(res, "Has been saved successfully", 201, category);
  } catch (err) {
    error(res, "", 500, err);
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
