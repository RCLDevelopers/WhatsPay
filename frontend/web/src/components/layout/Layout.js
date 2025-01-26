import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { whatsAppColors } from '../../theme/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: whatsAppColors.background,
  },
  appBar: {
    backgroundColor: whatsAppColors.dark,
  },
  content: {
    padding: theme.spacing(3),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 30,
      marginRight: theme.spacing(1),
    },
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <img src="/whatspay-logo.png" alt="WhatsPay" />
            <Typography variant="h6">WhatsPay</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        {children}
      </Container>
    </div>
  );
};

export default Layout; 