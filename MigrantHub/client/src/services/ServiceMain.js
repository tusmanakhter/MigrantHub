import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import RateReview from "@material-ui/icons/RateReview";
import Share from "@material-ui/icons/Share";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from 'components/CustomButtons/Button';
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import ServiceCategories from "./ServiceCategoryMenu4";
import priceImage1 from "assets/img/card-2.jpeg";

const styles = theme => ({
  ...dashboardStyle,
});

class ServiceCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToServiceForm: false,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ServiceCategories />
        <Card style={{ padding: '20px' }}>
          <CardHeader>
            <h4 className={classes.cardTitle}>Services</h4>
          </CardHeader>
          <GridItem xs={12} sm={6} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage1} alt="..." />
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
                    <Button color="info" simple justIcon className={classes.tableActionButton}>
                      <Share className={classes.tableActionButtonIcon + " " + classes.edit} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Beautiful Castle
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  The place is close to Metro Station and bus stop just 2 min by
                  walk and near to "Naviglio" where you can enjoy the main night
                  life in Milan.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$459/night</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Milan, Italy
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Card>
      </div>
    );
  }
}

ServiceCategory.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceCategory);