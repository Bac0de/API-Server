var express = require('express');
var fs = require('fs');
var http_app = express();
var exec = require('child_process');
var bodyParser = require('body-parser');
var batu_http = require('./batu.js');
var Sequelize = require('sequelize');
var ip = require('ip');
var SSDP = require('node-ssdp').Server;




var sequelize = new Sequelize('vm_db', null, null, {
	dialect:"sqlite",
	storage:"./db.sqlite"
});

var script = require('./script.js');

sequelize
	.authenticate()
	.then(function(err){
		console.log('Connection has been established successfully.');
	}, function(err)
	{
		console.log('unable to connect to the database', err);
	});


var VM = sequelize.define('VM', {
	id					: {type: Sequelize.INTEGER, unique: true ,autoincrement: true, primaryKey: true},
	nickname			: {type: Sequelize.STRING},
	cpu_physical_core	: {type: Sequelize.INTEGER, allowNull:false},
	cpu_virtual_core	: {type: Sequelize.INTEGER, allowNull:false},
	main_memory			: {type: Sequelize.INTEGER, allowNull:false},
	disk_memory			: {type: Sequelize.INTEGER, allowNull:false},
	
	start_command		: {type: Sequelize.INTEGER, allowNull:false}

},
{
	tableName: 'VM'
});

VM.sync();





http_app.use(bodyParser.urlencoded({extended:true}));
http_app.use(bodyParser.json());

http_server = http_app.listen(10000, function(){});

var host_config_path = "conf/host_config.json";
var config_path = "conf/config.json";
var vm_list_path = "conf/vm_list.json";

batu_http.LoadFileJson(host_config_path, function(err, data){
		batu_config = data;
		if(batu_config.host_type === "master")
		{

			GROUP_MEMBER = sequelize.define('GROUP_MEMBER', {
					
					
					address		: {type: Sequelize.STRING, allowNull:false, unique:true},
					config		: {type: Sequelize.STRING, allowNull:false}
			
			});
			GROUP_MEMBER.sync();
	
	
	
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




var initialize_func = function(){

	if(!fs.existsSync(host_config_path))
	{
		batu_http.SaveFileJson(host_config_path, 
		{
				host_type:'none'					
		}
		,function(err, msg){} )	
	}

	if(!fs.existsSync(config_path))
	{
		batu_http.SaveFileJson(config_path, 
		{
				nickname:'Default',
				batu:true				
		}
		,function(err, msg){} )		
	}


}

initialize_func();



http_app.get('/common/config', function(req, res)
{

	fs.readFile(config_path, function(err, data){
	if (err)
	{
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return callback_error_handler({message:"Cannot Read Config.json"});
	}
	res.writeHead(200);
	res.end(data);})
	
});


http_app.get('/common/vm/list', function(req, res){
	res.writeHead(200);

	VM.findAll().then(result=>{	
	res.end(JSON.stringify(result));
	});
});

http_app.post('/common/vm/add',function(req, res){

	if(!req.body.data)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	if(!batu_http.CheckJSON(req.body.data))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data\" is not JSON"}))	
	}
	var data = JSON.parse(req.body.data);
	if(!(data.nickname && 
		 data.cpu_physical_core && 
		 data.cpu_virtual_core && 
		 data.main_memory && 
		 data.disk_memory &&
		 data.start_command) )
	{
	
		res.writeHead(400);
		return res.end(JSON.stringify({message:"not fill data field"}))	
	}

	res.writeHead(200);
	vm_obj = VM.create(data);
	script.add_vm(data);	
	return res.end(JSON.stringify({message:"ok"}))
});


http_app.post('/common/vm/control', function(req,res){
	if(!req.body.data)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	if(!batu_http.CheckJSON(req.body.data))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data\" is not JSON"}))	
	}
	data = JSON.parse(req.body.data);
	if(!data.command)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data.command\" is not found"}))	
	}


	 exec(data.command, function(error, stdout, stderr){ console.log(stdout);     });



	res.writeHead(200);
	return res.end(JSON.stringify({message:"ok"}))	

});

http_app.get('common/vm/stats' , function(req, res)
{
	if(!req.query.vm_id)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	
	//get vm status code
	
	res.writeHead(200);
	return res.end()		
});


http_app.post('/master/group/join', function(req,res){
	if(!(batu_config.host_type === 'master'))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not Master."}))	
	}

	if(!req.body.config)
	{
	
		res.writeHead(401);
		return res.end(JSON.stringify({message:"\"config\" require"}))	
	}

	if(!batu_http.CheckJSON(req.body.config))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data\" is not JSON"}))	
	}
	

	try
	{

	var remote_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (remote_ip.substr(0, 7) == "::ffff:") {
		  remote_ip = remote_ip.substr(7)
	}

	GROUP_MEMBER.create({address:remote_ip, config:req.body.config});
	}catch(e)
	{};

	//some info
	
	res.writeHead(200);
	res.end(JSON.stringify({message:'ok'}));
});


http_app.get('/slave/group/my/master', function(req, res)
{
	if(!(batu_config.host_type === 'slave'))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not slave."}))	
	}
	if(!(batu_config.have_group))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"not join group"}))	
	}
	res.writeHead(200);
	return res.end(JSON.stringify({message:"ok", address:batu_config.master}));	
});


http_app.get('/master/group/list', function(req, res)
{
	if(!(batu_config.host_type === 'master'))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not Master."}))	
	}
	GROUP_MEMBER.findAll().then(result=>{	
	res.writeHead(200);
	res.end(JSON.stringify({ master:ip.address(), members:result}));
	});
	

});



http_app.post('/master/config/update', function(req, res)
{

	if(!(batu_config.host_type === 'master'))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not Master."}))	
	}	

	if(!req.body.config)
	{
	
		res.writeHead(401);
		return res.end(JSON.stringify({message:"\"config\" require"}))	
	}	
	
	if(!batu_http.CheckJSON(req.body.config))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"config\" is not JSON"}))	
	}

	var remote_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (remote_ip.substr(0, 7) == "::ffff:") {
		  remote_ip = remote_ip.substr(7)
	}


	GROUP_MEMBER.update(
	{ config: req.body.config },
	{ where: {address:remote_ip }}
	);	
	

	res.writeHead(200);
	res.end(JSON.stringify({message:"ok"}));
});
