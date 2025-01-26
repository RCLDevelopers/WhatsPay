const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validatePayment } = require('../middleware/validationMiddleware');

router.post('/paypal', validatePayment, paymentController.processPayPalPayment);
router.post('/mpesa', validatePayment, paymentController.processMPesaPayment);
router.post('/mpesa/callback', paymentController.mpesaCallback);

module.exports = router; 