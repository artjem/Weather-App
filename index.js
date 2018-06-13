var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/', function(req, res){
    var j = require('./Layers');
    res.render('index.html',
        {
            Key : j[0],
            Layers : j[1]
        });
});

app.listen(app.get('port'), function() {
});

app.get('/getweather', function(req, res){

    let apiKey = '893d40caf118c95d25618e31ae9d8da8';
    let lon = req.query.lon;
    let lat = req.query.lat;
    let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;


    request(url, function (err, response, body) {
        if(err){
            console.log('error:', err);
        } else {
            console.log( );
            res.send(body);
        }
    });
});
