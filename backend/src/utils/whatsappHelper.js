const axios = require('axios');

const messageTemplates = {
  payment_success: (orderId, amount) => ({
    template: 'payment_success',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: orderId },
          { type: 'currency', amount: amount }
        ]
      }
    ]
  }),
  payment_failed: (orderId, reason) => ({
    template: 'payment_failed',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: orderId },
          { type: 'text', text: reason }
        ]
      }
    ]
  }),
  order_status: (orderId, status) => ({
    template: 'order_status_update',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: orderId },
          { type: 'text', text: status }
        ]
      }
    ]
  })
};

const sendWhatsAppMessage = async (phoneNumber, { type, ...params }) => {
  try {
    const message = messageTemplates[type](...Object.values(params));

    await axios.post(
      `https://graph.facebook.com/v13.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`
        }
      }
    );
  } catch (error) {
    console.error('WhatsApp message error:', error);
    throw error;
  }
};

module.exports = {
  sendWhatsAppMessage
}; 