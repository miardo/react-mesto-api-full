/* eslint-disable eol-last */
require('dotenv').config();
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const validator = require('validator');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const E404 = require('./middlewares/E404');

const corsOptions = {
  origin: [
    'https://mesto.practicum.nomoredomains.club',
    'http://mesto.practicum.nomoredomains.club',
    'https://api.mesto.practicum.nomoredomains.monster',
    'http://api.mesto.practicum.nomoredomains.monster',
    'https://localhost:3000',
  ],
  credentials: true,
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(35).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      } return helpers.message('Некорректный формат ссылки.');
    }),
  }),
}), createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new E404('Страница не найдена'));
});

app.use(handleErrors);

app.listen(PORT);