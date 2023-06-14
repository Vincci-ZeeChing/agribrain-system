const FarmingModel = require('../model/FarmingModel');
const CropModel = require('../model/CropModel.js');
const UserModel = require('../model/UserModel.js');


const getFarming = async (req, res) => {
    const userId = req.session.userId; // Assuming the user ID is stored in the session

    try {
        const user = await UserModel.findOne({
            where: { user_uuid: userId },
            attributes: ['user_role'], // Assuming the role is stored in the 'role' field of the user table
        });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const role = user.user_role;

        let farmingData;

        if (role === 'Admin' || role === 'Farmer') {
            // Allow admin and farmer to access all records
            farmingData = await FarmingModel.findAll({
                attributes: ['farming_uuid', 'farming_name', 'farming_date'],
                include: [
                    {
                        model: UserModel,
                        as: 'USER_T',
                        attributes: ['user_fullname'],
                    },
                    {
                        model: CropModel,
                        as: 'CROP_T',
                        attributes: ['crop_name'],
                    },
                ],
            });
        } else if (role === 'Worker') {
            // Restrict worker to access only their own records
            farmingData = await FarmingModel.findAll({
                where: { userId: userId }, // Assuming the foreign key to the user table is named 'userId'
                attributes: ['farming_uuid', 'farming_name', 'farming_date'],
                include: [
                    {
                        model: UserModel,
                        as: 'USER_T',
                        attributes: ['user_fullname'],
                    },
                    {
                        model: CropModel,
                        as: 'CROP_T',
                        attributes: ['crop_name'],
                    },
                ],
            });
        }

        res.json(farmingData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




const getFarmingById = async (req, res) => {
    const { id } = req.params;
    try {
        const farmingData = await FarmingModel.findByPk(id);
        if (farmingData) {
            res.json(farmingData);
        } else {
            res.status(404).json({ error: 'Farming record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const createFarming = async (req, res) => {
    const { farming_name, farming_date, cropId } = req.body;
    const userId = req.session.userId; // Assuming the user ID is stored in the session

    try {
        // Create the farming record in the database
        const newFarming = await FarmingModel.create({
            farming_name,
            farming_date,
            cropId,
            userId,
        });

        return res.status(201).json({ message: 'Farming record created successfully', data: newFarming });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateFarming = async (req, res) => {
    const { id } = req.params;
    const { farming_name, farming_date, cropId, userId } = req.body;
    try {
        const farmingData = await FarmingModel.findByPk(id);
        if (farmingData) {
            await farmingData.update({
                farming_name,
                farming_date,
                cropId,
                userId,
            });
            res.json(farmingData);
        } else {
            res.status(404).json({ error: 'Farming record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteFarming = async (req, res) => {
    const { id } = req.params;
    try {
        const farmingData = await FarmingModel.findByPk(id);
        if (farmingData) {
            await farmingData.destroy();
            res.json({ message: 'Farming record deleted' });
        } else {
            res.status(404).json({ error: 'Farming record not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getFarming,
    getFarmingById,
    createFarming,
    updateFarming,
    deleteFarming,
};
