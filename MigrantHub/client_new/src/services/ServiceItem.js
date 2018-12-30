import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Place from "@material-ui/icons/Place";
import IconButton from "@material-ui/core/IconButton";
import Button from "components/CustomButtons/Button.jsx";
import Typography from '@material-ui/core/Typography';
import ViewService from './ViewService';
import ViewReviews from './ViewReviews';
import { Link } from 'react-router-dom';

import ArtTrack from "@material-ui/icons/ArtTrack";
import RateReview from "@material-ui/icons/RateReview";
import Share from "@material-ui/icons/Share";
import Edit from "@material-ui/icons/Edit";

// @material-ui/core components
import Grid from "@material-ui/core/Grid";

// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

var styles = {
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

class ServiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openService: false,
      openReviews: false,
      scroll: 'paper'
    };
  }

  handleViewReviews = () => {
    this.setState({
      openReviews: true
    });
  };

  handleClickOpen = () => {
    this.setState({
      openService: true,
    });
  };

  handleClose = () => {
    this.setState({
      openService: false,
      openReviews: false
    });
  };

  raiseInvoiceClicked() {
    const url = 'somesite.com&data=yourDataToSend';
    window.open(url, '_blank');
  }

  render() {
    const {
      classes, serviceId, serviceTitle, serviceSummary, serviceDescription, getData,
      serviceImagePath, serviceLocation, serviceDate, serviceHours, editMode, editOwner,
    } = this.props;
    const { openService, openReviews, scroll } = this.state;
    return (
      <GridItem xs={12} sm={12} md={2}>
          <Card chart>
            <CardHeader color="success">
                <CardMedia
                component="img"
                alt={serviceTitle}
                className={classes.media}
                height="200"
                src={serviceImagePath}
                title={serviceTitle}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{serviceTitle}</h4>
              <p className={classes.cardCategory}>
                {serviceSummary}
              </p>
              <div>
                  {serviceLocation?(<div><Place/>{serviceLocation.city}</div>):""}
              </div>
            </CardBody>
            <CardFooter chart>
              <Tooltip
                id="tooltip-top"
                title="View"
                placement="top"
                classes={{tooltip:classes.tooltip}}>
                  <Button color="primary" simple justIcon onClick={this.handleClickOpen}>
                      <ArtTrack className={classes.tableActionButtonIcon + " " + classes.edit}/>
                  </Button>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Review"
                placement="top"
                classes={{tooltip:classes.tooltip}}>
                  <Button color="success" simple justIcon className={classes.tableActionButton} onClick={this.handleViewReviews}>
                      <RateReview className={classes.tableActionButtonIcon + " " + classes.edit}/>
                  </Button>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Share"
                placement="top"
                classes={{tooltip:classes.tooltip}}>
                <Link to={`/services/share/${serviceId}`}>
                  <Button color="info" simple justIcon className={classes.tableActionButton}>
                      <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                  </Button>
                </Link>
              </Tooltip>
            </CardFooter>
          </Card>
          <ViewService
            open={openService}
            scroll={scroll}
            onClose={this.handleClose}
            serviceId={serviceId}
            serviceTitle={serviceTitle}
            serviceImagePath={serviceImagePath}
            serviceDescription={serviceDescription}
            serviceSummary={serviceSummary}
            serviceLocation={serviceLocation}
            serviceDate={serviceDate}
            serviceHours={serviceHours}
            editMode={editMode}
            editOwner={editOwner}
            getData={getData}
          />
          <ViewReviews
            open={openReviews}
            scroll={scroll}
            onClose={this.handleClose}
            serviceId={serviceId}
            serviceTitle={serviceTitle}
            editMode={editMode}
          />
      </GridItem>
    );
  }
}

ServiceItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  serviceId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  serviceSummary: PropTypes.string.isRequired,
  serviceDescription: PropTypes.string.isRequired,
  serviceImagePath: PropTypes.string.isRequired,
  serviceDate: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  serviceLocation: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  serviceHours: PropTypes.shape([{
    serviceDay: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }]).isRequired,
  editOwner: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(styles)(ServiceItem);
