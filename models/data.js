const mongoose=require('mongoose');
const mongoosePaginate =require('mongoose-paginate')
const Schema = mongoose.Schema;

const schema = new Schema({
  imagePath:{type:String},
  title:{type:String},
  description:{type:String},
  price:{type:String}
});

schema.plugin(mongoosePaginate);



module.exports= mongoose.model('Data', schema);
