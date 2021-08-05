const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');
const post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://cvillamil:QuIG1QOW0II9ehDk@clustercvillamil.dipxl.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(()=>{
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/posts",(req,res,next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save().then(createdPost => {
    console.log("Post result" + createdPost._id)
    res.status(201).json({
      message: 'Post added succesfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req,res,next) => {
  console.log("Delete Method")
  console.log("id to delete " + req.params.id)
  Post.deleteOne({_id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Post deleted'
      });
    })
    .catch(()=>{
      console.log('Delete one failed');
    });
});

module.exports = app;

//cvillamil
//QuIG1QOW0II9ehDk
//mongo terminal
//mongosh "mongodb+srv://clustercvillamil.dipxl.mongodb.net/node-angular" --username cvillamil
