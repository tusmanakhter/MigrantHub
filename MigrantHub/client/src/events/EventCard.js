import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Place from '@material-ui/icons/Place';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = {
  card: {
    maxWidth: 345,
    minHeight: 350,
    textAlign: 'left',
  },
  media: {
    objectFit: 'cover',
  },
  Recommendation: {
    color: 'green',
  },
  locationContainer: {
    display: 'flex',
  },
  rating: {
    marginRight: 5,
  },
};

const EventCard = (props) => {
  const {
    classes, eventId, eventName, eventDescription, eventImagePath, eventLocation,
    dateStart, dateEnd, timeStart, timeEnd,
  } = props;

  return (
    <Card>
      <CardActionArea
        component={cardProps => <Link to={`/events/${eventId}`} {...cardProps} />}
        className={classes.card}
      >
        <CardMedia
          component="img"
          alt={eventName}
          className={classes.media}
          height="200"
          image={eventImagePath}
          title={eventName}
        />
        <CardContent>
          <Typography variant="subtitle1">
            {eventName} <br />
            {eventDescription}
          </Typography>
          <Typography variant="subtitle1">
            {moment(dateStart).format('MMM D YYYY')} @ {moment(timeStart).format('H:MM')}<br />
            {moment(dateEnd).format('MMM D YYYY')} @ {moment(timeEnd).format('H:MM')}
          </Typography>
          <div className={classes.locationContainer}>
            {eventLocation
              ? (<>{eventLocation.city}<Place fontSize="inherit" /></>)
              : (<>Canada<Place fontSize="inherit" /></>)
            }
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
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
