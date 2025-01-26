const { body, validationResult } = require('express-validator');

const validatePayment = [
  body('total').isNumeric().withMessage('Total amount must be a number'),
  body('orderItems').isArray().withMessage('Order items must be an array'),
  body('orderItems.*.productId').isMongoId().withMessage('Invalid product ID'),
  body('orderItems.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('orderItems.*.price').isNumeric().withMessage('Price must be a number'),
  
  // Conditional validation for M-PESA
  body('phoneNumber')
    .if(body('paymentMethod').equals('mpesa'))
    .matches(/^(?:254|\+254|0)?([7-9][0-9]{8})$/)
    .withMessage('Invalid phone number format'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validatePayment
}; 