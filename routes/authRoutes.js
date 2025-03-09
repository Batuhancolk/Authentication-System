const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authentication = require("../middleware/authentication");

//Register
router.post("/register", authController.register);
//Login
router.post("/login", authController.login);
//Logout
router.post("/logout", authController.logout);

//Get
router.get("/profile", authentication, async (req, res) => {
    res.json({ message: "Profile İnfo: ", username: req.session.username });
});

//Reset Password
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);



module.exports = router;