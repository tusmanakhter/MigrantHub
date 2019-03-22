import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EventCard from 'events/EventCard';
import UserTypes from 'lib/UserTypes';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import TermsConditions from 'app/TermsConditions';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Info from '@material-ui/icons/Info';
import Gavel from '@material-ui/icons/Gavel';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import NavPills from 'components/NavPills/NavPills.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Button from 'components/CustomButtons/Button.jsx';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  loader: {
    margin: 5,
  },
  content: {
    marginBottom: 10,
  },
});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToEventForm: false,
      offset: 0,
      limit: 20,
      moreData: true,
    };
  }

  fetchData = (redirect, props) => {
    const { location } = props;
    const { limit } = this.state;
    let { offset } = this.state;

    let searchQuery = '';
    let searchMode = false;

    let editOwnerEmail = '';
    if (location.state) {
      this.setState({
        editMode: location.state.editMode,
        editOwner: location.state.editOwner,
      });

      editOwnerEmail = location.state.editOwner;

      if (location.state.searchMode) {
        searchMode = location.state.searchMode;
        searchQuery = location.state.searchQuery;
      }
    }

    if (redirect) {
      offset = 0;
    }

    axios.get('/api/events/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery,
        search: searchMode,
        offset,
        limit,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        if (redirect) {
          this.setState({ items: [], moreData: false });
        } else {
          this.setState({ moreData: false });
        }
      } else if (redirect) {
        this.setState({
          items: response.data,
          moreData: true,
          offset: offset + response.data.length,
        });
      } else {
        this.setState(prevState => ({
          items: prevState.items.concat(response.data),
          offset: prevState.offset + response.data.length,
        }));
      }
    });
  }

  setRedirectToEventForm = () => {
    this.setState({
      redirectToEventForm: true,
    });
  }

  renderRedirectToEventForm = () => {
    const { redirectToEventForm } = this.state;

    if (redirectToEventForm) {
      return <Redirect to="/events/create" />;
    }
  }

  render() {
    const { classes } = this.props;
    const { items, moreData } = this.state;
    return (
      <AuthConsumer>
        {({ user }) => (
          <div className={classes.mainContainer}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h3 className={classes.pageSubcategoriesTitle}>
                  <FormattedMessage id="events" />
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
                              { 
                                user.type === UserTypes.BUSINESS &&
                                <FormattedMessage id="event.infobox.merchant" />
                              }
                              {
                                user.type !== UserTypes.BUSINESS &&
                                <FormattedMessage id="event.infobox" />
                              }
                            </h6>
                          </CardHeader>
                          <CardBody>
                            { user.type === UserTypes.BUSINESS
                              && (
                                <div>
                                  {this.renderRedirectToEventForm()}
                                  <Button
                                    variant="contained"
                                    color="info"
                                    className={classes.button}
                                    onClick={this.setRedirectToEventForm}
                                  >
                                    <FormattedMessage id="event.create" />
                                  </Button>
                                </div>
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
                            <p><b><FormattedMessage id="legalbox" /><TermsConditions /></b></p>
                            <br />
                            MigrantHub ©
                          </CardBody>
                        </Card>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
            <h5 className={classes.pageSubcategoriesTitle}>
              <FormattedMessage id="event.browse" />
            </h5>
            <hr />
            <InfiniteScroll
              pageStart={0}
              loadMore={() => this.fetchData(this.props.redirect, this.props)}
              hasMore={moreData}
              loader={(
                <Grid item style={{ paddingBottom: 15 }}>
                  <CircularProgress className={classes.loader} disableShrink />
                </Grid>
              )}
              threshold={-600}
              useWindow={false}
              getScrollParent={() => document.getElementById('mainPanel')}
            >
              <Grid className={classes.content} container spacing={16} alignItems="center" justify="center">
                {' '}
                {
                  items.map(item => (
                    <GridItem>
                      <EventCard
                        eventId={item._id}
                        eventName={item.eventName}
                        eventImagePath={item.eventImagePath}
                        eventDescription={item.description}
                        eventLocation={item.location}
                        dateStart={item.dateStart}
                        dateEnd={item.dateEnd}
                        timeStart={item.timeStart}
                        timeEnd={item.timeEnd}
                      />
                    </GridItem>
                  ))
                }
              </Grid>
            </InfiniteScroll>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EventList);
