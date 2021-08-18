const User = require("../models/User");
const { validationResult } = require("express-validator");
const {Transporter} = require('../config/mailers');

exports.sendEmail = async (req,res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { email } = req.body;
    let  EditarUser = {};
    let user = await User.findOne({ email });
    try { 
      if (!user) {
        return res.status(404).json({ msg: "User not existing" });
      }
      const random = Math.floor(Math.random()*10000)+999;
      let NewUser = {
        recoveryNumber:random,
      };
       EditarUser = await User.findByIdAndUpdate({_id: user._id},{$set:NewUser}, {new:true});
    }catch(error){
      console.log(error);
    }
      await Transporter.sendMail({
        from: '"Forgot Password 👻" <tabatarecover@gmail.com>', // sender address
        to: email,  // list of receivers
        subject: "Forgot Contraseña", // Subject line
        text: `recovery code ${EditarUser.recoveryNumber}`, // plain text body
      });
  };
  