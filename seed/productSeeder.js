const Product = require('../models/data');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/js_cart1',{ useNewUrlParser: true });

const products = [
    new Product({
    imagePath:'/images/glass1.jpg',
    title:'glass_1',
    description:"the best",
    price:10.15
  }),

  new Product({
  imagePath:'/images/glass1.jpg',
  title:'glass_2',
  description:"the best",
  price:10
}),
  new Product({
  imagePath:'/images/glass1.jpg',
  title:'glass_3',
  description:"the best",
  price:10
}),
  new Product({
  imagePath:'/images/glass1.jpg',
  title:'glass_4',
  description:"the best",
  price:10
}),
  new Product({
  imagePath:'/images/glass1.jpg',
  title:'glass_5',
  description:"the best",
  price:10
}),
  new Product({
  imagePath:'/images/glass1.jpg',
  title:'glass_6',
  description:"the best",
  price:10
  })
];

var done = 0;
for(var i = 0; i <products.length; i++){
  products[i].ave((err, result)=>{
    done++;
    if (done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
