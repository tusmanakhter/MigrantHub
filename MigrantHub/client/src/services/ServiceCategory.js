import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import refugiecenterlogo from 'assets/img/card-1.jpeg'
import Folder from "@material-ui/icons/Folder";
import Pages from "@material-ui/icons/Pages";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from '@material-ui/core/CardMedia';
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import RateReview from "@material-ui/icons/RateReview";
import Share from "@material-ui/icons/Share";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from 'components/CustomButtons/Button';
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import ServiceCategories from "./ServiceCategories";
import ServiceList from "./ServiceList";

import priceImage1 from "assets/img/card-2.jpeg";


const styles = theme => ({
  ...dashboardStyle,
  card: {
    maxWidth: 100,
    padding: 20,
  },
  media: {
    paddingTop: '0%', // 16:9,
    maxWidth: 200,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ServiceCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToServiceForm: false,
      editMode: '',
      editOwner: '',
      searchMode: false,
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    const { location } = props;
    const { searchMode } = this.state;
    let editOwnerEmail = '';
    let searchQuery = '';

    if (location.state) {
      if (location.state.editMode) {
        this.setState({
          editMode: location.state.editMode,
          editOwner: location.state.editOwner,
        });

        editOwnerEmail = location.state.editOwner;
      } else if (location.state.searchMode) {
        this.setState({
          searchMode: searchMode,
        });
        searchQuery = location.state.searchQuery;
      }
    }
    axios.get('/api/services/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery: searchQuery,
        search: searchMode,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  setRedirectToServiceForm = () => {
    this.setState({
      redirectToServiceForm: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { items, editMode, editOwner } = this.state;
    return (
      <div>
        <ServiceCategories classes={this.props.classes}/>
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