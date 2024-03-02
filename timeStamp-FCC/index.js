// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const date = req.params.date;

  if(date.split('-').length === 3) {
   const newDate = date.split('-');
   let dateObj = new Date(newDate[0], newDate[1]-1, newDate[2]);
   let unix = dateObj.getTime();
   dateObj = dateObj.toUTCString();
   res.json({unix:unix  , utc:dateObj});
  }
  else if( date.length >= -8.64e12 && date.length <= +8.64e12)
  {
    const dateObj = new Date(Number(date)).toUTCString();
    if(dateObj == 'Invalid Date') {
    res.json({error: "Invalid Date"})
    }
    else 
    res.json({unix: parseInt(date), utc: dateObj});
  }
});


app.get('/api',(req,res)=>{
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
