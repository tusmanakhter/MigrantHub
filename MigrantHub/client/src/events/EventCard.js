import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import 'rc-menu/assets/index.css';
import { getCategoryIcon, getCategory, getSubCategory } from 'helpers/Category';
import Place from '@material-ui/icons/Place';
import Business from '@material-ui/icons/Business';
import moment from 'moment';
import GridContainer from 'components/Grid/GridContainer.jsx';
import { AuthConsumer } from 'routes/AuthContext';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UnFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import UserTypes from 'lib/UserTypes';
import { FormattedMessage } from 'react-intl';
import Button from 'components/CustomButtons/Button.jsx';

const styles = theme => ({
  card: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    textAlign: 'left',
  },
  headContainer: {
    minHeight: 40,
    maxHeight: 40,
  },
  bodyContainer: {
    minHeight: 55,
    maxHeight: 55,
  },
  eventTitle: {
    textDecoration: 'underline',
  },
  locationContainer: {
    position: 'absolute',
    left: 0,
  },
  timePostedContainer: {
    position: 'absolute',
    right: 0,
  },
  date: {
    color: 'green',
  },
  cardFooter: {
    position: 'relative',
    minHeight: 20,
    maxHeight: 20,
  },
});

const EventCard = (props) => {
  const {
    classes, eventId, eventName, eventDescription, eventLocation, dateEnd,
    savedEvent, addSavedEvent, deleteSavedEvent, itemIndex,
  } = props;

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <Card className={classes.card}>
            <GridItem align="right">
              {user.type === UserTypes.MIGRANT ? (
                <Tooltip
                  id="tooltip-top"
                  aria-label="SavedIcon"
                  title={savedEvent ? <FormattedMessage id="event.unsave" /> : <FormattedMessage id="event.save" />}
                  className={classes.tooltip}
                >
                  {savedEvent
                    ? (
                      <Button
                        size="sm"
                        color="primary"
                        justIcon
                        round
                        simple
                        onClick={() => deleteSavedEvent(eventId, itemIndex)}
                      >
                        <FavoriteIcon />
                      </Button>
                    )
                    : (
                      <Button
                        size="sm"
                        color="primary"
                        justIcon
                        round
                        simple
                        onClick={() => addSavedEvent(eventId, itemIndex)}
                      >
                        <UnFavoriteIcon />
                      </Button>
                    )
              }
                </Tooltip>
              )
                : (<div><br /><br /></div>
                )
        }
            </GridItem>
            <CardActionArea component={cardProps => <Link to={`/events/${eventId}`} {...cardProps} />}>
              <CardHeader color="primary" icon className={classes.headContainer}>
                <CardIcon color="primary">
                  <CalendarToday />
                </CardIcon>
                <Typography variant="title" className={classes.eventTitle}>
                  {(eventName != undefined && (eventName).length > 51)
                    ? (
                      <Typography variant="body2">
                        {((eventName).substring(0, 48))} <b>...</b>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {eventName}
                      </Typography>
                    )}
                </Typography>
              </CardHeader>
              <CardBody className={classes.bodyContainer}>
                {(eventDescription != undefined && (eventDescription).length > 87)
                  ? (
                    <Typography variant="body1">
                      {((eventDescription).substring(0, 100))} <b>...View More</b>
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {eventDescription}
                    </Typography>
                  )}
              </CardBody>
              <CardFooter stats className={classes.cardFooter}>
                <GridContainer justify="center">
                  <GridItem lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.locationContainer}>
                      {eventLocation
                        ? (<p><Place fontSize="inherit" /> {eventLocation.city}</p>)
                        : (<p><Place fontSize="inherit" /> Canada</p>)
          }
                    </div>
                  </GridItem>
                  <GridItem lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.timePostedContainer}>
                      {moment(dateEnd) > moment()
                        ? (<p className={classes.date}><CalendarToday />Ends {moment(dateEnd).fromNow()}</p>)
                        : (<p className={classes.date}><CalendarToday />Ended {moment(dateEnd).fromNow()}</p>)
          }
                    </div>
                  </GridItem>

                </GridContainer>
              </CardFooter>
            </CardActionArea>
          </Card>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
};

EventCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventImagePath: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  eventLocation: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
};

export default withStyles(styles)(EventCard);
