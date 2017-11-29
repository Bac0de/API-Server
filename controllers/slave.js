var router = require('express').Router();

/**
 * @api {GET} /slave/group/my/master GET Current Group Master Address.
 * @apiName GetMyMaster
 * @apiGroup Slave
 * @apiSuccess {string} message "ok".
 * @apiSuccess {string} address Master Batu Address
 * @apiSuccessexample Success-response:
 * 		http/1.1 200 ok
 *		{
 *			"message":"ok",
 *			"address":"192.168.1.7"
 *		}
 * @apiError {string} message reason of error.
 * @apiErrorExample Error-response:
 * 		http/1.1 401 Error Unauthorized.
 *		{
 *			"message":"Host type is not slave"
 *		}
 */
router.get('/group/my/master', function (req, res) {
	if(!(batu_config.host_type === 'slave')) {
		res.writeHead(401);
		return res.end(JSON.stringify({message:"Host Type is Not slave."}));
	}
	if(!(batu_config.have_group)) {
		res.writeHead(401);
		return res.end(JSON.stringify({message:"not join group"}));
	}
	res.writeHead(200);
	return res.end(JSON.stringify({message:"ok", address:batu_config.master}));
});

module.exports = router;

