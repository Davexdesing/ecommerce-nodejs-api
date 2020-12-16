const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config')

const login = async (req,res) => {
    let body = req.body

    try{
        let user = await User.findOne({ email: body.email })

        let data = {
            id: user.id,
            role: user.role,
            name: user.name,
        }

        if(!user){
            return res.status(404).json({
                ok: false,
                message: "Invalid username or password"
            });
        }
        
        if(!bcrypt.compareSync( body.password, user.password )){
            return res.status(404).json({
                ok: false,
                message: "Invalid username or password"
            });
        }

        let token = jwt.sign({
            user: data
        }, config.authTokenSecret, {expiresIn: 60 * 20 })
        
        res.json({
            data: user,
            token
        });

    }catch(err){
        res.status(400).json(err);
    }
}

const refreshToken = async (req,res) => {

    let user = await User.findById(req.user.user.id)
    
    let data = {
        id: user.id,
        role: user.role,
        name: user.name,
    }

    let token = jwt.sign({
        user: data
    }, config.authTokenSecret, {expiresIn: 60 * 20 })

    res.json({
        token
    });

}



const forgotPassword = async (req,res) => {

}

const register = async (req,res) => {
    try {
        let user = new User({
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 10),
          email: req.body.email,
          phone: req.body.phone,
        });
    
        await user.save();
    
        res.json({
          data: user,
        });
      } catch (err) {
        res.status(400).json(err);
      }
}

module.exports = {
    login,
    register,
    forgotPassword,
    refreshToken
}