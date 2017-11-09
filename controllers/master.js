var router = require('express').Router();
var GROUP_MEMBERS = sequelize.import('../models/group_members.js'); 
var batu = require('../helpers/batu.js');
var ip = require('ip');



/**
 * @api {post} /master/group/join POST Join The Group.
 * @apiName JoinGroup
 * @apiGroup Master
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 401 Error Unauthorized.
 *		{
 *			"message":"Host type is not master"
 *		}
 */

router.post('/group/join', function(req,res){
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

	if(!batu.CheckJSON(req.body.config))
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

	GROUP_MEMBERS.create({address:remote_ip, config:req.body.config});
	}catch(e)
	{};

	//some info
	
	res.writeHead(200);
	res.end(JSON.stringify({message:'ok'}));
});


router.post('/vm/clone' , function(req, res)
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

router.get('/vm/clone/status', function(req, res)
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





/**
 * @api {get} /master/group/list GET Group Member List
 * @apiName GetGroupMembers
 * @apiGroup Master
 * @apiSuccess {string} master group master it self
 * @apiSuccess {string} member group member address and config value list
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		[	
 *			"master":"192.168.1.6",
 *			"members":[
 *			{"address":"192.168.1.3", "config":"{\"nickname\":\"batu\", \"discript\":\"yes jam.\" ,\"batu\":true }"
 *			, "createdAt":"2017-11-09T06:54:32.318Z","updatedAt":"2017-11-09T06:54:32.318Z"}, { ... }
 *			]
 * 						
 *		]
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 401 Error Unauthorized.
 *		{
 *			"message":"Host type is not master"
 *		}
 */

router.get('/group/list', function(req, res)
{
	if(!(batu_config.host_type === 'master'))
	{
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not Master."}))	
	}
	GROUP_MEMBERS.findAll().then(result=>{	
	res.writeHead(200);
	res.end(JSON.stringify({ master:ip.address(), members:result}));
	});
	

});


/**
 * @api {post} /master/config/update POST Update Member Config
 * @apiName UpdateGroupMemberConfig
 * @apiParam {string} config a slave batu system config for update.
 * @apiParamExample {json} config
 *		{
 *			"nickname":"batu",
 *			"discript":"yes jam.",
 *			"batu":true 
 *		}
 * @apiGroup Master
 * @apiSuccess {string} message just set "ok".
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 401 Error Unauthorized.
 *		{
 *			"message":"Host type is not master"
 *		}
 */
router.post('/config/update', function(req, res)
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


	GROUP_MEMBERS.update(
	{ config: req.body.config },
	{ where: {address:remote_ip }}
	);	
	

	res.writeHead(200);
	res.end(JSON.stringify({message:"ok"}));
});


module.exports = router;
