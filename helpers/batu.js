var fs  = require('fs');
var exec = require('child_process').exec;
var crypto = require('crypto');
var http = require('http');
var express = require('express');
var http_app = express();
var current_password = 'password';

exports.CheckJSON = function (str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false;
	}
	return true;
}

exports.HttpGet = function (address,CallBack) {
	request.get(address, {json: true}, function (err, res, body) {
		CallBack(err, body);
	});
}

exports.Execute = function (command, callback) {
	exec(command, function (error, stdout, stderr) {
		callback(stdout);
	});
}

exports.LoadJsonSync = function (path) {
	var json_str = fs.readFileSync(path);

	if (!json_str) return null;

	try {
		return JSON.parse(json_str);
	} catch (e) {
		return null;
	}
}


exports.SaveFileJson = function (path,data, cb) {
	fs.writeFile(path, JSON.stringify(data), function (err) {
		if(err) return cb(err,{message: 'fs error'});
		return cb(null, {message: "ok"});
	});
}

exports.LoadFileJson = function (path,cb) {
	var cfg_str = fs.readFile(path, 'utf-8', function (err, data) {
		if(err) return cb(err, {message: 'Cannot Read Config File'});
		var cfg = JSON.parse(data);
		cb(null, cfg);
	});
}


exports.SavePassword = function (password, cb) {
	crypto.pbkdf2(password, 'Babayatu'.toString('base64'), 10000, 512, 'sha512',function (err, key) {
		fs.writeFile('pwd/pwd', key.toString('base64'), function (err) {
		if(err) return cb(err, {message: 'fs error', success: false});
		return cb(null, {message: 'ok', success: true});
		});	
	});
}

exports.AuthPassword = function (password, cb) {
	crypto.pbkdf2(password, 'Babayatu'.toString('base64'), 10000, 512, 'sha512',function (err, key) {
		var pwd = fs.readFileSync(path+'/pwd/pwd', 'utf8');
		//process.stdout.write(path+'/pwd/pwd'+'Saved Hash :  ' + pwd + '\n');
		//process.stdout.write('Crypto Hash :  ' + key.toString('base64') + '\n');
	
		if (err) {
			return cb(err, {message: 'crypto error', success: false});
		} else if (key.toString('base64') === pwd) {
			return cb(null, {message: 'ok', success: true});			
		} else {
			return cb(null, {message: 'Password Denied', success: false});
		}
	});
}


exports.BindCurrentPassword = function (password) {
	crypto.pbkdf2(password, 'Babayatu'.toString('base64'), 10000, 512, 'sha512',function (err, key) {
		if(!err) current_password = key.toString('base64');
	});
}

exports.GetCurrentPassword = function () {
	return current_password;
}
