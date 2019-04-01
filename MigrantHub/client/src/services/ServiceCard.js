import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Place from '@material-ui/icons/Place';
import Star from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'components/CustomButtons/Button.jsx';
import Tooltip from '@material-ui/core/Tooltip';
import 'rc-menu/assets/index.css';
import { getCategoryIcon, getCategory, getSubCategory } from 'helpers/Category';

const styles = theme => ({
  card: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    textAlign: 'left',
  },
  headContainer: {
    minHeight: 40,
    maxHeight: 40,
  },
  bodyContainer: {
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
  tooltip: {
    position: 'relative',
  },
});

const ServiceCard = (props) => {
  const {
    classes, serviceId, serviceTitle, serviceImagePath, rating, count,
    serviceLocation, category, subcategory, percentageMatch, pinIcon, pinIconHandle, pinIconHelperText,
  } = props;

  return (
    <React.Fragment>
      <Card>
        <GridItem align="right">
          <Tooltip
            id="tooltip-top"
            aria-label="Pin"
            title={pinIconHelperText}
            className={classes.tooltip}
          >
            <Button
              size="sm"
              color="rose"
              justIcon
              round
              simple
              onClick={() => pinIconHandle(serviceId)}
            >
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
              {pinIcon}
            </Button>
          </Tooltip>
        </GridItem>
        <CardActionArea component={cardProps => <Link to={`/services/${serviceId}`} {...cardProps} />} className={classes.card}>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
              {getCategoryIcon(category)}
            </CardIcon>
            <div className={classes.headContainer}>
              <Typography variant="caption">
                <b>
                  {getCategory(category)} {subcategory && ` • ${getSubCategory(subcategory)}`}
                </b>
              </Typography>
            </div>

          </CardHeader>
          <CardBody>
            <div className={classes.bodyContainer}>
              {(serviceTitle != undefined && (serviceTitle).length > 110)
                ? (
                  <Typography variant="body2">
                    {((serviceTitle).substring(0, 105))} <b>... View More</b>
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    {serviceTitle}
                  </Typography>
                )}
              {serviceLocation
                ? (<p style={{ textAlign: 'left' }}><Place fontSize="inherit" /> {serviceLocation.city}</p>)
                : (<p style={{ textAlign: 'left' }}><Place fontSize="inherit" /> Canada</p>)
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
              {`${count} Rating`}
            </div>
            {percentageMatch
              ? (<div className={classes.Recommendation}>{' • '}<Star />Recommendation: {percentageMatch}%</div>)
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
