const axios = require('axios');
const config = require('../config/config');
const templates = require('../config/whatsappTemplates');

const whatsappSetup = {
  async createMessageTemplates() {
    try {
      const baseUrl = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.businessAccountId}`;
      
      for (const [key, template] of Object.entries(templates)) {
        try {
          const response = await axios.post(
            `${baseUrl}/message_templates`,
            {
              name: template.name,
              language: template.language,
              category: 'TRANSACTIONAL',
              components: template.components
            },
            {
              headers: {
                Authorization: `Bearer ${config.whatsapp.apiToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          console.log(`Template ${template.name} created successfully:`, response.data);
        } catch (error) {
          if (error.response?.data?.error?.code === 100) {
            console.log(`Template ${template.name} already exists`);
          } else {
            console.error(`Error creating template ${template.name}:`, error.response?.data || error.message);
          }
        }
      }
    } catch (error) {
      console.error('WhatsApp template setup failed:', error);
      throw error;
    }
  },

  async verifyWebhook(token) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/subscriptions`,
        {
          access_token: config.whatsapp.apiToken,
          callback_url: `${config.server.baseUrl}/api/whatsapp/webhook`,
          verify_token: token
        }
      );
      
      console.log('Webhook verified successfully:', response.data);
      return true;
    } catch (error) {
      console.error('Webhook verification failed:', error);
      return false;
    }
  }
};

module.exports = whatsappSetup; 