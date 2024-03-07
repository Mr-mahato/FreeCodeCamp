require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const isUrlHttp = require('is-url-http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// const check = (url) => {
//   var anchor = document.createElement('a');
//   anchor.href = url;
//   return (anchor.host && anchor.host !== window.location.host);
// }
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/shorturl/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('url.json', 'utf-8', (err, data) => {
      if(err) res.end('error');
      else 
      {
        data = JSON.parse(data);
        const urlObjInd = data.find(obj => obj.id == id);
        res.redirect(urlObjInd.url)
      }
    })
  // res.end(req.params.id);
})
// Your first API endpoint
app.post('/api/shorturl', (req, res) => {
  // console.log(req);
  const { url } = req.body;
  const isUrlRight = isUrlHttp(url);
  if (!isUrlRight) {
    res.send({ error: 'invalid url' });
  }
  else {
    const urlObj = {
      url,
      id: Math.floor(Math.random() * 100)
    }
    fs.readFile('url.json', 'utf-8', (err, data) => {
      if (err) res.send(`Error`);
      else {
        data = JSON.parse(data);
        data.push(urlObj);
        fs.writeFile('url.json', JSON.stringify(data), (err) => {
          if (err) { res.send('error') }
          else {
            res.send({ "original_url": urlObj.url, "short_url": urlObj.id });
          }
        })
      }
    })
  }

  // res.redirect("https://www.google.com/")
})
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
