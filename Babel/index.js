import express from "express";
const morgan = require("morgan")

const app = express();

app.use(morgan('dev'));

console.log('Sucessfully run index.js');

app.listen(3000);

app.get('/', (req, res) => {
    res.send('<p>home page</p>');
  });

