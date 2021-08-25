/* eslint-disable eol-last */
const jwt = require('jsonwebtoken');

const E401 = require('./E401');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!req.cookies.jwt) {
    next(new E401('Необходима авторизация.'));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new E401('Необходима авторизация.'));
  }

  req.user = payload;
  next();
};