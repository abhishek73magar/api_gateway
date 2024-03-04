const jwt = require('jsonwebtoken');
const config = require('../config/serverSettings.js')

module.exports = (req, res, next) => {
  const token = req.cookies.alert_token
  return next();
  const secret = config.SECRET_TOKEN

  return jwt.verify(token, secret, (err, decode) =>{
    if(err) return res.status(401).json({ message:"Unauthorized User" })
    req.user = decode;
    req.headers.data = JSON.stringify({user: { ...decode }});
    return next();
  })
  
  // return next();
}