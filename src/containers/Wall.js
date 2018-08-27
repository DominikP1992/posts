import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

// components
import Spinner from '../components/generic/Spinner';

// utils
import { signout } from './../authentication/index';

// selectors
import { dataSelector, changeSelector } from '../selectors';

// actions
import { fetchWallMessages } from '../redux/actions/wallActions';

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
  searchForm: {
    marginTop: 15,
    width: '100%',
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardWrapper: {
    margin: 10,
    border: '1px solid black',
    borderRadius: 10,
    minHeight: 165,
    maxHeight: 165,
    position: 'relative',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    position: 'absolute',
    bottom: 5,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBlocks: [],
      activeFilter: false,
    };
  }

  componentDidMount() {
    this.props.fetchWallMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messageBlocks !== nextProps.messageBlocks) {
      this.setState({ messageBlocks: nextProps.messageBlocks });
    }
  }

  redirectToPost = id => this.props.history.push(`/wall/${id}`);

  signout = () => {
    signout();
    this.props.history.push('/login');
  };

  updateFilters = (e) => {
    if (!e.target.value) {
      return this.setState({
        messageBlocks: this.props.messageBlocks,
        activeFilter: false,
      });
    }
    const filteredMessages = _.chunk(
      _.flatten(this.props.messageBlocks).filter(message =>
        `${message.title} ${message.body}`.indexOf(e.target.value) > -1),
      3,
    );
    return this.setState({
      messageBlocks: filteredMessages,
      activeFilter: true,
    });
  };

  renderGrid = () => {
    if (this.props.error) {
      return (
        <Typography variant="display3" align="center" gutterBottom>
          👻 Server error
        </Typography>
      );
    }

    if (!_.size(this.state.messageBlocks) && this.state.activeFilter) {
      return (
        <Typography variant="display3" align="center" gutterBottom>
          🧐 No records found
        </Typography>
      );
    }

    if (!_.size(this.state.messageBlocks)) {
      return <Spinner />;
    }

    return (
      <Grid container spacing={40}>
        {this.state.messageBlocks.map(messages => (
          <Grid item key={messages[0].id} xs={12} sm={6} md={4}>
            <Card className={this.props.classes.card}>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={this.props.classes.cardWrapper}
                >
                  <CardContent className={this.props.classes.cardContent}>
                    <Typography gutterBottom variant="headline" component="h2">
                      {message.name}
                    </Typography>
                    <Typography>Title: {message.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      className={this.props.classes.cardButton}
                      onClick={() => this.redirectToPost(message.id)}
                    >
                      View
                    </Button>
                  </CardActions>
                </div>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
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
            <div className={classes.heroContent}>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Simple Chat
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textSecondary"
                paragraph
              >
                Chat created for the needs of recruitment, I think something
                works there, but who knows? 🤗
              </Typography>
              <FormControl className={classes.searchForm}>
                <InputLabel htmlFor="search">Search post</InputLabel>
                <Input
                  id="search"
                  onChange={this.updateFilters}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className={`${classes.layout} ${classes.cardGrid}`}>
            {this.renderGrid()}
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
  messageBlocks: dataSelector(state.wallData.messages),
  error: changeSelector(state.wallData.error),
});
const mapDispatchToProps = dispatch => ({
  fetchWallMessages: () => dispatch(fetchWallMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Wall));
