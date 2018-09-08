var mongoose = require('mongoose');
var exerciseSchema = new mongoose.Schema(
  {
    /*_id:{
      type: String
    },*/description :{
      type:String,
      required:true
    },duration:{
      type:Number,
      required:true
    },date: {
      type:Date,//yyyy-mm-dd
      required:false
    }
  }
); 



// exerciseSchema.post('find',(results)=>{
//     if(results){
//     }
// });
module.exports = mongoose.model('exercise',exerciseSchema);
