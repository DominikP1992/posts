import React from 'react';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  span: {
    color: '#f44336',
    fontSize: '1rem',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    lineHeight: 1,
    transform: 'scale(0.75)',
    marginTop: 10,
    width: '100%',
  },
  svg: {
    position: 'absolute',
    left: -30,
    top: -2,
  },
};

const ErrorInfo = ({ classes, text }) => (
  <span className={classes.span}>
    <ErrorOutline className={classes.svg} />
    {text}
  </span>
);
export default withStyles(styles)(ErrorInfo);
