const { check, validationResult } = require('express-validator');
const { Model } = require('objection');

const validateAddItems = [
  check('description')
    .trim()
    .notEmpty()
    .withMessage('Açıklama boş olamaz')
    .isString()
    .withMessage('Açıklama bir metin olmalıdır')
    .isLength({ min: 3 })
    .withMessage('Açıklama en az 3 karakter içermelidir')
    .bail(),
  // check('completed')
  //   .optional()
  //   .notEmpty()
  //   .withMessage('boş olamaz')
  //   .isBoolean()
  //   .withMessage('true yada false olabılır')
  //   .bail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next();
    }
  }

];

const validateTodoBody = [
  check('names')
    .notEmpty()
    .withMessage('boş kalamaz')
    .isString()
    .withMessage('strıng olmalı')
    .isLength({ min: 3 })
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next();
    }
  }


];

const validateUsers = [
  check('email')
    .notEmpty()
    .withMessage('boş kalamaz')
    .isEmail({ domain: ['example.com'] })
    .withMessage('email olmalı')
    .isLength({ min: 3 })
    .bail(),

  check('password')
    .notEmpty()
    .withMessage('boş kalamaz')
    .isLength({ min: 3, max: 8 })
    .withMessage('parola 3 ile 8 karakter arasında olmalıdır')
    .isStrongPassword()
    .withMessage('parola en az bir buyuk harf , bir kucuk harf ve bir sayı içermeli')
    .bail(),

  check('age')
    .notEmpty()
    .withMessage('boş olamaz')
    .isInt()
    .withMessage('sayı olmalıdır')
    .bail(),

  check('fullname')
    .notEmpty()
    .withMessage('boş olamaz')
    .bail(),

  check('username')
    .notEmpty()
    .withMessage('boş olamaz')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next();
    }
  }
];

const validateLogin = [
  check('email')
    .notEmpty()
    .withMessage('boş kalamaz')
    .isEmail({ domain: ['example.com'] })
    .withMessage('email olmalı')
    .isLength({ min: 3 })
    .bail(),

  check('password')
    .notEmpty()
    .withMessage('boş kalamaz')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next();
    }
  }
];

const validateUpdate = [
  check('password')
    .notEmpty()
    .withMessage('boş kalamaz')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next();
    }
  }
];



module.exports = {
  validateAddItems,
  validateTodoBody,
  validateUsers,
  validateLogin,
  validateUpdate
}