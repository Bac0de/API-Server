var exec = require('child_process').exec;
var router = require('express').Router();
var fs = require('fs');
var Sequelize = require('sequelize');
var VM = sequelize.import('../models/vm.js');
var batu = require('../helpers/batu.js');
var server_config = batu.LoadJsonSync('config/config.json'); 




/**
 * @api {get} /common/config GET Batu Config.
 * @apiName GetBatuConfig
 * @apiGroup Common
 * @apiSuccess {string} nickname a batu system nickname.
 * @apiSuccess {string} discript a batu system discription.
 * @apiSuccess {string} batu a batu flag.
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *			{
 *			"nickname":"batu", 
 *			"discript":"yes jam.",
 *			"batu":true 
 *			}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 404 Page Not Found.
 *		{
 *			"message":"Cannot Read Config.json"
 *		}
 */

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



/**
 * @api {get} /common/vm/list GET Get VM List.
 * @apiDescription Get vm informations in current batu system
 * @apiName Get VM List
 * @apiGroup Common
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		[
 *			{
 *				"id":2,
 *				"nickname":"ctest",
 *				"cpu_core":8,
 *				"main_memory":32,
 *				"disk_memory":512,
 *				"start_command":"echo"
 *				,"createdAt":"2017-11-07T13:17:52.876Z"
 *				,"updatedAt":"2017-11-07T13:17:52.876Z"
 *			},
 *			{ 
 *				...
 *			}
 *
 *
 *		]	
 *
 *
 */
router.get('/vm/list', function(req, res){
	res.writeHead(200);
	VM.findAll().then(result=>{	
	res.end(JSON.stringify(result));
	});
});


/**
 * @api {get} /common/vm/add POST Add VM
 * @apiDescription
 * Add and create VM at remote. 
 * @apiName AddVM
 * @apiGroup Common
 * 
 * @apiParam {string} data vm information.
 * @apiParamExample {json} data
 *		{
 *				"nickname":"ctest",
 *				"cpu_core":8,
 *				"main_memory":32,
 *				"disk_memory":512,
 *				"start_command":"echo"
 *		}
 *
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 400 Bad Request.
 *		{
 *			"message":"Parameter \"data\" require"
 *		}
 */
router.post('/vm/add',function(req, res){
	if(!req.body.data)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	if(!batu.CheckJSON(req.body.data))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data\" is not JSON"}))	
	}

	var data = JSON.parse(req.body.data);
	
	if(!(data.nickname && 
		 data.cpu_core && 
		 data.main_memory && 
		 data.disk_memory &&
		 data.start_command) )
	{
	 
		res.writeHead(400);
		return res.end(JSON.stringify({message:"not fill data field"}))	
	}

	res.writeHead(200);
	vm_obj = VM.create(data);
	return res.end(JSON.stringify({message:"ok"}))
});


/**
 * @api {get} /common/vm/update POST Update VM
 * @apiDescription
 *		Update VM Settings. 
 * @apiName UpdateVM
 * @apiGroup Common
 * 
 * @apiParam {string} data vm information. update vm data.id field
 * @apiParamExample {json} data
 *		{		
 *				"id":1
 *				"nickname":"ctest",
 *				"cpu_core":8,
 *				"main_memory":32,
 *				"disk_memory":512,
 *				"start_command":"echo"
 *		}
 *
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 400 Bad Request.
 *		{
 *			"message":"Parameter \"data\" require"
 *		}
 */
router.post('/vm/update', function(req,res)
{
	
	if(!req.body.data)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	if(!batu.CheckJSON(req.body.data))
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"\"data\" is not JSON"}))	
	}

	var data = JSON.parse(req.body.data);
	
	if(!(data.nickname && 
		 data.cpu_core && 
		 data.main_memory && 
		 data.disk_memory &&
		 data.start_command) )
	{
	 
		res.writeHead(400);
		return res.end(JSON.stringify({message:"not fill data field"}))	
	}

	VM.update({nickname:data.nickname, cpu_core:data.cpu_core, 	
		main_memory: data.main_memory,disk_memory:data.disk_memory,
	   	start_command:data.start_command},{where: {id:data.id}}).then(function(result){

				res.writeHead(200);
				return res.end(JSON.stringify({message:"ok"}))


			}).catch(function(err){	
				res.writeHead(400);
				return res.end(JSON.stringify({message:result}))

			});
});

/**
 * @api {get} /common/vm/delete POST Delete VM
 * @apiDescription
 *		Delete  VM Information.
 *		
 * @apiName DeleteVM
 * @apiGroup Common
 * 
 * @apiParam {Number} id VM Identifier
 * @apiParamExample {Number} id
 *		id:10
 *
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 400 Bad Bad Request.
 *		{
 *			"message":"Parameter \"id\" require"
 *		}
 */

router.post('/vm/delete', function(req, res)
{
	
	if(!req.body.id)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"id\" require"}))	
	}

	var id = req.body.id;	
	
	VM.distory({where : id})
	
	res.writeHead(200);
	return res.end(JSON.stringify({message:"ok"}))	
});

/**
 * @api {get} /common/vm/control POST Control VM
 * @apiDescription
 *		Control the VM.
 * @apiName ControlVM
 * @apiGroup Common
 * 
 * @apiParam {string} data command field:control command 
 * @apiParamExample {string} data
 *		{
 *			"command":"./reboot 1"
 *		}
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 400 Bad Bad Request.
 *		{
 *			"message":"Parameter \"data\" require"
 *		}
 */
router.post('/vm/control', function(req,res){

	if(!req.body.data)
	{
		res.writeHead(400);
		return res.end(JSON.stringify({message:"Parameter \"data\" require"}))	
	}
	if(!batu.CheckJSON(req.body.data))
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
