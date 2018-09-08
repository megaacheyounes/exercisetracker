var mongoose = require('mongoose');
var moment = require('moment');
var userSchema = new mongoose.Schema(
  {/*
    _id:{
     type:String 
    },*/
    username :{
      type:String,
      required:true,
      unique:true
    },
    log:[
      {type:mongoose.Schema.Types.ObjectId,
       ref:'exercise'
      }
    ]
  }
); 
userSchema.methods.formatDate = (log)=>{
  
  var formattedLog=[];
  
  log.forEach((item,index,arr)=>{
    formattedLog[index] ={
      description: item.description,
      duration:item.duration,
      date:  moment(item.date).format('dd MMM DD YYYY'),
    }
  });
  
  return formattedLog;
};
module.exports = mongoose.model('user',userSchema);
