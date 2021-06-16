var  express=require('express');
const port =process.env.PORT || 4000;
var cors=require('cors');
var bodyParser=require('body-parser');
var  app=express();
var jsonParser = bodyParser.json()
app.use(cors());
const stripe=require('stripe')('sk_test_51J27XzSFzEQEoDKDqL3HJwjIXiAQPfq1jAWZ06g0eZrW2uNd0vKtGaO5xkns4mLSSp4OH4aG92TO7bUG2bNzXqcZ00v66EmzBM');



app.listen(port,()=>{
    console.log(`App is listening ${port}`);

})

// route for payment stripe
app.post('/api/payment',jsonParser,(req,res)=>{
    console.log(req.body);
  const totalAmount=req.body.price;
  
  const token=req.body.token;
    
    
    stripe.customers.create({
        email: token.email,
        source:token.id
      })
        .then(customer => {
            stripe.charges.create({
                amount:totalAmount*100,
                currency:'INR',
                customer:customer.id,
                receipt_email:token.email
               
            })
              
        })
        .then(result=>res.status(200).send(result))
        .catch(error => console.error(error));
   

})