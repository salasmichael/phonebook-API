const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_admin: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
},{
    sequelize,
    tableName: 'users',
    timestamps: false
});

module.exports = User;