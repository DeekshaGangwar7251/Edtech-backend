const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");

//send otp

exports.sendOTP=async(req,res)=>{

  try{

    const{email}=req.body;
    const checkUserPresent=await User.findOne({email});

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'User already registered',
        })
    }

    //generate otp
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabet:false,
        lowerCaseAlphabet:false,
        specialChars:false,
    });
    console.log("OTP generated:",otp);

    //check unique otp or not
    let result=await OTP.findOne({otp:otp});

    while(result){
        otp=otpGenerator.generate(6,{
        upperCaseAlphabet:false,
        lowerCaseAlphabet:false,
        specialChars:false,
    
       });
       result=await OTP.findOne({otp:otp});
    }

    const otpPayload={email,otp};

    //create an entry in db

    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
        success:true,
        message:'OTP sent successfully',
        otp,
    })
  } catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
  }
};

//signup

//data fetch from request ki body
exports.signUp=async(req,res)=>{

try{  
const{
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp   
}=req.body;

//validate
if(!firstName ||!lastName||!email||!password||!confirmPassword||!otp){
    return res.status(403).json({
        success:false,
        message:'All fields are required',
    })
}

//password match 
if(password!==confirmPassword){
    return res.status(400).json({
        success:false,
        message:'password and confirmPassword value does not match please try again',
    });
}

//check user already exist or not

const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({
        success:false,
        message:'User is already registered',
    });
}

//find most recent otp stored for the user

const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
console.log(recentOtp);
//validate OTP
if(recentOtp.length==0){
    //otp not found
    return res.status(400).json({
        success:false,
        message:'OTP not found',
    })
}
else if(otp!==recentOtp.otp){
   //Invalid OTP
   return res.status(400).json({
    success:false,
    message:'Invalid OTP',
   });
}

//hash password
const hashedPassword=await bcrypt.hash(password,10);

//entry create in db

const profileDetails=await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null,
});

const user=await User.create({
    firstName,
    lastName,
    email,contactNumber,
    password:hashedPassword,
    accountType,
    additionalDetails:profileDetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
})

return res.status(400).json({
    success:true,
    message:'User is registered successfully',
    user,
})

} catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'User cannot registered ,please try again',
    });
 }



}