const router = require('express').Router();
const userServices = require("../controllers/user.controller.js");
const passport = require('passport');
require('../utils/auth')(passport);

router
    .route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        userServices.getAllUsers
    );
router
    .route("/:uuid")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getUserById
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        userServices.editUser
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServices.deleteUser
    );



module.exports = {
    router,
};
