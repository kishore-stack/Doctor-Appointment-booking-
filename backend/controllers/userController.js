import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';
//api to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.json({ success: false, message: 'All fields are required' });

        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' });
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword
        };
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    };
}
//api to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    };
}
//api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;   // <-- FIXED LINE
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//api to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file;
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'All fields are required' });
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        if(imageFile)
        {
            //update profile picture
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {image: imageURL});
        }
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//api to book appointment
const bookAppointment = async (req, res) => {
    try {
         const userId = req.userId; 
        const{docId,slotTime,slotDate}=req.body;
        const docData=await doctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.json({success:false,message:'Doctor is not available'});
        }
        let slots_booked=docData.slots_booked
        //checking for sots availability
        if(slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot not available'});
        } 
        else{
            slots_booked[slotDate].push(slotTime);
        }
        }
         else{
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);
        }

        const userData=await userModel.findById(userId).select('-password');
        delete docData.slots_booked;
        const appointmentData={
            userId,docId,slotTime,slotDate,userData,docData,amount:docData.fees,date:Date.now()
        }

        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save();
        // save new slots data in doc data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked:slots_booked});
        res.json({success:true,message:'Appointment booked successfully'});


    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api to get user appointments fro frontend my appointments page
const listAppointment =async(req,res)=>{
    try {
        const userId=req.userId;
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments});
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//api to cancel appointment
const cancelAppointment =async(req,res)=>{
    try {
         const userId = req.userId;
        const{appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        //verify appointment user
        if(appointmentData.userId!==userId){
            return res.json({success:false,message:'You are not authorized to cancel this appointment'});
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
        // releasing doctor slot
        const {docId,slotDate,slotTime}=appointmentData;
        const doctorData=await doctorModel.findById(docId);
        let slots_booked=doctorData.slots_booked;
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime);
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment cancelled successfully'})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment,cancelAppointment };
