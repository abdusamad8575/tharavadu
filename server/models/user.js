const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  grandmotherName: { type: String, required: true },
  photo: { type: String, required: true },  
  address: { type: String, required: true },
  temAddress: { type: String, required: true },
  phone: { type: String, required: true },
  job: { type: String, required: true },
  marriageStatus: { type: String, required: true },
  spouseName: { type: String },
  children: [{
    name: String,
    age: String,
    gender: String,
  }],
  subgroup: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
