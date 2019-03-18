import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Place from '@material-ui/icons/Place';
import Star from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';
import 'rc-menu/assets/index.css';
import {
  getCategoryIcon, getCategory, getSubCategory,
} from 'helpers/Category';

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
  Recommendation: {
    color: 'green',
  },
  ratingContainer: {
    display: 'flex',
  },
  rating: {
    marginRight: 5,
  },
};

function getTitle(serviceTitle){
  console.log(serviceTitle);
  return serviceTitle.substring(0,90);
}

const ServiceCard = (props) => {
  const {
    classes, serviceId, serviceTitle, serviceImagePath, rating, count,
    serviceLocation, category, subcategory, percentageMatch,
  } = props;

  return (
    <React.Fragment>
      <Card >
        <CardActionArea component={cardProps => <Link to={`/services/${serviceId}`} {...cardProps} />} className={classes.card}>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"></link>
              {getCategoryIcon(category)}
            </CardIcon>
            <div className={classes.headContainer}>
              <Typography variant="caption">
                <br/>
                <b>
                  {getCategory(category)} {subcategory && ` • ${getSubCategory(subcategory)}`}
                </b>
              </Typography>
            </div>
          </CardHeader>
          <CardBody>
            <div className={classes.bodyContainer}>
              <Typography variant="body2">
                {serviceTitle && serviceTitle.substring(0,90)}
              </Typography>
              {serviceLocation
                ? (<p style={{textAlign:'left'}}><Place fontSize="inherit" /> {serviceLocation.city}</p>)
                : (<p style={{textAlign:'left'}}><Place fontSize="inherit" /> Canada</p>)
              }
            </div>
          </CardBody>
          <CardFooter stats>
            <div className={classes.ratingContainer}>
              <StarRatingComponent
                name="rate"
                editing={false}
                starCount={5}
                value={rating}
                className={classes.rating}
              />
            </div>
            {percentageMatch
              ? (<div className={classes.Recommendation}>{` • `}<Star />Recommendation: {percentageMatch}%</div>)
              : (<div />)
            }
          </CardFooter>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

ServiceCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  serviceId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  serviceImagePath: PropTypes.string.isRequired,
  serviceLocation: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  count: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default withStyles(styles)(ServiceCard);