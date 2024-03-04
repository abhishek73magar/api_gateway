const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const routes = require('../config/routes')
// const bodyParser = require('body-parser')
const cors = require('cors');
const requestIp = require('request-ip');
const auth = require('../libs/auth');
const accessConfig = require('../libs/accessConfig');
const cookieParser = require('cookie-parser')

const start = ({ serverSettings }) => {
  return new Promise((resolve, reject) => {
    const app = express();
    const { port } = serverSettings;
    app.use(cors({ 
      origin: ["http://localhost:3000", "http://localhost:3001","http://192.168.4.167:3001", "http://localhost:4000", "http://192.168.4.167:4000"], 
      credentials: true 
    }));
    // app.use(function frameguard(req, res, next){
    //   res.setHeader('X-Frame-Options', 'DENY')
    //   next();
    // })
    app.use(requestIp.mw())
    app.use(cookieParser())

    function onProxyRes (proxyRes, req, res) {
      // console.log(proxyRes)
      for (oldKey in proxyRes.headers){
        if(oldKey !== 'data'){
          let newkey = oldKey.replace(/((?:^|-)[a-z])/g, function(val) { return val.toUpperCase() });
          newkey = newkey.replace(/(-Os-)/g, function (val) { return val.toUpperCase() });
          proxyRes.headers[newkey] = proxyRes.headers[oldKey];
          delete proxyRes.headers[oldKey];
        }
      }
    }

    routes.map(({route, target, pathRewrite, openAccess, ws=false}) => {
      app.use(route, (req, res, next) => {
        // console.log(req.headers);
        if(typeof openAccess === 'boolean' && openAccess) return next();
        if(openAccess) return accessConfig(req, res, next, openAccess);
        if(!openAccess) return auth(req, res, next)
      }, 
      createProxyMiddleware(route, { target, pathRewrite, ws, changeOrigin: true, onProxyRes }))
    })

    // app.use(bodyParser.text())
    // app.use(bodyParser.json({ limit: "50mb" }))

    const server = app.listen(port, () => resolve(server))
  })
}

module.exports = { start }

