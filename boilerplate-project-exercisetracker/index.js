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

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const newUser = new user({ username });
  newUser.save()
    .then((data) => {
      console.log(data);
      res.send({"username":data.username , "_id":data._id});
    })
    .catch((err) => {
      res.send(`error encountered`);
    })
})

app.post('/api/users/:id/exercises',(req,res)=>{
  const _id = req.params.id;
  let username;
  user.findOne({_id})
  .then(data=>{
    username = data.username;
  })
  .catch(err=>{
    console.log(err);
  })

  
  let {  description , duration,date} = req.body;
  if(date == '')
  {
    date = (new Date()).toDateString();
  }
  const exerciseData = new Exercise({_id, description , duration , date});
  exerciseData.save()
  .then(data=>{
    const dat = new Date(date);
    console.log(data);
    res.send({"_id":_id ,"username":username ,  "date":dat.toDateString() ,"duration":duration , "description":description});
  })
  .catch(err=>{
    res.status(500).send(err);
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
