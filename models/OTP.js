const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema=new mongoose.Schema({
   
   email: {
        type:String,
        required:true,
   },

   otp: {
        type:String,
        required:true,
   },

   createdAt: {
        type:Date,
        default:Date.now(),
        expires:5*60,
   },  
});

//function to send email 

async function sendVerificationEmail(email,otp){
    
     try{

      const htmlContent = `
            <div style="font-family: sans-serif; padding: 20px;">
                <h2>StudyNotion Verification</h2>
                <p>Your one-time password is: <strong style="font-size: 18px; color: #4A90E2;">${otp}</strong></p>
                <p>This code expires in 5 minutes.</p>
            </div>
        `;
      
       const mailResponse=await mailSender(email,"Verification email from StudyNotion",otp);
       console.log("Email sent Successfully:",mailResponse);

     }
     catch(error){
        console.log("error occured while sending email");
        throw error;
     }

   }

   OTPSchema.pre("save",async function(next){

      await sendVerificationEmail(this.email,this.otp);
      
   })

module.exports=mongoose.model("OTP",OTPSchema);