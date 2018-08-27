import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

// ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// components
import ErrorInfo from '../components/Login/ErrorInfo';
import FormInput from '../components/Login/FormInput';

// utils
import { authenticate, checkAuthentication } from './../authentication/index';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrors: false,
      errors: {
        login: false,
        password: false,
      },
      formData: {
        login: '',
        password: '',
      },
    };
  }

  componentDidMount() {
    this.validateForms();
    return checkAuthentication() && this.props.history.push('wall');
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { showErrors, errors } = this.state;
    if (!showErrors) {
      this.setState({ showErrors: true });
    }
    // check if any error is true
    if (!_.size(Object.keys(errors).filter(key => errors[key]))) {
      const { login, password } = this.state.formData;
      authenticate(login, password);
      return checkAuthentication() && this.props.history.push('wall');
    }
    return !false;
  };

  validateForms = () => {
    const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
    const errors = {};
    errors.login = this.state.formData.login.length < 5;
    errors.password = !_.size(this.state.formData.password.match(emailRegex));
    return this.setState({
      errors,
    });
  };

  updateForm = (field, value) =>
    this.setState(
      {
        formData: { ...this.state.formData, [field]: value },
      },
      this.validateForms,
    );

  renderErrors = () =>
    (this.state.showErrors ? (
      <Fragment>
        {this.state.errors.login && (
          <ErrorInfo text="Login must consist of at least 5 characters" />
        )}
        {this.state.errors.password && (
          <ErrorInfo text="The password must contain 8 characters, at least one lowercase letter, at least one capital letter, and at least one number" />
        )}
      </Fragment>
    ) : null);

  renderForm = () => (
    <form className={this.props.classes.form}>
      <FormInput
        error={this.state.showErrors && this.state.errors.login}
        value={this.state.formData.login}
        onChange={e => this.updateForm('login', e.target.value)}
        description="Login"
        errorDescription="* invalid login"
      />
      <FormInput
        error={this.state.showErrors && this.state.errors.password}
        value={this.state.formData.password}
        onChange={e => this.updateForm('password', e.target.value)}
        description="Password"
        errorDescription="* invalid password"
        type="password"
      />
      <Button
        fullWidth
        variant="raised"
        color="primary"
        className={this.props.classes.submit}
        onClick={this.onSubmit}
      >
        Sign in
      </Button>
    </form>
  );

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            {this.renderForm()}
            {this.renderErrors()}
          </Paper>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SignIn));
