const Crop = require('../model/CropModel.js');
const User = require('../model/UserModel.js');

// Get all crop
const getCrop = async (req,res) =>{
    try{
        let response;
        response = await Crop.findAll(({
            attributes:['id','crop_uuid','crop_name', 'crop_active'],
            include:[{
                model:User,
                attributes:['user_fullname','user_email'],
            }]
        }))
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});
    }
}

// Get crop by id
const getCropById = async (req,res) =>{
    const { id } = req.params;

    try {
        const crop = await Crop.findOne({
            where: {
                crop_uuid: id,
            },
            include: [
                {
                    model: User,
                    attributes: ['user_fullname', 'user_email'],
                },
            ],
        });

        if (!crop) {
            return res.status(404).json({ msg: 'Crop not found' });
        }

        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create crop
const createCrop = async (req, res) => {
    const { crop_name, crop_active } = req.body;
    const userId = req.session.userId;

    try {
        // Create the crop in the database
        const newCrop = await Crop.create({
            crop_name,
            crop_active,
            userId
        });

        return res.status(201).json({ message: 'Crop created successfully', data: newCrop });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Update crop
const updateCrop = async (req, res) => {
    try {
        const crop = await Crop.findOne({
            where: {
                crop_uuid: req.params.id,
            },
        });

        if (!crop) {
            return res.status(404).json({ msg: 'Crop not found' });
        }

        const { crop_name, crop_active } = req.body;

        if (req.user_role === 'Farmer' || req.user_role === 'Admin') {
            await Crop.update({ crop_name, crop_active }, {
                where: {
                    id: crop.id,
                },
            });
        } else {
            if (req.userId !== crop.userId) {
                return res.status(403).json({ msg: 'Access Denied' });
            }

            await Crop.update({ crop_name, crop_active }, {
                where: {
                    id: crop.id,
                    userId: req.userId,
                },
            });
        }

        res.status(200).json({ msg: 'Crop updated successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Delete crop
const deleteCrop = async (req,res) =>{
    try {
        const crop = await Crop.findOne({
            where: {
                crop_uuid: req.params.id,
            },
        });

        if (!crop) {
            return res.status(404).json({ msg: 'Crop not found' });
        }

        const isFarmer = req.user_role === 'Farmer';
        const isAdmin = req.user_role === 'Admin';

        if (isFarmer && crop.userId !== req.userId) {
            return res.status(403).json({ msg: 'Access Denied' });
        }

        if (!isFarmer && !isAdmin) {
            return res.status(403).json({ msg: 'Access Denied' });
        }

        await Crop.destroy({
            where: {
                crop_uuid: req.params.id,
            },
        });

        res.status(200).json({ msg: 'Crop deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


module.exports = {
    getCrop,
    getCropById,
    createCrop,
    updateCrop,
    deleteCrop
};