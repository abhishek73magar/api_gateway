require('dotenv').config();
const server = require('./server/server')
const serverSettings = require('./config/serverSettings')
server.start({ serverSettings }).then( app => [
  console.log(`[AG] Start api gateway, port: ${serverSettings.port}`)
])