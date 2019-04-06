import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import EventCard from 'events/postings/EventCard';
import Button from 'components/CustomButtons/Button.jsx';
import UserTypes from 'lib/UserTypes';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify';
import update from 'immutability-helper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  loader: {
    margin: 5,
  },
});

class SavedEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToEventForm: false,
      offset: 0,
      limit: 10,
      moreData: true,
    };
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

  fetchData = (props) => {
    const { limit, offset } = this.state;

    axios.get('/api/events/saved', {
      params: {
        offset,
        limit,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.data.length === 0) {
        this.setState({ moreData: false });
      } else {
        console.log(response.data);
        this.setState(prevState => ({
          moreData: true,
          items: prevState.items.concat(response.data),
          offset: prevState.offset + response.data.length,
        }));
      }
    });
  }

  deleteSavedEvent = (eventId, index) => {
    axios.delete(`/api/events/saved/${eventId}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState(prevState => ({
            items: update(prevState.items, { $splice: [[index, 1]] }),
          }));
          this.fetchData();
          toast.success('Event Post Unsaved!');
        }
      }).catch((error) => {
        toast.error('Error Unsaving Event Post!');
      });
  };

  render() {
    const { classes } = this.props;
    const { items, moreData } = this.state;

    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <div className={classes.mainContainer}>
              {user.type !== UserTypes.ADMIN
            && (
              <div>
                {this.renderRedirectToEventForm()}
                <Grid item container justify="center">
                  {user.type === UserTypes.BUSINESS
                  && (
                    <Grid item lg={12} md={12} sm={12} xd={12} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.setRedirectToEventForm}
                      >
                        Create a Event Post
                      </Button>
                    </Grid>
                  )}
                  <Grid lg={12} md={12} sm={12} xd={12}>
                    <h3>
                      <FormattedMessage id="event.saved" />
                    </h3>
                    <h5>
                      <FormattedMessage id="event.saved.browse" />
                    </h5>
                  </Grid>
                </Grid>
                <hr />
              </div>
            )
            }
              <InfiniteScroll
                pageStart={0}
                loadMore={() => this.fetchData(this.props.redirect, this.props)}
                hasMore={moreData}
                loader={(
                  <Grid item style={{ paddingBottom: 15 }}>
                    <CircularProgress className={classes.loader} disableShrink />
                  </Grid>
              )}
                threshold={-200}
                useWindow={false}
                getScrollParent={() => document.getElementById('mainPanel')}
              >
                <GridContainer justify="center">
                  {' '}
                  {
                  items.map((item, index) => (
                    <GridItem xs={12} sm={12} md={8}>
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
                        savedEvent
                        itemIndex={index}
                        addSavedEvent={() => {}}
                        deleteSavedEvent={this.deleteSavedEvent}
                      />
                    </GridItem>
                  ))
                }
                </GridContainer>
              </InfiniteScroll>
            </div>
          </>
        )}
      </AuthConsumer>
    );
  }
}

SavedEventList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SavedEventList);
