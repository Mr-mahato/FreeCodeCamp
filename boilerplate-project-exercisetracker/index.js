const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))
require('./DbConn/conn')
require('dotenv').config()
const { Exercise, user, Log } = require('./models/model');
app.use(cors())
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.get('/api/users',(req,res)=>{
  user.find({})
  .then((data)=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send(err);
  })
})


app.post('/api/users', async (req, res) => {
  const { username } = req.body;
 const userObj = new user({username});
 try {
    const userSave = await userObj.save();
    res.send(userSave);
 } catch (error) {  
  console.log(error);
 }
})

// You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

app.get('/api/users/:_id/logs',async (req,res)=>{
  const {from , to , limit} = req.query
  const {_id} = req.params

  const userFound = await user.findById(_id);
  if(!userFound)
  {
    res.send(`User not found`);
    return;
  }

  let dateObj = {};
  if(from){
    dateObj['$gte'] = new Date(from);
  }
  if(to){
    dateObj['$lte'] = new Date(to);
  }

  let filter = {
    userId:_id
  }

  if(from || to)
  {
    filter.date = dateObj;
  }

  console.log(filter);

  const exercises = await Exercise.find(filter).limit(+limit ?? 500);

  console.log(exercises);
  const log = exercises.map((ex)=>{
    return{
      description:ex.description,
      duration:ex.duration,
      date:ex.date.toDateString()
    }
  })
  res.json({
    username:userFound.username,
    count:exercises.length,
    _id:userFound._id,
    log
  })
})

app.post("/api/users/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body

  try{
    const userFound = await user.findById(id)
    if (!userFound){
      res.send("Could not find user")
    } else {
      const exerciseObj = new Exercise({
        userId: userFound._id,
        description,
        duration,
        date: date ? new Date(date) : new Date()
      })
      const exercise = await exerciseObj.save()
      res.json({
        _id: userFound._id,
        username: userFound.username,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString()
      })
    }
  }catch(err){
    console.log(err);
    res.send("There was an error saving the exercise")
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
