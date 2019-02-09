import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import Button from 'components/CustomButtons/Button.jsx';
import UserTypes from 'lib/UserTypes';
import QuestionnairePanel from 'components/QuestionnairePanel/QuestionnairePanel';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';

// @material-ui/icons
import Info from '@material-ui/icons/Info';
import Gavel from '@material-ui/icons/Gavel';
import HelpOutline from '@material-ui/icons/HelpOutline';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import NavPills from 'components/NavPills/NavPills.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';

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
      redirectToServiceForm: false,
      redirectToSuggestionForm: false,
      editMode: '',
      editOwner: '',
      offset: 0,
      limit: 20,
      moreData: true,
    };
    this.fetchData();
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

  fetchData = () => {
    const { location } = this.props;
    const { offset, limit, moreData } = this.state;

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
        searchQuery,
        search: searchMode,
        category,
        subcategory,
        offset,
        limit,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        this.setState({ moreData: false });
      } else {
        this.setState(prevState => ({
          items: prevState.items.concat(response.data),
          offset: prevState.offset + response.data.length,
        }));
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { items, editMode, editOwner, moreData } = this.state;

    return (
      <AuthConsumer>
        {({ user }) => (
          <React.Fragment>
            <div className={classes.mainContainer}>
              {user.type !== UserTypes.ADMIN
                && (
                  <div>
                    {this.renderRedirectToServiceForm()}
                    {this.renderRedirectToSuggestionForm()}
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={8}>
                        <h3 className={classes.pageSubcategoriesTitle}>
                          <FormattedMessage id="services" />
                        </h3>
                        <hr />
                        <NavPills
                          color="warning"
                          alignCenter
                          tabs={[
                            {
                              tabButton: 'Description',
                              tabIcon: Info,
                              tabContent: (
                                <Card>
                                  <CardHeader>
                                    <h6 className={classes.cardTitle}>
                                      <FormattedMessage id="service.infobox" />
                                    </h6>
                                  </CardHeader>
                                  <CardBody>
                                    <Button
                                      variant="contained"
                                      color="info"
                                      className={classes.button}
                                      onClick={this.setRedirectToServiceForm}
                                    >
                                      <FormattedMessage id="service.create" />
                                    </Button>
                                    {user.type === UserTypes.MIGRANT
                                      && (
                                        <Button
                                          variant="contained"
                                          color="info"
                                          className={classes.button}
                                          onClick={this.setRedirectToSuggestionForm}
                                        >
                                          <FormattedMessage id="service.addsuggestion" />
                                        </Button>
                                      )
                                    }
                                    <br />
                                  </CardBody>
                                </Card>
                              ),
                            },
                            {
                              tabButton: 'Legal Info',
                              tabIcon: Gavel,
                              tabContent: (
                                <Card>
                                  <CardHeader>
                                    <h4 className={classes.cardTitle}>
                                      <FormattedMessage id="legalboxtitle" />
                                    </h4>
                                  </CardHeader>
                                  <CardBody>
                                    <p><b><FormattedMessage id="legalbox" /></b></p>
                                    <br />
                                    MigrantHub ©
                                  </CardBody>
                                </Card>
                              ),
                            },
                            {
                              tabButton: 'Personalization',
                              tabIcon: HelpOutline,
                              tabContent: (
                                <>
                                  {user.type === UserTypes.MIGRANT && (
                                    <QuestionnairePanel />
                                  )}
                                </>
                              ),
                            },
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                )
              }
              <h5 className={classes.pageSubcategoriesTitle}>
                <FormattedMessage id="service.browse" />
              </h5>
              <hr />
              <Grid container spacing={16} alignItems="center" justify="center">
                {' '}
                {
                  items.map(item => (
                    <Grid item>
                      <ServiceCard
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
                        rating={item.avgRating}
                        count={item.countRating}
                        getData={this.getData}
                      />
                    </Grid>
                  ))
                }
              </Grid>
              <Grid container spacing={16} alignItems="center" justify="center">
                <Grid item>
                  {moreData && (
                    <Button
                      variant="contained"
                      color="info"
                      className={classes.button}
                      onClick={this.fetchData}
                    >
                      Load More
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

ServiceList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceList);
