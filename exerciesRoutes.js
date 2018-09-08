var User = require('./user.js');
var mongoose =require('mongoose');
var Exercise = require('./exercise.js');
var router= require('express').Router();
router.post('/new-user',async (req,res)=>{
  var username = req.body.username;
  connect();
  var u=new User({ username });
  u.save((err)=>{
    if(err)
      return res.send("username already taken");
    res.json({
      id:u.id,
      username:u.username
    });
  });     
});
router.post('/add',async (req,res)=>{
  var userId = req.body.userId ;
  var description = req.body.description;
  var date = req.body.date;
  var duration = req.body.duration;
  connect();
  var u=await User.findById(userId);
  if(!u)
    return console.log('no user');
  //date = Exercise.formatDateBeforeInsert(date);
  console.log('formatted date: '+date);
  var e={
    description,
    date,   
    duration
  };
  var exercise= await (new Exercise(e)).save();
  console.log('e',exercise);
  User.findByIdAndUpdate(userId,
                         {$push: {log : [exercise._id]} },
                         { upsert:true, safe:true },
                         (err,model)=>{
    if(err)
      return res.json(err);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return res.json(exercise);
  });
});
router.get('/log',(req,res)=>{
  var userId = req.query.userId;
  var from = req.query.from;
  var to = req.query.to;
  var limit = req.query.limit;
  if(!userId)
    return res.status(401).send('you specify an id');
  connect();
  var q=User.findById(userId);
  var logfilter ={ path : 'log'  };
  if(from || to){
    logfilter.match={date : {}};
    if(from)
      logfilter.match.date.$gte=new Date(from);
    if(to)  
      logfilter.match.date.$lte=new Date(to);
  }
  if(limit)
    logfilter.options = {limit};
  
  q.populate(logfilter)
    .exec((err,doc)=>{
    
        if(!doc || err)
          return res.status(400).json('invalid user id');
        var t = doc.formatDate(doc.log);
        var formattedDoc ={
          id:doc.id,
          username:doc.username,
          count:limit,
          log:t
        }
        res.json(formattedDoc);
  });
});
function connect(){
  mongoose.connect(process.env.DB);
}
module.exports = router;
