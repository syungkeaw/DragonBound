var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var Logger = require('./server/lib/logger');
var port = Number(8080);

app = express();
var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "/web/views/layouts"),
    partialsDir: [
        '/web/views/partials/'
    ]
});
var http = require('http').createServer();
this._httpServer = http;
this._app = express();
this._app.engine('handlebars', hbs.engine);
this._app.set('view engine', 'handlebars');
this._app.set('views', path.join(__dirname, "/web/views"));
/*
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('index');
});*/
app.use(express.static(__dirname + '/web/html'));

app.listen(port, function() {
    Logger.log("Listening on " + port);
});