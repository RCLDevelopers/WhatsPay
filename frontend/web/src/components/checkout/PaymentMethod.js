import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Button,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMPesaValidation } from '../../hooks/useMPesaValidation';
import { setPaymentMethod, processMPesaPayment } from '../../store/slices/paymentSlice';

const useStyles = makeStyles((theme) => ({
  paymentMethod: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
  methodDetails: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  paymentLogo: {
    height: 40,
    marginLeft: theme.spacing(2),
  },
}));

const PaymentMethod = ({ onNext, onBack }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payment);
  const {
    phoneNumber,
    errors,
    handlePhoneChange,
    isValid,
  } = useMPesaValidation();
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async () => {
    if (paymentMethod === 'mpesa' && !isValid) {
      return;
    }

    try {
      if (paymentMethod === 'mpesa') {
        await dispatch(processMPesaPayment({ phoneNumber })).unwrap();
      } else {
        await dispatch(processPayPalPayment()).unwrap();
      }
      onNext();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <Paper className={classes.paymentMethod}>
          <FormControlLabel
            value="paypal"
            control={<Radio color="primary" />}
            label={
              <Grid container alignItems="center">
                <Typography>PayPal</Typography>
                <img
                  src="/paypal-logo.png"
                  alt="PayPal"
                  className={classes.paymentLogo}
                />
              </Grid>
            }
          />
        </Paper>
        <Paper className={classes.paymentMethod}>
          <FormControlLabel
            value="mpesa"
            control={<Radio color="primary" />}
            label={
              <Grid container alignItems="center">
                <Typography>M-PESA</Typography>
                <img
                  src="/mpesa-logo.png"
                  alt="M-PESA"
                  className={classes.paymentLogo}
                />
              </Grid>
            }
          />
        </Paper>
      </RadioGroup>

      {paymentMethod === 'mpesa' && (
        <Paper className={classes.methodDetails}>
          <Typography variant="body2">
            Enter your M-PESA phone number to receive payment prompt
          </Typography>
          <TextField
            fullWidth
            label="M-PESA Phone Number"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            disabled={loading}
            margin="normal"
          />
        </Paper>
      )}

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

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
          endIcon={<ArrowForward />}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default PaymentMethod; 