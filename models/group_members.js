var Sequelize = require('sequelize');

var GROUP_MEMBERS = sequelize.define('GROUP_MEMBERS', {

	address		: {type: Sequelize.STRING, allowNull:false, unique:true},
	config		: {type: Sequelize.STRING, allowNull:false}

});

GROUP_MEMBERS.sync();

module.exports = (sequelize, DataTypes) =>
{
	return GROUP_MEMBERS;

}
