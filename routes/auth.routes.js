const router = require("express").Router();
const authServices = require("../controllers/auth.controller.js");
const userServices = require("../controllers/user.controller.js");

router.route("/signin").post(userServices.registerUser);
router.route("/login").post(authServices.loginUser);

module.exports = {
    router,
};
