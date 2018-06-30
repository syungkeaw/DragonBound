
var fs = require('fs');
var Logger = require('./lib/logger');
_ = require('underscore');
//Log = require('log');
Ms = require("./mysql");
MySql = new Ms();

function main(config) {
    var ws = require("./ws"),
        DragonServer = require("./dragonserver"),
        Player = require("./player"),
        DServer,
        server = new ws.SocketServer(config.port);

    Logger.info(config.debug_level);

    Logger.info("Starting DragonBound game server...");

    server.onConnect(function (connection) {
        connection.send([9, 48, "Dev", 0, 0]);
        DServer.connect_callback(new Player(connection, DServer));
    });
    server.onError(function () {
        Logger.error(Array.prototype.join.call(arguments, ", "));
    });

    DServer = new DragonServer('Server1', config.nb_players_per_server, server);
    DServer.run();

    process.on('uncaughtException', function (e) {
        Logger.error('uncaughtException: ' + e);
    });
}
function getConfigFile(path, callback) {
    fs.readFile(path, 'utf8', function (err, json_string) {
        if (err) {
            Logger.error("Could not open config file:", err.path);
            callback(null);
        } else {
            callback(JSON.parse(json_string));
        }
    });
}
var defaultConfigPath = './config.json',
    customConfigPath = './config_local.json';

process.argv.forEach(function (val, index, array) {
    if (index === 2) {
        customConfigPath = val;
    }
});
getConfigFile(defaultConfigPath, function (defaultConfig) {
    getConfigFile(customConfigPath, function (localConfig) {
        if (localConfig) {
            main(localConfig);
        } else if (defaultConfig) {
            main(defaultConfig);
        } else {
            Logger.error("Server cannot start without any configuration file.");
            process.exit(1);
        }
    });
});