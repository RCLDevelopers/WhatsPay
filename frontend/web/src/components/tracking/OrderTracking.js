import React, { useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderStatus } from '../../store/slices/orderSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  stepper: {
    backgroundColor: 'transparent',
  },
  stepCompleted: {
    color: theme.palette.primary.main,
  },
}));

const OrderTracking = ({ orderId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, loading } = useSelector((state) => state.order);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      dispatch(fetchOrderStatus(orderId));
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(statusInterval);
  }, [orderId, dispatch]);

  const steps = [
    'Order Placed',
    'Payment Confirmed',
    'Processing',
    'Ready for Pickup',
    'Completed',
  ];

  const activeStep = steps.indexOf(status) || 0;

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Order Status
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {loading && (
        <Typography color="textSecondary">
          Updating status...
        </Typography>
      )}
    </Paper>
  );
};

export default OrderTracking; 