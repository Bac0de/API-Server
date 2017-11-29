var Sequelize = require('sequelize');

var VM = sequelize.define('VM',
  {
		id: {
			type: Sequelize.INTEGER,
			unique: true,
			autoincrement: true,
			primaryKey: true
		},
		nickname: {
			type: Sequelize.STRING
		},
		cpu_core: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		main_memory: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		disk_memory: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		start_command: {
			type: Sequelize.INTEGER,
			allowNull:false
		}
  },
	{
		tableName: 'VM'
	}
);

VM.sync();

module.exports = (sequelize , DataTypes) => {
	return VM;
}



