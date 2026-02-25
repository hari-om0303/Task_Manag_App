const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, (req, res) => {
    res.json(req.user);
});

router.get("/", (req, res) => {
    res.send("Auth route working");
});


router.post("/register", register);
router.post("/login", login);

module.exports = router;