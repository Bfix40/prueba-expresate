const router = require("express").Router();
const countryServices = require("../controllers/country.controllers.js");


router
    .route("/")
    .post(
        countryServices.createCountry
    );
router
    .route("/:uuid")
    .put(
        countryServices.updateCountry
    )
    .delete(
        countryServices.deleteCountry
    );

module.exports = {
    router,
};
