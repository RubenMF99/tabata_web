const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.newUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "the user existing" });
    }

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.json({ token: token, user: user });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};
exports.UpdateUser = async(req,res)=>{
  //revisando si se fracacso estrepitosamente
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
    const {password } = req.body;
    const Newpassword = {};
    if(password){
      Newpassword.password = password; 
    }
    try {
      //revisar si existe el usuario
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ msg: "the user nou existing" });
      }
      //Si el password existe o no
      user = await User.findByIdAndUpdate({_id: req.params.id},{$set:Newpassword}, {new:true});
      res.json({user});
      
  }catch (error) {
      console.log(error);
      res.status(500).send("There was a mistake");
    }
  
}