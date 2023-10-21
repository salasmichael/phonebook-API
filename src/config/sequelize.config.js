require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
	{
		host: process.env.DB_SERVER,
		port: process.env.DB_PORT,
		dialect: "mysql",
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000
		}
	}
);
sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
 }).catch((error) => {
	console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;