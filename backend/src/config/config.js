const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  },
  
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/whatspay',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mode: process.env.PAYPAL_MODE || 'sandbox',
  },
  
  mpesa: {
    apiKey: process.env.MPESA_API_KEY,
    apiSecret: process.env.MPESA_API_SECRET,
    shortcode: process.env.MPESA_SHORTCODE,
    passkey: process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
    endpoints: {
      sandbox: {
        auth: 'https://sandbox.safaricom.co.ke/oauth/v1/generate',
        stkPush: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      },
      production: {
        auth: 'https://api.safaricom.co.ke/oauth/v1/generate',
        stkPush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      },
    },
  },
  
  whatsapp: {
    apiToken: process.env.WHATSAPP_API_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    apiVersion: 'v13.0',
    templates: {
      payment_success: 'payment_success',
      payment_failed: 'payment_failed',
      order_status: 'order_status_update',
    },
  },
};

// Validation
const requiredEnvVars = [
  'JWT_SECRET',
  'PAYPAL_CLIENT_ID',
  'PAYPAL_CLIENT_SECRET',
  'MPESA_API_KEY',
  'MPESA_API_SECRET',
  'MPESA_PASSKEY',
  'WHATSAPP_API_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

module.exports = config; 