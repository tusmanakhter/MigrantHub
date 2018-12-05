import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Header from '../components/Header/Header';
import UserItem from './UserItem';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    const { location } = props;
    let searchQuery = '';

    if (location.state) {
      searchQuery = location.state.searchQuery;
    }

    axios.get('/api/friend/viewusers', {
      params: {
        searchQuery: searchQuery,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { items } = this.state;
    return (
      <div>
        <Header />
        <Paper className={classes.root} elevation={2}>
          {' '}
          {
              items.map(item => (
                <UserItem
                  userid={item._id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  getData={this.getData}
                />
              ))
          }
        </Paper>
      </div>
    );
  }
}

ServiceList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceList);
