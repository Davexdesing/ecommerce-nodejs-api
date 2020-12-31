const express = require('express')
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { config } = require('./config')

const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const loginRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const imageRoute = require('./routes/images')

require('./database')
const accepCors = {
    origin: config.frontendUrl
}
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use( fileUpload({ useTempFiles: true }) );



app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/', loginRoute);
app.use('/api/images', imageRoute);


app.listen(8000, () => {
    console.log('se ha conectado')
});