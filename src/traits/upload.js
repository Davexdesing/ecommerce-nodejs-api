const urlSlug = require("url-slug");
const path = require('path')
const fs = require('fs')


const upload = (image, res, name, type) => {
  let imgUrl;
  if (!image) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se ha seleccionado ningún img",
        name: name
      },
    });
  }

  let img = image;
  let nameSplit = img.name.split(".");
  let extension = nameSplit[nameSplit.length - 1];

  // Extensiones permitidas
  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message:
          "Las extensiones permitidas son " + extensionesValidas.join(", "),
        ext: extension,
      },
    });
  }

  const urlName = urlSlug(name, {
    transformer: urlSlug.transformers.uppercase,
  });

  // Cambiar nombre al img
  // 183912kuasidauso-123.jpg
  let nameImg = `${urlName}-${type}-${new Date().getMilliseconds()}.${extension}`;

  img.mv(`uploads/${type}/${nameImg}`, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        err,
      });
  });

  return nameImg;
};

const destroyImage = (type, name) => {
  let pathImagen = path.resolve(__dirname, `../../uploads/${type}/${name}`);
  console.log(pathImagen)
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
   
  }
};

module.exports = {
  upload,
  destroyImage,
};
