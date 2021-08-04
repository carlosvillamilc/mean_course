const express = require('express');

const app = express();

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

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {id: 'aadwed23dd', title: 'First server-side post 1', content: 'This is coming from the server side content 1'},
    {id: 'aadwed23de', title: 'First server-side post 2', content: 'This is coming from the server side content 2'},
    {id: 'aadwed23df', title: 'First server-side post 3', content: 'This is coming from the server side content 3'},
    {id: 'aadwed23dg', title: 'First server-side post 4', content: 'This is coming from the server side content 4'},
    {id: 'aadwed23dh', title: 'First server-side post 5', content: 'This is coming from the server side content 5'},
    {id: 'aadwed23d1', title: 'First server-side post 6', content: 'This is coming from the server side content 6'},
  ]
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
