const mongoose=require('mongoose');
const mongoosePaginate =require('mongoose-paginate')
const Schema = mongoose.Schema;

const schema = new Schema({
  name:{type:String},
  email:{type:String},
  text:{type:String}
});

schema.plugin(mongoosePaginate);



module.exports= mongoose.model('Contact', schema);
