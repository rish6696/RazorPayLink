const dotenv = require('dotenv')
dotenv.config()


const RAZORPAY_KEY = process.env.RAZORPAY_KEY
const RAZORPAY_SECRET=process.env.RAZORPAY_SECRET


module.exports={
    RAZORPAY_KEY,RAZORPAY_SECRET
}