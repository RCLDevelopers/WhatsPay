const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post('/webhook', express.json(), (req, res) => {
  const { body } = req;
  
  if (body.object === 'whatsapp_business_account') {
    try {
      const entries = body.entry;
      for (const entry of entries) {
        const changes = entry.changes;
        for (const change of changes) {
          if (change.field === 'messages') {
            const messages = change.value.messages;
            // Handle incoming messages here
            console.log('Received messages:', messages);
          }
        }
      }
      res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router; 