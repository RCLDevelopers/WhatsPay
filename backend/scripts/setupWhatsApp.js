require('dotenv').config();
const whatsappSetup = require('../src/utils/whatsappSetup');

async function setup() {
  try {
    console.log('Starting WhatsApp Business API setup...');
    
    // Create message templates
    console.log('Creating message templates...');
    await whatsappSetup.createMessageTemplates();
    
    // Verify webhook
    console.log('Verifying webhook...');
    const webhookToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    await whatsappSetup.verifyWebhook(webhookToken);
    
    console.log('WhatsApp setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setup(); 