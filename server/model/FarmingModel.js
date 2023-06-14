const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database.js');
const UserModel = require('./UserModel.js');
const CropModel = require('./CropModel.js');

const FarmingModel = sequelize.define('FARMING_T', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    farming_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    farming_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100],
        },
    },
    farming_date: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            isDate: true,
        },
    },
    cropId:{
        type: DataTypes.INTEGER,
        allowNull:true,
        validate: {
            notEmpty:true,
        }
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

FarmingModel.belongsTo(CropModel, { foreignKey: 'cropId' });
FarmingModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'user_uuid' });


module.exports = FarmingModel;
