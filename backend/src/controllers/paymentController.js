const PayPal = require('@paypal/checkout-server-sdk');
const axios = require('axios');
const Order = require('../models/Order');
const { sendWhatsAppMessage } = require('../utils/whatsappHelper');

// PayPal client configuration
const environment = process.env.NODE_ENV === 'production'
  ? new PayPal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new PayPal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new PayPal.core.PayPalHttpClient(environment);

const paymentController = {
  // Process PayPal payment
  async processPayPalPayment(req, res) {
    try {
      const { orderItems, total } = req.body;
      
      const request = new PayPal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: total
          }
        }]
      });

      const order = await paypalClient.execute(request);
      
      // Create order in database
      const newOrder = await Order.create({
        items: orderItems,
        total,
        paymentMethod: 'paypal',
        paymentId: order.result.id,
        status: 'pending'
      });

      res.json({
        orderId: newOrder._id,
        paypalOrderId: order.result.id,
        status: 'success'
      });
    } catch (error) {
      console.error('PayPal payment error:', error);
      res.status(500).json({
        error: 'Payment processing failed',
        details: error.message
      });
    }
  },

  // Process M-PESA payment
  async processMPesaPayment(req, res) {
    try {
      const { phoneNumber, total, orderItems } = req.body;

      // Generate M-PESA access token
      const auth = Buffer.from(
        `${process.env.MPESA_API_KEY}:${process.env.MPESA_API_SECRET}`
      ).toString('base64');
      
      const tokenResponse = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`
          }
        }
      );

      // Initiate STK Push
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = Buffer.from(
        `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
      ).toString('base64');

      const stkResponse = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: total,
          PartyA: phoneNumber,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: phoneNumber,
          CallBackURL: `${process.env.BASE_URL}/api/payments/mpesa/callback`,
          AccountReference: 'WhatsPay',
          TransactionDesc: 'Payment for order'
        },
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`
          }
        }
      );

      // Create order in database
      const newOrder = await Order.create({
        items: orderItems,
        total,
        paymentMethod: 'mpesa',
        phoneNumber,
        status: 'pending',
        checkoutRequestId: stkResponse.data.CheckoutRequestID
      });

      res.json({
        orderId: newOrder._id,
        checkoutRequestId: stkResponse.data.CheckoutRequestID,
        status: 'pending'
      });
    } catch (error) {
      console.error('M-PESA payment error:', error);
      res.status(500).json({
        error: 'Payment processing failed',
        details: error.message
      });
    }
  },

  // M-PESA callback
  async mpesaCallback(req, res) {
    try {
      const { Body: { stkCallback: { CheckoutRequestID, ResultCode, ResultDesc } } } = req.body;
      
      const order = await Order.findOne({ checkoutRequestId: CheckoutRequestID });
      if (!order) {
        throw new Error('Order not found');
      }

      if (ResultCode === 0) {
        order.status = 'paid';
        await order.save();

        // Send WhatsApp notification
        await sendWhatsAppMessage(order.phoneNumber, {
          type: 'payment_success',
          orderId: order._id,
          amount: order.total
        });
      } else {
        order.status = 'failed';
        order.paymentError = ResultDesc;
        await order.save();

        await sendWhatsAppMessage(order.phoneNumber, {
          type: 'payment_failed',
          orderId: order._id,
          reason: ResultDesc
        });
      }

      res.json({ status: 'success' });
    } catch (error) {
      console.error('M-PESA callback error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = paymentController; 