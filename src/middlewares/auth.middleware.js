  const User = require("../models/user");
  const requireAuth = ('../middleware/auth');{
     if (req.session && req.session.userId) {
       return next();
     }
     res.redirect('/login');
   };
   moodule.exports = requireAuth;
//   // define the authentication middleware
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization header missing" });
//   }
// }

const {
    decodeToken
  } = require('../services/jwt');

  module.exports.protect = async (req, res, next) => {
    // get the token
    try {
      const token = req.headers.authorization? req.headers.authorization.split(' ')[1] : null;
  
      if(token == null) {
        return res.status(400).json({ message: "No Token Provided!" });
      }
      // decode the token
      const decoded = decodeToken(token);
      // check if the user exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          error: 'User Not Found'
        });
      }
      console.log(user.name + " is successfully authenticated");
      // add the user to the request
      req.user = user;
      // call the next middleware
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'authentication error',
        msg: 'sign in to continue'
      });
    }
  };