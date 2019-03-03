import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Place from '@material-ui/icons/Place';
import Star from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 345,
    minHeight: 350,
    textAlign: 'left',
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

const ServiceCard = (props) => {
  const {
    classes, serviceId, serviceTitle, serviceImagePath, rating, count,
    serviceLocation, category, subcategory, percentageMatch,
  } = props;

  return (
    <Card>
      <CardActionArea
        component={cardProps => <Link to={`/services/${serviceId}`} {...cardProps} />}
        className={classes.card}
      >
        <CardMedia
          component="img"
          alt={serviceTitle}
          className={classes.media}
          height="200"
          image={serviceImagePath}
          title={serviceTitle}
        />
        <CardContent>
          <Typography variant="subtitle2">
            {category}
            {subcategory && ` • ${subcategory}`}
          </Typography>
          <Typography variant="subtitle1">
            {serviceTitle}
          </Typography>
          <div className={classes.ratingContainer}>
            <StarRatingComponent
              name="rate"
              editing={false}
              starCount={5}
              value={rating}
              className={classes.rating}
            />
            {`${count} • `}
            {serviceLocation
              ? (<>{serviceLocation.city}<Place fontSize="inherit" /></>)
              : (<>Canada<Place fontSize="inherit" /></>)
            }
          </div>
          {percentageMatch
            ? (<div className={classes.Recommendation}><Star />Recommendation: {percentageMatch}%</div>)
            : (<div />)
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ServiceCard.propTypes = {
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
};

export default withStyles(styles)(ServiceCard);
