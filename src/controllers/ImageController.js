const fs = require('fs')
const path = require('path')


const getImage = (req, res) => {

    let type = req.params.type;
    let image = req.params.name;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ type }/${ image }`);
    

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImagePath = path.resolve(__dirname, '../../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
}

module.exports = {
    getImage
}