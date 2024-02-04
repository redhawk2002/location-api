const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    req.user = await User.findOne({ email });
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
