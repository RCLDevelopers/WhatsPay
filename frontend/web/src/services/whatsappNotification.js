import axios from 'axios';

export const sendWhatsAppNotification = async (orderData) => {
  try {
    const response = await axios.post('/api/notifications/whatsapp', {
      phoneNumber: orderData.phoneNumber,
      orderId: orderData.orderId,
      status: orderData.status,
      items: orderData.items,
      total: orderData.total,
    });
    return response.data;
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    throw error;
  }
}; 