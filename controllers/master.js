var router = require('express').Router();
var GROUP_MEMBERS = sequelize.import('../models/group_members.js'); 
var ip = require('ip');

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

	GROUP_MEMBERS.create({address:remote_ip, config:req.body.config});
	}catch(e)
	{};

	//some info
	
	res.writeHead(200);
	res.end(JSON.stringify({message:'ok'}));
});





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
