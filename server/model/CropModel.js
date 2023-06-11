const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database.js');
const UserModel = require('./UserModel.js');

const CropModel = sequelize.define('CROP_T', {
    crop_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    crop_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100],
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    freezeTableName: true,
});

UserModel.hasMany(CropModel);
CropModel.belongsTo(UserModel, { foreignKey: 'userId' });

module.exports = CropModel;