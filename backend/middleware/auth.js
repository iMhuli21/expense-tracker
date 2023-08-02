const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = await userModel.findOne({ _id: decoded.id }).select("-password");
      
      next();
    } catch (error) {
      res.status(400).json({ msg: "Not authorized, invalid token" });
    }
  } else {
    res.status(400).json({ msg: "Not authorized, no token" });
  }
};

module.exports = {
  authenticate,
};
