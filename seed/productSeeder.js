const Product = require('../models/data');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/js_cart1',{ useNewUrlParser: true });

const products = [
    new Product({
    imagePath:'/images/drone_1.jpg',
    title:'drone_1',
    description:"it flies",
    price:10.15
  }),

  new Product({
  imagePath:'/images/drone_2.jpg',
  title:'drone_2',
  description:"it flies",
  price:10.11
}),
  new Product({
  imagePath:'/images/drone_3.jpg',
  title:'drone_3',
  description:"it flies",
  price:10.12
}),
  new Product({
  imagePath:'/images/drone_4.jpg',
  title:'drone_4',
  description:"it flies",
  price:10.13
}),
  new Product({
  imagePath:'/images/drone_5.jpg',
  title:'drone_5',
  description:"it flies",
  price:10.45
}),
  new Product({
  imagePath:'/images/drone_6.jpg',
  title:'drone_6',
  description:"it flies",
  price:10.65
  })
];

var done = 0;
for(var i = 0; i <products.length; i++){
  products[i].save((err, result)=>{
    done++;
    if (done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
