const services = require('./services');

module.exports = [
  { service: 'api', route: '/api', target: services.api, openAccess: true },
  { service: 'admin', route: '/admin', target: services.admin, openAccess: true },
  { service: 'home', route: '/', target: services.home, openAccess: true },

]

