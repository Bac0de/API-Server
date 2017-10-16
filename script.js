
var exec = require('child_process').exec;




exports.http_command = function(cmd)
{
    exec('./test.sh '+ cmd, function(error, stdout, stderr){ console.log(stdout); });
}

exports.add_vm = function(info)
{

}
