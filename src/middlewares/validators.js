const { body, validationResult } = require('express-validator');

const CATEGORIES = ['appetizer', 'entree', 'dessert', 'beverage'];

const menuRules = [
  body('name')
    .exists({ checkFalsy: true }).withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({ min: 3 }).withMessage('name must be at least 3 characters'),

  body('description')
    .exists({ checkFalsy: true }).withMessage('description is required')
    .isString().withMessage('description must be a string')
    .isLength({ min: 10 }).withMessage('description must be at least 10 characters'),

  body('price')
    .exists().withMessage('price is required')
    .isFloat({ gt: 0 }).withMessage('price must be a number > 0')
    .toFloat(),

  body('category')
    .exists({ checkFalsy: true }).withMessage('category is required')
    .isString().withMessage('category must be a string')
    .isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(', ')}`),

  body('ingredients')
    .exists().withMessage('ingredients is required')
    .isArray({ min: 1 }).withMessage('ingredients must be an array with at least 1 item'),

  body('available')
    .optional()
    .isBoolean().withMessage('available must be a boolean')
    .toBoolean(),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

module.exports = { menuRules, handleValidationErrors, CATEGORIES };
