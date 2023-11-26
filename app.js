const express = require("express");
const cors = require("cors");
const config = require("./config");
require("dotenv").config();

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Routers
const  usersRouter  = require("./routes/users.routes.js").router
const  countryRouter  = require("./routes/country.routes.js").router
const authRoutes = require('./routes/auth.routes.js').router;

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/country", countryRouter);
app.use('/api/v1/auth', authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to my tecnical test API" });
});
app.listen(config.port, () => {
    console.log(`Port has started in port ${config.port}`);
});

module.exports = { app };