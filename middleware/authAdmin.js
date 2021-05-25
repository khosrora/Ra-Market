const Users = require('../models/useModels');



const authAdmin = async (req, res, next) => {
    try {
        // Get User information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.role === 0)
            return res.status(400).json({ msg: "شما اجازه دسترسی به این بخش را ندارید" })

            next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin;