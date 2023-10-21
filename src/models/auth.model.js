const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class Auth extends Model {}

Auth.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},{
    sequelize,
    tableName: 'admin_app',
    timestamps: false
});

module.exports = Auth;