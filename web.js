var express = require("express");
app = express();
var Logger = require('./lib/logger');
app.use(express.static(__dirname + '/client'));
var port = Number(8080);

app.listen(port, function() {
    Logger.log("Listening on " + port);
});