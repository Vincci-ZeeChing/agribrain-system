const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database.js');
const UserModel = require('./UserModel');

const CropModel = sequelize.define('CROP_T', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    crop_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    crop_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    crop_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: true,
        },
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'user_uuid',
        },
    },
}, {
    freezeTableName: true,
});

CropModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'user_uuid' });
UserModel.hasMany(CropModel, { foreignKey: 'userId' });

module.exports = CropModel;
