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
import ViewService from './ViewService';
import ViewReviews from './ViewReviews';
import { Link } from 'react-router-dom'

const styles = {
  card: {
    width: '100%',
  },
  media: {
    objectFit: 'contain',
  },
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
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={serviceTitle}
            className={classes.media}
            height="200"
            src={serviceImagePath}
            title={serviceTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {serviceTitle}
            </Typography>
            <Typography component="p">
              {serviceSummary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClickOpen}>
            View Service
          </Button>
          <Button size="small" color="primary" onClick={this.handleViewReviews}>
            Reviews
          </Button>
          <Link to={`/services/share/${serviceId}`}>
            <Button size="small" color="primary">
              Share
            </Button>
          </Link>
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
        </CardActions>
      </Card>
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
