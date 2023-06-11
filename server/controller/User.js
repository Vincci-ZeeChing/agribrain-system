const getUser = async (req, res) => {
    res.send('Get user');
}
const getUserById = async (req, res) => {
    res.send('Get user by id');
}

const createUser = async (req, res) => {
    res.send('Create user by id');
}

const updateUser = async (req,res) =>{
    res.send('Update user by id');
}

const deleteUser =async (req,res) =>{
    res.send('Delete user by id');
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};