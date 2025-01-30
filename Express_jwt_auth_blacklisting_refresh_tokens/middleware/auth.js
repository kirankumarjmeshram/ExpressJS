const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const blacklisted = await Blacklist.findOne({ token });
        if (blacklisted) return res.status(403).json({ message: "Token revoked" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
