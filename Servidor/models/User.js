const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  sexo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  telefono:{
    type:Number,
    require:true
  },
  fechanac:{
    type:Date,
    require:true
  },
  pesokg:{
    type:Number,
    require:true
 },
administrador:{
    type:Boolean,
    require:true
 },
  registro: {
    type: Date,
    default: Date.now(),
  },
  recoveryNumber:{
    type:Number,
    default:Math.E,
  }
});

module.exports = mongoose.model("User", UserSchema);
