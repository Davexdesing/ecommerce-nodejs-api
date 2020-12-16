const {config} = require('../src/config/index')
const mongoose = require('mongoose');

mongoose.connect(config.mongodb)
        .then(db  => console.log("Database connect to", db.connection.name))
        .catch(error => console.log(error))