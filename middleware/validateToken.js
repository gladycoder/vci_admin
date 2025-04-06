const jwt = require("jsonwebtoken");

const validateToken = (async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_STUDENT_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      // console.log("decode : "+ JSON.stringify(decoded));
      
      req.user = decoded;
      // console.log("set user : " + req.user);
      
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

const isAuthorized = (role) => {
  return (req, res, next) => {
    console.log( req.user);
    
    // Check if the user object exists
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check role
    if (req.user.role === 'admin') {
      if (!req.user._id) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
      next(); // Admin authorized, proceed
    } else if (req.user.role === 'student') {
      if (!req.user.studentID) {
        return res.status(403).json({ message: 'Access denied. Students only.' });
      }
      next(); // Student authorized, proceed
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
  };
};



module.exports = {validateToken,isAuthorized};