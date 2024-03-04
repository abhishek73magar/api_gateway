const auth = require("./auth");

module.exports = (req, res, next, access) => {
  if(Array.isArray(access)){
    const path = req.url.split('?').slice(0, 1).join('')
    if(access.includes(path)) return next();
  }
  return auth(req, res, next);
}