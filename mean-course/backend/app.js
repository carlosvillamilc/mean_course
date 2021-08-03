const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first middleware');
  console.log(req.url)
  next();
});

app.use((req, res, next) => {
  res.send('<h1>Hello from Express</h1>');
});

module.exports = app;
