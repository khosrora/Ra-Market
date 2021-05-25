const router = require('express').Router();

// MIDDLEWARE
const auth = require('../middleware/auth');

// CTRL
const userCtrl = require('../controllers/userCtrl');



router.post("/register", userCtrl.register)

router.post("/login", userCtrl.login)

router.get("/logout", userCtrl.logout)

router.get("/refresh_token", userCtrl.refreshToken)

router.get('/infor', auth, userCtrl.getUser)

router.patch("/addcart", auth, userCtrl.addCart)

router.get("/history", auth, userCtrl.history)


module.exports = router;