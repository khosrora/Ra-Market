const Users = require('../models/useModels');
const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;

            const userEmail = await Users.findOne({ email })
            if (userEmail) return res.status(400).json({ msg: "شما ثبت نام کرده اید" })
            const userPhone = await Users.findOne({ email })
            if (userPhone) return res.status(400).json({ msg: "این شماره موبایل ثبت شده است" })

            if (password.length < 6)
                return res.status(400).json({ msg: "لطفا رمز عبور خود را از 6 کاراکتر بیشتر انتخاب کنید" })

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name, email, phone, password: passwordHash
            })

            // SAVE
            await newUser.save()

            // jsonWeb Token 
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token" , 
                maxAge : 7 * 24 * 60 * 60 * 1000
            })


            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "کاربری با این مشخصات یافت نشد" });

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json(({ msg: "کاربری با این مشخصات یافت نشد" }))

            // Access Token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token" , 
                maxAge : 7 * 24 * 60 * 60 * 1000
            })


            res.json({
                accesstoken,
                msg: `عزیز شما وارد شدید ${user.name}`
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: "/user/refresh_token" });
            return res.json({ msg: "شما از سایت خارج شدید" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res.status(400).json({ msg: "لطفا وارد شوید" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "لطفا وارد شوید" });

                const accesstoken = createAccessToken({ id: user.id });
                res.json({ accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");

            if (!user) return res.status(400).json({ msg: "کاربر وجود ندارد" })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "کاربری با این مشخصات وجود ندارد" })
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "به سبد خرید اضافه شد" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })

            res.json(history)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}



module.exports = userCtrl;