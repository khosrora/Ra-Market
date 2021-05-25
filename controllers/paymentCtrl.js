const Payments = require('../models/paymentModel');
const Users = require('../models/useModels');
const ZarinpalCheckout = require('zarinpal-checkout');


const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);


const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayments: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("name email")
            if (!user) return res.status(400).json({ msg: "متاسفانه کاربر مورد نظر پیدا نشد" })


            const { cart, total } = req.body;
            const { _id, name, email } = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, total
            })




            const response = await zarinpal.PaymentRequest({
                Amount: total, // In Tomans
                CallbackURL: 'http://localhost:5000/api/verifypayment',
                Description: `پرداخت به فروشگاه من`,
                Email: user.email,
            })

            newPayment.paymentCode = response.authority;
            await newPayment.save();

            res.json({ url: response.url });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verifyPayments: async (req, res) => {
        try {
            const paymentCode = req.query.Authority;
            const status = req.query.Status;
            const payment = await Payments.findOne({
                paymentCode
            });
            if (status === "OK") {
                const response = await zarinpal.PaymentVerification({
                    Amount: payment.total, // In Tomans
                    Authority: paymentCode,
                });
                payment.status = true;
                
                if (response.status === -21) {
                    res.send('پرداخت پیدا نشد');
                } else {
                    payment.refId = response.RefID;
                    payment.success = true;
                    await payment.save();
                    res.send(`
                    <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;">
                    <img src="https://media0.giphy.com/media/VRwGkD5zYcbW8/giphy.gif" alt="Girl in a jacket" width="500"
                        height="600">
                    <br />
                    <a style="text-decoration: none;" href="http://localhost:3000">رفتن به سایت اصلی</a>
                    <h1 style="">عملیات با موفقیت تکمیل شد</h1>
                    </div>
                    `);
                }
            } else return res.send(`
            <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;">
            <img src="https://equity.guru/wp-content/uploads/2019/07/moneyburn.gif" alt="Girl in a jacket" width="500"
                height="600">
            <br />
            <a style="text-decoration: none;" href="http://localhost:3000">رفتن به سایت اصلی</a>
            <h1 style="">عملیات با مشکل مواجه شد</h1>
            </div>
            `)


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}



module.exports = paymentCtrl;
