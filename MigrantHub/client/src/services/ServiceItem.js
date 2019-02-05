import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from '@material-ui/core/CardMedia';
import Place from "@material-ui/icons/Place";
import Button from "components/CustomButtons/Button.jsx";
import ViewService from 'services/ViewService';
import ViewReviews from 'services/ViewReviews';
import { Link } from 'react-router-dom';
import ArtTrack from "@material-ui/icons/ArtTrack";
import RateReview from "@material-ui/icons/RateReview";
import Share from "@material-ui/icons/Share";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

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
      category, subcategory,
    } = this.props;
    const { openService, openReviews, scroll } = this.state;
    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={this.handleClickOpen}>
                <CardMedia
                  component="img"
                  alt={serviceTitle}
                  className={classes.media}
                  height="200"
                  src={serviceImagePath}
                  title={serviceTitle}
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
                    title="Review"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon className={classes.tableActionButton} onClick={this.handleViewReviews}>
                      <RateReview className={classes.tableActionButtonIcon + " " + classes.edit} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Share"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Link to={`/services/share/${serviceId}`}>
                      <Button color="info" simple justIcon className={classes.tableActionButton}>
                        <Share className={classes.tableActionButtonIcon + " " + classes.edit} />
                      </Button>
                    </Link>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {serviceTitle}
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                    {serviceSummary}
                </p>
              </CardBody>
              <CardFooter product>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  {serviceLocation ? (<div><Place />{serviceLocation.city}</div>) : (<div><Place/>Canada</div>)}
                </div>
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
          category={category}
          subcategory={subcategory}
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
