const User = require('../model/UserModel.js'); // Import the UserModel
const argon2 = require('argon2'); // Import the argon2 library for password hashing

// Get all users
const getUser = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['user_uuid', 'user_fullname', 'user_email', 'user_role', 'user_phone']
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['user_uuid', 'user_fullname', 'user_email', 'user_role', 'user_phone'],
            where: {
                user_uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new user
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
        res.status(400).json({ msg: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            user_uuid: req.params.id
        }
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { user_fullname, user_email, user_password, user_confirmPassword, user_role, user_phone } = req.body;
    let hashPassword;

    if (user_password === "" || user_password === null) {
        hashPassword = user.user_password; // If the user didn't enter a password, the system will use the password from the database.
    } else {
        hashPassword = await argon2.hash(user_password);
    }

    if (user_password !== user_confirmPassword) return res.status(400).json({ msg: "Password and confirm password do not match" });

    try {
        await User.update({
            user_fullname: user_fullname,
            user_email: user_email,
            user_password: hashPassword,
            user_role: user_role,
            user_phone: user_phone,
        }, {
            where: {
                user_uuid: req.params.id
            }
        });

        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            user_uuid: req.params.id
        }
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });

        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
