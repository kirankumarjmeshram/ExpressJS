const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blacklist = require("../models/Blacklist");
const auth = require("../middleware/auth");

const router = express.Router();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

// 📌 Register Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({ username, password: hashedPassword }).save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const { accessToken, refreshToken } = generateTokens(user);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 Refresh Token Route
router.post("/refresh", async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Refresh token required" });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const { accessToken, refreshToken } = generateTokens(decoded);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
});

// 📌 Logout Route
router.post("/logout", async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    try {
        await new Blacklist({ token }).save();
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 Protected Route (Example)
router.get("/protected", auth, (req, res) => {
    res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;
