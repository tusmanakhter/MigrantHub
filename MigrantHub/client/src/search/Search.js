import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from "components/Grid/GridContainer.jsx";
import axios from 'axios';
import ServiceItem from 'services/ServiceItem';
import UserItem from 'People/UserItem';
import Header from 'components/Header/Header';
import QuestionnairePanel from 'components/QuestionnairePanel/QuestionnairePanel';
import NavPanel from 'components/NavPanel/NavPanel';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  mainContainer: {
    marginLeft: 75,
    paddingTop: 100,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  Panel: {
    float: 'right',
    position: 'absolute',
    right: 0,
    paddingTop: 25,
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userItem: [],
      servicesItem: [],
      editMode: '',
      editOwner: '',
    };

    this.getServices = this.getServices.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount(props) {
    this.getServices(this, props);
    this.getUsers(this, props);
  }

  componentWillReceiveProps(props) {
    this.getServices(this, props);
    this.getUsers(this, props);
  }

  getServices(event, props = this.props) {
    const { location } = props;
    let editOwnerEmail = '';
    let searchQuery = '';
    let searchMode = false;
    let category = '';
    let subcategory = '';

    if (location.state) {
      if (location.state.editMode) {
        this.setState({
          editMode: location.state.editMode,
          editOwner: location.state.editOwner,
        });

        editOwnerEmail = location.state.editOwner;
      } else if (location.state.searchMode) {
        searchMode = location.state.searchMode;
        searchQuery = location.state.searchQuery;
      } else if (location.state.category) {
        category = location.state.category;
        subcategory = location.state.subcategory;
      }
    }
    axios.get('/api/services/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery: searchQuery,
        search: searchMode,
        category: category,
        subcategory: subcategory,
      },
    }).then((response) => {
      this.setState({
        servicesItem: response.data,
      });
    });
  }

  getUsers(event, props = this.props) {
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
        userItem: response.data,
      });
    });
  }

  renderServices() {
    const { classes } = this.props;
    const { servicesItem, editMode, editOwner } = this.state;

    if(this.state.servicesItem.length !== 0) {
        return (
        <div className={classes.serviceContainer}>
        <h4 className={classes.searchContainer}>Services</h4>
        <GridContainer>
        {' '}
        {
            servicesItem.map(item => (
            <ServiceItem
                serviceId={item._id}
                serviceTitle={item.serviceTitle}
                serviceImagePath={item.serviceImagePath}
                serviceDescription={item.serviceDescription}
                serviceSummary={item.serviceSummary}
                category={item.category}
                subcategory={item.subcategory}
                serviceLocation={item.location}
                serviceDate={item.serviceDate}
                serviceHours={item.serviceHours}
                editMode={editMode}
                editOwner={editOwner}
                getServices={this.getServices}
            />
            ))
        }
        </GridContainer>
        </div>
        );
    }
  }

  renderUsers() {
    const { classes } = this.props;
    const { userItem } = this.state;

    if(this.state.userItem.length !== 0) {
        return (
        <div className={classes.userContainer}>
        <h4 className={classes.searchContainer}>People</h4>
        <Paper className={classes.root} elevation={2}>
          {' '}
          {
              userItem.map(item => (
                <UserItem
                  userid={item._id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  getUsers={this.getUsers}
                />
              ))
          }
        </Paper>
        </div>
        );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <NavPanel />
        <Header/>
        <div className={classes.Panel}>{<QuestionnairePanel />}</div>
        {this.renderServices()}
        {this.renderUsers()}
        </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Search);
