const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const Register = require('./model/register');
const homerouter=require('./routes/homeroute');


const app=express();
const Url='mongodb+srv://soumya:test123@cluster0.fj5pu.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(Url, { useNewUrlParser: true,useUnifiedTopology: true})
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


app.use(express.static('style'));
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.redirect('/home')
})
app.get('/create/blog',(req,res) => {
    res.render('NEW_post')
})
app.get('/login',(req,res) => {
    res.render('Login')
})
app.get('/registration',(req,res) => {
    res.render('Signup')
})


app.use('/',homerouter);
app.post('/registration',(req,res) => {
  const register = new Register(req.body)
  register.save()
  .then(result => {
    res.redirect('/');
  }).catch(err => {
    console.log(error);
  })

})

app.post('/login',async(req,res) => {

try{
  const username=req.body.username;
  const password =req.body.password;

  const name= await Register.findOne({username:username})

  if (name.password === password ){
    res.redirect('/')
  }else{
    res.send("password is not matching")
  }
} catch(error){
  res.send("error")
}

})



app.use((req, res) => {
  res.status(404).render('404');
});
