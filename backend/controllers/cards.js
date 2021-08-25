/* eslint-disable eol-last */
const Card = require('../models/card');

const E404 = require('../middlewares/E404');
const E403 = require('../middlewares/E403');
const E400 = require('../middlewares/E400');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new E400('Переданы некорректные данные.'));
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new E400('Переданы некорректные данные.'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new E404('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена.' });
      } else {
        next(new E403('Невозможно удалить чужую карточку.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new E400('Переданы некорректные данные.'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true },
  )
    .orFail(new E404('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new E400('Переданы некорректные данные для постановки лайка.'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId, {
      $pull: { likes: req.user._id },
    }, { new: true },
  )
    .orFail(new E404('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new E400('Переданы некорректные данные для постановки лайка.'));
      }
      next(err);
    });
};