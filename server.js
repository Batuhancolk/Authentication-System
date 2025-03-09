const express = require("express");
const session = require("express-session");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

//JSON
app.use(express.json());

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, secure: false }
}));

//Routes
app.use("/api/auth", authRoutes);

//Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is Running Successfully");
});
