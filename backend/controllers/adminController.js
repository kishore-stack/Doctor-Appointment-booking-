import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorsModel.js'
import jwt from 'jsonwebtoken'
const addDoctor = async (req, res) => {
  try {
    console.log("🟢 Incoming Request Body:", req.body);
    console.log("🟢 Incoming File:", req.file);

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file?.path;
console.log("🟣 Multer file info:", req.file);

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      console.log("❌ Missing Fields:", { name, email, password, speciality, degree, experience, about, fees, address, imageFile });
      return res.json({ success: false, message: "missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "invalid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });

  } catch (error) {
    console.error("🔥 Error adding doctor:", error);
    res.json({ success: false, message: "error in adding doctor", error: error.message });
  }
};
//api for admin login
const loginAdmin=async(req,res)=>{
  try {
    const{email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
const token=jwt.sign(email+password,process.env.JWT_SECRET)
res.json({success:true,token})

    }else{
      res.json({success:false,message:"invalid credentials"})
    }
  }
  catch (error) 
  {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
const allDoctors=async(req,res)=>
{
  try{
    const doctors =await doctorModel.find({}).select('-password')
    res.json({success:true,doctors}) 

  }
  catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


export  { addDoctor, loginAdmin,allDoctors };