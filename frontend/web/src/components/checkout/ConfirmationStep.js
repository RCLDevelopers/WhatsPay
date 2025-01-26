import React from 'react';
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Check, ArrowBack } from '@material-ui/icons';
import { whatsAppColors } from '../../theme/colors';
import { processPayment, sendWhatsAppNotification } from '../../services/paymentService';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  icon: {
    fontSize: 64,
    color: whatsAppColors.success,
    margin: theme.spacing(2),
  },
  message: {
    margin: theme.spacing(2, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  loading: {
    margin: theme.spacing(4, 0),
  },
  orderDetails: {
    backgroundColor: whatsAppColors.light,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2, 0),
  },
}));

const ConfirmationStep = ({ onBack, paymentMethod, orderDetails }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [confirmed, setConfirmed] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const handlePaymentProcess = async () => {
    try {
      setLoading(true);
      setError(null);

      // Process payment based on selected method
      const paymentResult = await processPayment({
        method: paymentMethod,
        amount: orderDetails.total,
        currency: orderDetails.currency,
        orderId: orderDetails.id
      });

      if (paymentResult.success) {
        // Send WhatsApp notification
        await sendWhatsAppNotification({
          phone: orderDetails.phone,
          orderId: paymentResult.orderId,
          amount: orderDetails.total,
          items: orderDetails.items
        });

        setOrderNumber(paymentResult.orderId);
        setConfirmed(true);
      } else {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }
    } catch (err) {
      setError(err.message);
      setConfirmed(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handlePaymentProcess();
  }, []);

  if (loading) {
    return (
      <Paper className={classes.paper}>
        <CircularProgress className={classes.loading} />
        <Typography variant="h6">
          Processing your {paymentMethod.toUpperCase()} payment...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please don't close this window
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      {confirmed ? (
        <>
          <Check className={classes.icon} />
          <Typography variant="h5" gutterBottom>
            Payment Successful!
          </Typography>
          <div className={classes.orderDetails}>
            <Typography variant="body1" gutterBottom>
              Order Number: #{orderNumber}
            </Typography>
            <Typography variant="body2">
              Amount Paid: {orderDetails.currency} {orderDetails.total}
            </Typography>
          </div>
          <Typography className={classes.message}>
            Your order has been confirmed. You will receive a WhatsApp message with your order details shortly.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/catalog"
          >
            Continue Shopping
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" color="error" gutterBottom>
            Payment Failed
          </Typography>
          <Typography className={classes.message}>
            {error || 'There was an error processing your payment. Please try again.'}
          </Typography>
          <div className={classes.buttons}>
            <Button
              startIcon={<ArrowBack />}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentProcess}
            >
              Retry Payment
            </Button>
          </div>
        </>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ConfirmationStep; 