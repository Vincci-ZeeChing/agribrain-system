const User = require("../model/UserModel.js");
const argon2 = require('argon2');

const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            user_email: req.body.user_email
        }
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const match = await argon2.verify(user.user_password, req.body.user_password);
    if (!match) return res.status(400).json({ msg: 'Invalid password' });
    req.session.userId = user.user_uuid;
    const user_uuid = user.user_uuid;
    const user_fullname = user.user_fullname;
    const user_email = user.user_email;
    const user_role = user.user_role;
    const user_phone = user.user_phone;
    res.status(200).json({ user_uuid, user_fullname, user_email, user_role, user_phone });
}

const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Login Required" })
    }
    const user = await User.findOne({
        attributes: ['user_uuid', 'user_fullname', 'user_email', 'user_role', 'user_phone'],
        where: {
            user_uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json({ user })
}

const Logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(400).json({ msg: "Logout Failed" });
        res.status(200).json({ msg: "Logout Success" })
    })
}

module.exports = {
    Login,
    Me,
    Logout
}

