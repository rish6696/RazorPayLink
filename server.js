const Razorpay = require("razorpay");

const express = require("express");
const app = express();

var cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(8080, () => console.log("Listening on port 8080"));

const config = require("./config");

const instance = new Razorpay({
  key_id: config.RAZORPAY_KEY,
  key_secret: config.RAZORPAY_SECRET,
});

const task = async () => {
  const amount = 5000;
  const currency = "INR";

  try {
    // const response = await instance.orders.create({ amount, currency })
    const paymentLink = await instance.invoices.create({
      type: "link",
      amount: 6500,
      description: "Dhaba payment",
      callback_url:'http://localhost:8080/api/payment/redirect',
      callback_method:'get'
    });
    console.log(paymentLink);
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/payment/redirect", (req, res, next) => {
  console.log(req.query)
  //res.send("Payment sucessfull")
  res.redirect('http://localhost:3000/order')
});


app.post('/api/pay',async (req,res)=>{

  const { amount } = req.body;

  console.log(amount)

  const currency = "INR";
  try {
    const paymentLink = await instance.invoices.create({
      type: "link",
      amount: amount*100,
      description: "Restaurant Payment",
      callback_url:'http://localhost:8080/api/payment/redirect',
      callback_method:'get'
    });

    res.send({paymentLink:paymentLink.short_url})

  } catch (error) {
    console.log(error);
  }

})

//task();
