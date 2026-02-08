const User=require("../models/User");
const OTP=require("../models/OTP");

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
}