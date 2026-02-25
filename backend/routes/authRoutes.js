const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Auth route working");
});


router.post("/register", register);

module.exports = router;