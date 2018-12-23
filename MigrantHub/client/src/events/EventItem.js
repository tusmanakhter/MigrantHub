import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewEvent from './ViewEvent';

const styles = {
  card: {
    width: '100%',
  },
  media: {
    objectFit: 'contain',
  },
};

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      scroll: 'paper',
    };
  }

    handleClickOpen = () => {
      this.setState({
        open: true,
      });
    };

    handleClose = () => {
      this.setState({
        open: false,
      });
    };

    render() {
      const {
        classes, eventId, eventName, eventImagePath, description, location, dateStart,
        dateEnd, timeStart, timeEnd, editMode, editOwner, getData,
      } = this.props;
      const { open, scroll } = this.state;

      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={eventName}
              className={classes.media}
              height="200"
              width="300"
              src={eventImagePath}
              title={eventName}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {eventName}
              </Typography>
              <Typography component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleClickOpen}>
              View Event
            </Button>
            <ViewEvent
              open={open}
              scroll={scroll}
              onClose={this.handleClose}
              eventId={eventId}
              eventName={eventName}
              eventImagePath={eventImagePath}
              description={description}
              location={location}
              dateStart={dateStart}
              dateEnd={dateEnd}
              timeStart={timeStart}
              timeEnd={timeEnd}
              editMode={editMode}
              editOwner={editOwner}
              getData={getData}
            />
          </CardActions>
        </Card>
      );
    }
}

EventItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventImagePath: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
  editOwner: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(styles)(EventItem);
