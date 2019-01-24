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
import ServiceCategories from "./ServiceCategoryMenu1";
import priceImage1 from "assets/img/card-2.jpeg";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import ArrowUp from "@material-ui/icons/ArrowDropUp";

const styles = theme => ({
  ...dashboardStyle,
});

class ServiceCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToServiceForm: false,
      viewCategories: false,
    };
  }

  handleViewCategories = () => {
      this.setState(prevState => ({
          viewCategories: !prevState.viewCategories,
      }));
  }

  render() {
    const { classes } = this.props;
    const { viewCategories } = this.state;

    return (
      <div>
        <div className={classes.categoryButton}>
          <Button
              variant="fab"
              mini
              color="primary"
              aria-label="Add Service date"
              size="large"
              justifyContent='center'
              onClick={event => this.handleViewCategories()}
              className={classes.button}
          >
              {viewCategories ? <ArrowUp /> : <ArrowDown />}
          </Button>
            {viewCategories ? <p>Hide Categories</p> : <p>View Categories</p>}
        </div>
          {viewCategories ?
              <ServiceCategories classes={this.props.classes}/>
              : "" }
        {/* <ServiceList classes={this.props.classes} location={this.props.location}/> */}
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