const router = require('express').Router();

// MIDDLEWARE
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// CTRL
const categoryCtrl = require('../controllers/categoryCtrl');

router.route("/category")
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)

router.route("/category/:id")
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)





module.exports = router;