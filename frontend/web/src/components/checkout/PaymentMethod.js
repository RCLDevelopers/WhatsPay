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
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

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
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
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
          {/* Add phone number input field here */}
        </Paper>
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
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default PaymentMethod; 