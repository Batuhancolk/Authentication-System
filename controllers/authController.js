const bcrypt = require("bcryptjs");
const db = require("../config/db");
const crypto = require("crypto");
const transporter = require("../middleware/emailService");
require("dotenv").config();

//Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //HashedPassword
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO users(username,email,password) VALUES(?,?,?)";

        await db.promise().query(query, [username, email, hashedPassword]);
        res.status(201).json({ message: "Register Successful" });

    } catch (error) {
        console.error("Register Error!", error);
        res.status(500).json({ message: "Register Error" });
    }

}
//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE email=?";

        const [data] = await db.promise().query(query, [email]);

        if (data.length === 0) {
            return res.status(404).json({ message: "User Not Found " })

        }

        const user = data[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password Error!" });
        }

        //Session
        req.session.userId = user.id;
        req.session.userName = user.username;
        req.session.userEmail = user.email;

        res.status(200).json({ message: "Login Successful" });

    } catch (error) {
        console.log("Login Error!", error);
        res.status(500).json({ message: "Login Error!" });
    }
}
//Logout
exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Logout Error!" });
            }

            res.json({ message: "Logout Successful" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Logout Error!" });
    }
};

//ForgotPasswword
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //user controll
        const [forgotUser] = await db.promise().query("SELECT * FROM users WHERE email=?", [email]);
        if (forgotUser.length === 0) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        const user = forgotUser[0]

        //Random Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpires = new Date(Date.now() + 3600000);

        await db.promise().query("UPDATE users SET reset_token=?,reset_token_expires=? WHERE email=?", [resetToken, resetTokenExpires, email]);

        const resetLink = `http://localhost:3000/reset-password?resetToken=${resetToken}`;

        await transporter.sendMail({
            from: process.env.DB_EMAIL_USERNAME,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Şifrenizi sıfırlamak için <a href="${resetLink}">buraya tıklayın</a></p>`

        });
        res.status(200).json({ message: "Password reset link sent to your email" });


    } catch (error) {
        console.error("Forgot Password Error!", error);
        res.status(500).json({ message: "Forgot Password Error!" });
    }
}

//NewPassword
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const [resetUser] = await db.promise().query("SELECT * FROM users WHERE reset_token=? AND reset_token_expires > NOW()", [token]);

        if (!resetUser || resetUser.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });

        }
        const user = resetUser[0];

        //Password Hash
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        //Password Update,clear token
        await db.promise().query("UPDATE users SET password=?,reset_token=NULL,reset_token_expires=NULL WHERE id=?", [newHashedPassword, user.id]);
        res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.error("Reset Password Error!", error);
        res.status(500).json({ message: "Reset Password Error!" });

    }
}
