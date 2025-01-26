import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// PayPal payment processing
export const processPayPalPayment = createAsyncThunk(
  'payment/processPayPal',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/payments/paypal', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// M-PESA payment processing
export const processMPesaPayment = createAsyncThunk(
  'payment/processMPesa',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/payments/mpesa', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    paymentMethod: null,
    transactionId: null,
    status: null,
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetPayment: (state) => {
      state.error = null;
      state.transactionId = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // PayPal payment states
      .addCase(processPayPalPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayPalPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionId = action.payload.transactionId;
        state.status = 'success';
      })
      .addCase(processPayPalPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      // M-PESA payment states
      .addCase(processMPesaPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processMPesaPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionId = action.payload.transactionId;
        state.status = 'success';
      })
      .addCase(processMPesaPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { setPaymentMethod, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer; 