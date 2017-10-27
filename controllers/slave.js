var router = require('express').Router();


router.get('/group/my/master', function(req, res)
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

module.exports = router;

