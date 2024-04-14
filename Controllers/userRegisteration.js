const User = require("../MongoDB/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateOtp,sendByEmail} = require('./SendOtp.js');
const OTP = require('./../MongoDB/OTPschema.js');
const cloudinary = require("cloudinary");
const { createToken } = require("../middleware/auth.js");

const userRegisteration = async (req,res)=>{
  const {
    email
  }=req.body;

  try{
    const checkuser = await User.findOne({email:email});
    
    if(checkuser){
      console.log("CheckUser:",checkuser,'\n');
      res.send({
        success:false,
        msg:"Email Already Exists"
      });
      return;
    }
    const otp = await generateOtp();
    await sendByEmail(email,otp);
    await OTP.deleteMany({email});
    const otpResponse = await OTP.create({otp,email});
    console.log(otpResponse);

    res.send({
      success:true,
      msg:"OTP successfull"
    })
    return;
  }catch(err){
      res.send({
        success:false,
        error:err,
        msg:"Some Error Occured"
      })
  }
};

const userSignin = async (req,res)=>{
    const {
      email,password,otp,
      firstname,lastname,gender,dob,city,state,
      illness,organs,need,bloodGroup,referral
    } = req.body;

    try{ 
        const otpresponse = await OTP.findOne({email});
        console.log(otpresponse);
        if(!otpresponse){
          res.send({
            success:false,
            msg:"OTP not found or OTP not send for this Email"
          })
          return;
        }
        if(otpresponse.otp == otp){
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const profilePicture = gender == "female" ? "https://res.cloudinary.com/dcnvvzsdh/image/upload/v1713006571/samples/cfkri1y7av4mkt14wfjt.jpg" :"https://res.cloudinary.com/dcnvvzsdh/image/upload/v1713006757/x6hnsvphztil2ounapch.jpg";
            let user = await User.create({
              email,password:hashPassword,otp,
              firstname,lastname,gender,dob,city,state,
              illness,organs,need,bloodGroup,referral,profilePicture
            });
            user.password = "*****";
            const token = createToken(user._id);
            res.cookie('codingsquad',token);
            res.send({
              success:true,
              token,
              userData:user
            });
        }else{
            res.send({
              success:false,
              msg:"OTP invalid"
            });
        }
    }catch(err){
      console.log(err);
      res.send({
        success:false,
        msg:"some Network Error",
        err
      })
    }
}

const getUserName = async (req,res)=>{
  try{
    const {user} = req.query;
    console.log(user);
    const isValid = await User.findOne({username:user});
    if(isValid){
      res.send({
        isUserUnique:false
      })
      return;
    }

    res.send({
      isUserUnique:true
    });
    
  }catch(err){
    console.log(err);
    res.send({
      isUserUnique:false,
      success:false,
      res:err
    })
  }


};
const addDetails = async (req, res) => {
  const { adharNo, panNo, licenseNo, barCouncilNo, officeAddress } = req.body;
  console.log("Aadhar No:", adharNo);
  console.log("Pan No:", panNo);
  console.log("License No:", licenseNo);
  console.log("Bar Council No:", barCouncilNo);
  console.log("Office Address:", officeAddress);
  res.send("OK");
};

const addExperience = (req, res) => {
  const submittedData = req.body;
  console.log("Received data on the server:", submittedData);
  res.json({ message: "Data received successfully on the server." });
};

const proffesionalData = (req, res) => {
  console.log(res.body);
  res.send("OK");
};



module.exports = {
  userRegisteration,
  proffesionalData,
  addDetails,
  addExperience,
  userSignin,
  getUserName
};
