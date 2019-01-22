// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress || '';
  const language = req.headers['accept-language'].split(',')[0];
  const user_agent = req.headers['user-agent'];    
  res.render('index', { ip, language, user_agent })
})

app.get('/api/whoami', (req, res) => {  
  const ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress || '';
  const language = req.headers['accept-language'].split(',')[0];
  const user_agent = req.headers['user-agent'];  
  res.json({ip, language, user_agent});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
