const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if(req.headers.authorization){
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
  else{
    return res.status(403).send("A token is required for authentication");

  }
};

module.exports = verifyToken;
