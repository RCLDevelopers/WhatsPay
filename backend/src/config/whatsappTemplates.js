const templates = {
  payment_success: {
    name: 'payment_success',
    language: 'en',
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Payment Successful!'
      },
      {
        type: 'BODY',
        text: 'Thank you for your payment of {{amount}} for order #{{orderId}}. Your order is being processed and you will receive updates here.'
      },
      {
        type: 'FOOTER',
        text: 'WhatsPay - Secure Payments'
      }
    ]
  },
  
  payment_failed: {
    name: 'payment_failed',
    language: 'en',
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Payment Failed'
      },
      {
        type: 'BODY',
        text: 'We could not process your payment for order #{{orderId}}. Reason: {{reason}}. Please try again or contact support for assistance.'
      },
      {
        type: 'FOOTER',
        text: 'WhatsPay - Secure Payments'
      }
    ]
  },
  
  order_status_update: {
    name: 'order_status_update',
    language: 'en',
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Order Status Update'
      },
      {
        type: 'BODY',
        text: 'Your order #{{orderId}} status has been updated to: {{status}}.'
      },
      {
        type: 'FOOTER',
        text: 'WhatsPay - Secure Payments'
      }
    ]
  }
};

module.exports = templates; 