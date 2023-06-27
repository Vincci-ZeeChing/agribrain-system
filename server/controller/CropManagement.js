//CropManagement.js
const CropManagementModel = require('../model/CropManagementModel.js');
const CropModel = require('../model/CropModel.js');
const UserModel = require('../model/UserModel.js');


// Get all crop management
const getCropManagement = async (req, res) => {
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

        if (role === 'Admin' || role === 'Farmer') {
            // Allow admin and farmer to access all records
            const cropManagementData = await CropManagementModel.findAll({
                attributes: ["c_management_uuid","c_management_date", "c_management_harvest", "c_management_stored", "c_management_sold", "c_management_price"],
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

            res.json(cropManagementData);
        } else if (role === 'Worker') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get crop management by id
const getCropManagementById = async (req, res) => {
    const { id } = req.params;

    try {
        const cropManagement = await CropManagementModel.findOne({
            where: {
                c_management_uuid: id,
            },
            attributes: ["c_management_uuid","c_management_date", "c_management_harvest", "c_management_stored", "c_management_sold", "c_management_price"],
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

        if (!cropManagement) {
            return res.status(404).json({ msg: 'Crop not found' });
        }

        res.status(200).json(cropManagement);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCropManagement = async (req, res) => {
    const { c_management_date, c_management_harvest, c_management_stored, c_management_sold, c_management_price, cropId } = req.body;
    const userId = req.session.userId; // Assuming the user ID is stored in the session

    try {
        const user = await UserModel.findOne({
            where: { user_uuid: userId },
            attributes: ['user_role'],
        });

        if (!user || user.user_role === 'Worker') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Create the farming record in the database
        const newCropManagement = await CropManagementModel.create({
            c_management_date,
            c_management_harvest,
            c_management_stored,
            c_management_sold,
            c_management_price,
            cropId,
            userId,
        });

        return res.status(201).json({ message: 'Crop Management record created successfully', data: newCropManagement });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Update crop management
const updateCropManagement = async (req, res) => {
    const { id } = req.params;
    const { c_management_date, c_management_harvest, c_management_stored, c_management_sold, c_management_price, cropId, userId } = req.body;
    try {
        const cropManagement = await CropManagementModel.findOne({
            where: {
                c_management_uuid: id,
            },
        });

        if (cropManagement) {
            await cropManagement.update({
                c_management_date,
                c_management_harvest,
                c_management_stored,
                c_management_sold,
                c_management_price,
                cropId,
                userId,
            });

            res.json(cropManagement);
        } else {
            res.status(404).json({ error: 'Crop management not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete crop management
const deleteCropManagement = async (req, res) => {
    const { id } = req.params;

    try {
        const cropManagement = await CropManagementModel.findOne({
            where: {
                c_management_uuid: id,
            },
        });

        if (cropManagement) {
            await cropManagement.destroy();
            res.status(204).json({ message: 'Crop management deleted successfully' });
        } else {
            res.status(404).json({ error: 'Crop management not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCropManagement,
    getCropManagementById,
    createCropManagement,
    updateCropManagement,
    deleteCropManagement,
};
