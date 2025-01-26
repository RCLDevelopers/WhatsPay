import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  makeStyles,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const OrderSummary = ({ onNext }) => {
  const classes = useStyles();
  // Mock data - replace with actual cart data
  const cartItems = [
    { id: 1, name: 'Product 1', price: 99.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <ListItemSecondaryAction>
              <Typography variant="body2">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <ListItemSecondaryAction>
            <Typography variant="h6" className={classes.total}>
              ${total.toFixed(2)}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={onNext}
          className={classes.button}
        >
          Proceed to Payment
        </Button>
      </div>
    </>
  );
};

export default OrderSummary; 