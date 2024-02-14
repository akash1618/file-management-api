// authMiddleware.js

const basicAuth = require('basic-auth');
const config = require('./../config');

const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== config.username || credentials.pass !== config.password) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = {
  authenticate
};
