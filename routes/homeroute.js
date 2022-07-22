const express=require('express');
const crud = require('../model/crud');
const schema = require('../model/crud');
const router =express.Router();

router.get('/home', (req,res) => {
    crud.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('home',{title:'home',cruds:result});
    })
    .catch(err => {
      console.log(err);
    });
});
   

router.post('/', (req, res) => {
    console.log(req.body);
    const crud = new schema(req.body);
  
    crud.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  
  router.get('/edit/:id',(req,res,next) => {
    console.log(req.params.id);
    crud.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs) => {
      if(err){
        console.log("cannot retrive data");
  
      }else{
        res.render('edit',{crud:docs})
      }
    })
  })
  
  router.post('/edit/:id',(req,res,next) => {
    crud.findOneAndUpdate({_id: req.params.id},req.body, (err,docs) => {
      if(err){
        console.log("something went wrong");
  
      }else{
        res.redirect('/');
      }
    })
  })
  
  
  router.get('/delete/:id',(req,res,next) => {
    crud.findOneAndDelete({_id: req.params.id}, (err,docs) => {
      if(err){
        console.log("something went wrong");
  
      }else{
        console.log("Deleted successfully");
        res.redirect('/');
      }
    })
  })
  
  module.exports=router;