import React, { Component } from 'react';
import MainLayout from 'home/MainLayout';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.jsx";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ServiceItem from 'services/ServiceItem';
import Header from 'components/Header/Header';
import UserTypes from 'lib/UserTypes';
import QuestionnairePanel from 'components/QuestionnairePanel/QuestionnairePanel';
import Grid from '@material-ui/core/Grid';
import NavPanel from 'components/NavPanel/NavPanel';

const styles = theme => ({
  mainContainer: {
    marginLeft: 75,
  },
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
      redirectToServiceForm: false,
      redirectToSuggestionForm: false,
      editMode: '',
      editOwner: '',
    };

    this.getData = this.getData.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
    this.getUser();
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
    this.getUser();
  }

  getData(event, props = this.props) {
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
        items: response.data,
      });
    });
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    });
  }

  setRedirectToServiceForm = () => {
    this.setState({
      redirectToServiceForm: true,
    });
  }

  renderRedirectToServiceForm = () => {
    const { redirectToServiceForm } = this.state;
    if (redirectToServiceForm) {
      return <Redirect to="/services/create" />;
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  setRedirectToSuggestionForm = () => {
    this.setState({
      redirectToSuggestionForm: true,
    });
  }

  renderRedirectToSuggestionForm = () => {
    const { redirectToSuggestionForm } = this.state;
    if (redirectToSuggestionForm) {
      return <Redirect to="/services/suggestions/create" />;
    }
  }

  render() {
    const { classes, location, history } = this.props;
    const { items, editMode, editOwner, type } = this.state;
    return (
      <React.Fragment>
        <MainLayout location={location} history={history}>
          <div className={classes.mainContainer}>
            {type !== UserTypes.ADMIN
              && (
                <div>
                  {this.renderRedirectToServiceForm()}
                  {this.renderRedirectToSuggestionForm()}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.setRedirectToServiceForm}
                  >
                    Create Service
                  </Button>
                  {type === UserTypes.MIGRANT
                    && (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.setRedirectToSuggestionForm}
                      >
                        Add Suggestion
                    </Button>
                    )
                  }
                </div>
              )
            }
            <GridContainer>
              {' '}
              {
                items.map(item => (
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
                    getData={this.getData}
                  />
                ))
              }
              <Grid item xs={2}>
                <div className="Panel">{<QuestionnairePanel />}</div>
              </Grid>
            </GridContainer >
          </div >
        </MainLayout>
      </React.Fragment>
    );
  }
}

ServiceList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceList);