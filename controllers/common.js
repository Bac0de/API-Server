var exec = require('child_process').exec;
var router = require('express').Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var VM = sequelize.import('../models/vm.js');
var batu = require('../helpers/batu.js');
var server_config = batu.LoadJsonSync('config/config.json'); 
router.get('/config', function(req, res)
{

	fs.readFile(server_config.conf_dir, function(err, data){
	if (err)
	{
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return callback_error_handler({message:"Cannot Read Config.json"});
	}
	res.writeHead(200);
	res.end(data);})
	
});


router.get('/vm/list', function(req, res){
	res.writeHead(200);

	VM.findAll().then(result=>{	
	res.end(JSON.stringify(result));
	});
});

router.post('/vm/add',function(req, res){

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


router.post('/vm/control', function(req,res){
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

router.get('/vm/stats' , function(req, res)
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




module.exports  = router;
