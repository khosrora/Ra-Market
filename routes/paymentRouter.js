const router = require('express').Router();



// MIDDLEWARE
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// CTRL
const paymentCtrl = require('../controllers/paymentCtrl');




router.route("/payment")
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayments)



router.get("/verifypayment", paymentCtrl.verifyPayments)

module.exports = router;