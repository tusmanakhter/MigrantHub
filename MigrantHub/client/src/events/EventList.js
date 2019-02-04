import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EventItem from 'events/EventItem';
import UserTypes from 'lib/UserTypes';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';


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
  mainContainer: {
    marginLeft: 75,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToEventForm: false,
      editMode: '',
      editOwner: '',
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
    axios.get('/api/events/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery,
        search: searchMode,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
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
    const { items, editMode, editOwner } = this.state;
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
                              <FormattedMessage id="event.infobox" />
                            </h6>
                          </CardHeader>
                          <CardBody>
                            {user.type !== UserTypes.ADMIN
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
                            <p><b><FormattedMessage id="legalbox" /></b></p>
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
            <GridContainer>
              {
                items.map(item => (
                  <EventItem
                    eventId={item._id}
                    eventName={item.eventName}
                    eventImagePath={item.eventImagePath}
                    description={item.description}
                    location={item.location}
                    dateStart={item.dateStart}
                    dateEnd={item.dateEnd}
                    timeStart={item.timeStart}
                    timeEnd={item.timeEnd}
                    editMode={editMode}
                    editOwner={editOwner}
                    getData={this.getData}
                  />
                ))
              }
            </GridContainer>
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
