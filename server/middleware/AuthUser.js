const User = require('../model/UserModel.js')

const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Login Required" })
    }
    const user = await User.findOne({
        where: {
            user_uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    req.userId = user.id;
    req.user_role = user.user_role;
    next();
}


const adminFarmerOnly = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Login Required" });
    }

    const user = await User.findOne({
        where: {
            user_uuid: req.session.userId,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    if (user.user_role !== "Admin" && user.user_role !== "Farmer") {
        return res.status(403).json({ msg: "Access Denied" });
    }

    next();
};


module.exports = {
    verifyUser,
    adminFarmerOnly
};