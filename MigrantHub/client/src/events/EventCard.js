import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Place from '@material-ui/icons/Place';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = {
  card: {
    maxWidth: 250,
    minWidth: 250,
    minHeight: 200,
    maxHeight: 200,
    textAlign: 'left',
  },
  headContainer:{
    minHeight: 40,
    maxHeight: 40,
  },
  bodyContainer:{
    minHeight: 50,
    maxHeight: 50,
  },
  media: {
    objectFit: 'cover',
  },
};

const EventCard = (props) => {
  const {
    classes, eventId, eventName, eventDescription, eventImagePath, eventLocation,
    dateStart, dateEnd, timeStart, timeEnd,
  } = props;

  return (
    <React.Fragment>
    <Card>
    <CardActionArea
        component={cardProps => <Link to={`/events/${eventId}`} {...cardProps} />}
        className={classes.card}
      >
        <CardHeader color="primary" icon>
          <CardIcon color="primary">
            {(eventImagePath.length!=0) ? 
              (
                <img src={ eventImagePath } width={70} height={70} alt="NO IMAGE"/>
              )
              :
              (
                <div style={{ paddingTop:'15px' }}>
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"></link>
                  <i class="far fa-calendar fa-2x"></i>
                </div>
              )
            }
          </CardIcon>
          <div className={classes.headContainer} style={{ textAlign:'center', paddingTop:'10px' }}>
            <Typography variant="subheading">
              {eventName.substring(0,20)} 
              <hr />
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
            <div className={classes.bodyContainer}>
              <Typography variant="subtitle2" >
                <br />
                { eventDescription.substring(0,50) }...
              </Typography>
            <div style={{ display: 'inline-block', padding: '5px 5px 5px 5px' }}>
                <Typography variant="caption">
                  {moment(dateStart).format('MMM D YYYY')} @ {timeStart}<br />
                  {moment(dateEnd).format('MMM D YYYY')} @ {timeEnd}
              </Typography>
            </div>
            <div style={{ display: 'inline-block', padding: '5px 5px 5px 5px' }}>
                {eventLocation
                  ? (<p style={{textAlign:'left'}}><Place fontSize="inherit" /> {eventLocation.city}</p>)
                  : (<p style={{textAlign:'left'}}><Place fontSize="inherit" /> Canada</p>)
                }
            </div>
            </div>
        </CardBody>
      </CardActionArea>
    </Card>
  </React.Fragment>
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
