const models = require("../models/init-models.js").initModels();
const crypto = require("../utils/crypto.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const { toPromise } = require("../utils/toPromise.js");

const getUserByEmail = async (email) => {
    const user = await models.users.findOne({
        where: {
            email,
        },
    });
    return user;
};

const checkUserCredential = async (email, password) => {
    const [user, error] = await toPromise(getUserByEmail(email));
    if (!error && user) {
        return crypto.comparePassword(password, user.password);
    } else {
        return null;
    }
};

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing data" });
    } else if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing data" });
    }

    const [response, error] = await toPromise(
        checkUserCredential(req.body.email, req.body.password)
    );
    if (error || !response) {
        return res.status(401).json({ message: "Invalid Credential" });
    }
    const [user, err] = await toPromise(getUserByEmail(req.body.email));

    if (err || !response) {
        return res.status(401).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: req.body.email,
        },
        config.jwtSecret
    );
    res.status(200).json({ token: token });
};

module.exports = {
    checkUserCredential,
    loginUser,
};
