const Order = require("../models/Order")
const User = require("../models/User")
const Product = require("../models/Product")
const { success } = require("../network/response")

const dashboard = async (req,res) => {
    try{
        const order = await Order.countDocuments();

        const product = await Product.countDocuments();

        const user = await User.countDocuments();

        success(res, "", 200, {
            products: product,
            orders: order,
            users: user
          })
    }catch(err){
        error(res, "", 500, err)
    }
}

module.exports = {
    dashboard
}