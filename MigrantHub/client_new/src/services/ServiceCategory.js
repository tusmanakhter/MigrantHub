import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "components/CustomButtons/Button.jsx";
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ServiceItem from './ServiceItem';
import Header from '../components/Header/Header';
import UserTypes from '../lib/UserTypes';
import refugiecenterlogo from 'assets/img/refugiecenterlogo.png'
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Folder from "@material-ui/icons/Folder";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Pages from "@material-ui/icons/Pages";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Place from "@material-ui/icons/Place";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import ViewService from './ViewService';
import ViewReviews from './ViewReviews';
import { Link } from 'react-router-dom';

import ArtTrack from "@material-ui/icons/ArtTrack";
import RateReview from "@material-ui/icons/RateReview";
import Share from "@material-ui/icons/Share";


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


const styles = theme => ({
    ...dashboardStyle,
    card: {
            maxWidth: 100,
            padding: 20,
        },
    media: {
        paddingTop: '0%', // 16:9,
        maxWidth:200,
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
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
    this.getUser();
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
    this.getUser();
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

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    });
  }

  setRedirectToServiceForm = () => {
    this.setState({
      redirectToServiceForm: true,
    });
  }

    render() {
      const { classes } = this.props;
      const { items, editMode, editOwner, type } = this.state;
      return (
        <div>
        <Card style={{ padding:'20px'}}>
        <CardHeader>
            <h4 className={classes.cardTitle}>Category</h4>
        </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}></p>
                    <h5 className={classes.cardTitle}>
                        Work Accidents
                    </h5>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Pages />
                        16 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Women</p>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                    <Pages />
                    5 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Employement</p>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Pages />
                        11 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Housing</p>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Pages />
                        9 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Legal aid</p>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Pages />
                        9 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={2}>
                <Card>
                <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                        <Folder/>
                    </CardIcon>
                    <p className={classes.cardCategory}>Information and referral</p>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Pages />
                        9 services
                    </div>
                </CardFooter>
                </Card>
            </GridItem>
          </GridContainer>
          </Card>
          <Card style={{ padding:'20px'}}>
            <CardHeader>
                <h4 className={classes.cardTitle}>Services</h4>
            </CardHeader>
          <GridContainer>
            <GridItem>
                <Card chart>
                    <CardHeader >
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    src={refugiecenterlogo}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Laywer</h4>
                    <p className={classes.cardCategory}>
                        This is a summary of the service
                    </p>
                    <div>
                        <div><Place/>Montreal</div>
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
                        
                        <Button color="info" simple justIcon className={classes.tableActionButton}>
                            <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                        </Button>

                    </Tooltip>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card chart>
                    <CardHeader >
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    src={refugiecenterlogo}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Laywer</h4>
                    <p className={classes.cardCategory}>
                        This is a summary of the service
                    </p>
                    <div>
                        <div><Place/>Montreal</div>
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
                        
                        <Button color="info" simple justIcon className={classes.tableActionButton}>
                            <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                        </Button>

                    </Tooltip>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card chart>
                    <CardHeader >
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    src={refugiecenterlogo}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Laywer</h4>
                    <p className={classes.cardCategory}>
                        This is a summary of the service
                    </p>
                    <div>
                        <div><Place/>Montreal</div>
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
                        
                        <Button color="info" simple justIcon className={classes.tableActionButton}>
                            <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                        </Button>

                    </Tooltip>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card chart>
                    <CardHeader >
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    src={refugiecenterlogo}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Laywer</h4>
                    <p className={classes.cardCategory}>
                        This is a summary of the service
                    </p>
                    <div>
                        <div><Place/>Montreal</div>
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
                        
                        <Button color="info" simple justIcon className={classes.tableActionButton}>
                            <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                        </Button>

                    </Tooltip>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card chart>
                    <CardHeader >
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    src={refugiecenterlogo}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Laywer</h4>
                    <p className={classes.cardCategory}>
                        This is a summary of the service
                    </p>
                    <div>
                        <div><Place/>Montreal</div>
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
                        
                        <Button color="info" simple justIcon className={classes.tableActionButton}>
                            <Share className={classes.tableActionButtonIcon + " " + classes.edit}/>
                        </Button>

                    </Tooltip>
                    </CardFooter>
                </Card>
            </GridItem>
          </GridContainer>
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