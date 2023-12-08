const jwt = require('jsonwebtoken');

let decodeData;

let auth = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(401).json({ error: true, message: "Token required" });
    }
    let token = authToken.split(" ")[1];
    decodeData = jwt.verify(token, "neha123");
    console.log(decodeData);

    req.fullname = decodeData.fullname
    // req.user = {fullname:decodeData.fullname, email:decodeData.email}
    // ! important
    next();
  } catch (err) {
    next(err);
  }
};

module.exports ={auth}