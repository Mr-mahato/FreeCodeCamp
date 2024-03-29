var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');

var app = express();
const multer = require('multer');
app.use(bodyParser.json());
app.use(cors());
const upload = multer({dest: 'uploads/'});

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse',upload.single('upfile') , (req,res)=>{


  const {originalname, mimetype, size} = req.file;
  res.send({name:originalname , type:mimetype , size});
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
