import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// components
import Spinner from '../components/generic/Spinner';

// utils
import { signout } from './../authentication/index';

// selectors
import { changeSelector } from '../selectors';

// actions
import { fetchMessage, clearMessage } from '../redux/actions/cardActions';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#64dd17',
  },
  logoutBtn: {
    color: 'white',
    position: 'absolute',
    right: 0,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  goBackBtn: {
    width: '100%',
    marginBottom: 10,
  },
});

class Wall extends React.Component {
  componentDidMount() {
    this.props.fetchMessage(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  signout = () => {
    signout();
    this.props.history.push('/login');
  };

  renderDetails = () => {
    const { message } = this.props;
    if (this.props.error) {
      return (
        <Typography variant="display3" align="center" gutterBottom>
          👻 Can not find this details
        </Typography>
      );
    }
    if (!_.size(message)) {
      return <Spinner />;
    }
    return (
      <div>
        <Button
          onClick={() => this.props.history.push('/wall')}
          variant="contained"
          color="primary"
          className={this.props.classes.goBackBtn}
        >
          Go back
        </Button>
        <Typography variant="body2" align="left" gutterBottom>
          <strong>Name:</strong> {message.name}
        </Typography>
        <Typography variant="body2" align="left" gutterBottom>
          <strong>Id:</strong> {message.id}
        </Typography>
        <Typography variant="body2" align="left" gutterBottom>
          <strong>Title:</strong> {message.title}
        </Typography>
        <Typography variant="body2" align="left" gutterBottom>
          <strong>Body:</strong> {message.body}
        </Typography>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <ChatIcon className={classes.icon} />
            <Typography variant="title" color="inherit" noWrap>
              Simple Chat
            </Typography>
            <Button
              size="medium"
              className={classes.logoutBtn}
              onClick={this.signout}
            >
              <ExitToApp className={classes.icon} />Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>{this.renderDetails()}</div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Wall.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  message: changeSelector(state.cardData.messages),
  error: changeSelector(state.cardData.error),
});
const mapDispatchToProps = dispatch => ({
  fetchMessage: id => dispatch(fetchMessage(id)),
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Wall));
