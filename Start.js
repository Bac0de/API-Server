var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var batu_http = require('./helpers/batu.js');
var Sequelize = require('sequelize');
var SSDP = require('node-ssdp').Server;
var path = require('path');


////// Start Load Models ///////

sequelize = new Sequelize('vm_db', null, null, {
	dialect:"sqlite",
	storage:"./db.sqlite"
});

sequelize
	.authenticate()
	.then(function(err){
		console.log('Connection has been established successfully.');
	}, function(err)
	{
		console.log('unable to connect to the database', err);
	});

const db = {};

fs.readdirSync('models/')
  .filter((file) => (file.indexOf('.') !== 0))
  .forEach((file) => {
  
	const model = sequelize.import(path.join('models/', file));
	db[model.name] = model;

});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;

////// End Load Models ///////


var router = require('./controllers/router.js');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);
http_server = app.listen(10000, function(){});

var server_config = batu_http.LoadJsonSync('./config/config.json');


batu_http.LoadFileJson(server_config.host_conf_dir, function(err, data){
		batu_config = data;
		if(batu_config.host_type === "master")
		{		
			ssdp_server = new SSDP({
						 location: require('ip').address() + ':10000/config',
					   sourcePort: 1900			    
			});

			ssdp_server.addUSN('urn:schemas-upnp-org:service:ContentDirectory:1')

			ssdp_server.on('advertise-alive', function (heads) { } );
			ssdp_server.on('advertise-bye', function (heads) { } );
			ssdp_server.start();
			console.log("master-host start");		
		}
});

