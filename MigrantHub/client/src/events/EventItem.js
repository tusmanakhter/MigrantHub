import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ViewEvent from 'events/ViewEvent';
import Share from "@material-ui/icons/Share";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Place from "@material-ui/icons/Place";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from 'react-router-dom';
import ArtTrack from "@material-ui/icons/ArtTrack";

const styles = {
  ...dashboardStyle,
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
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
      <GridItem xs={12} sm={12} md={2}>
        <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={this.handleClickOpen}>
                <CardMedia
                  component="img"
                  alt={eventName}
                  className={classes.media}
                  height="200"
                  src={eventImagePath}
                  title={eventName}
                />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="primary" simple justIcon onClick={this.handleClickOpen}>
                      <ArtTrack className={classes.tableActionButtonIcon + " " + classes.edit} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Share"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Link to={`event/share/${eventId}`}>
                      <Button color="info" simple justIcon className={classes.tableActionButton}>
                        <Share className={classes.tableActionButtonIcon + " " + classes.edit} />
                      </Button>
                    </Link>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {eventName}
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                    {description}
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>Free</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  {location ? (<div><Place />{location.city}</div>) : ""}
                </div>
              </CardFooter>
            </Card>
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
         </GridItem>
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
