const User = require('../model/UserModel.js');
const argon2 = require('argon2');

const getUser = async (req, res) => {
    // res.send('Get user');
    try {
        const response = await User.findAll({
            attributes:['user_uuid','user_fullname','user_email','user_role','user_phone']
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getUserById = async (req, res) => {
    res.send('Get user by id');
}

const createUser = async (req, res) => {
    const { user_fullname, user_email, user_password, confirm_password, user_role, user_phone } = req.body;

    // Check if the password and confirm_password match
    if (user_password !== confirm_password) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Hash the user_password using Argon2
        const hashedPassword = await argon2.hash(user_password);

        // Create the user in the database
        const newUser = await User.create({
            user_fullname,
            user_email,
            user_password: hashedPassword,
            user_role,
            user_phone
        });

        return res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const updateUser = async (req, res) => {
    res.send('Update user by id');
}

const deleteUser = async (req, res) => {
    res.send('Delete user by id');
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
