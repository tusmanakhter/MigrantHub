import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import 'rc-menu/assets/index.css';
import { getCategoryIcon, getCategory, getSubCategory } from 'helpers/Category';
import Place from '@material-ui/icons/Place';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Business from '@material-ui/icons/Business';
import moment from 'moment';
import GridContainer from 'components/Grid/GridContainer.jsx';
import classNames from "classnames";
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  card: {
    minHeight: 200,
    maxHeight: 200,
    textAlign: 'left',
  },
  cardContainer: {
    margin: 5,
    padding: 0,

  },
  headContainer:{
    minHeight: 50,
    maxHeight: 50,
  },
  bodyContainer:{
    minHeight: 40,
    maxHeight: 40,
  },
  media: {
    objectFit: 'cover',
  },
  jobTitle: {
    textDecoration: 'underline'
  },
  locationContainer: {
    position: "absolute",
    left: 0,
  },
  timePostedContainer: {
    position: "absolute",
    right: 0,
  },
  tooltip:{
    position: 'relative',
  },
  date: {
    color: 'green',
  },
  cardFooter:{
    position: 'relative',
    minHeight: 40,
    maxHeight: 40,
  },
  cardFavorite: {
    maxWidth: 250,
    minWidth: 250,
  },
});

const JobCard = (props) => {
  const { classes, jobId, title, description, location, companyName, dateCreated, className, smallCard } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardFavorite]: smallCard,
    [className]: className !== undefined
  });

  return (
    <React.Fragment>
      <Card className={classes.cardContainer}>
        <GridItem align='right'>
        </GridItem>
        <CardActionArea component={cardProps => <Link to={`/jobs/${jobId}`} {...cardProps} />} className={cardClasses}>
          <CardHeader color="primary" icon className={classes.headContainer}>
            <CardIcon color="primary">
              <Business />
            </CardIcon>
            <Typography variant="title" className={classes.jobTitle} >
              <b>
                {title && title.substring(0,90)}
              </b>
            </Typography>
            {(companyName != undefined && (companyName).length > 110) ?
              <Typography variant="subheading" color="primary">
                {((companyName).substring(0, 105))} <b>...</b>
              </Typography> :
              <Typography variant="subheading" color="primary">
                {companyName}
              </Typography>
            }
          </CardHeader>
          <CardBody className={classes.bodyContainer}>
              {(description != undefined && (description).length > 110) ?
                <Typography variant="body1">
                  {((description).substring(0,105))} <b>...View More</b>
                </Typography>:
                <Typography variant="body1">
                  {description}
                </Typography>
              }
          </CardBody>
          <CardFooter stats className={classes.cardFooter}>
            <GridContainer justify="center">
              <GridItem lg={6} md={6} sm={12} xs={12} allign="left">
                <div className={classes.locationContainer}>
                  {location
                    ? (<p><Place fontSize="inherit" /> {location}</p>)
                    : (<p><Place fontSize="inherit" /> Canada</p>)
                  }
                </div>
              </GridItem>
              <GridItem lg={6} md={6} sm={12} xs={12} allign="right">
                <div className={classes.timePostedContainer}>
                  {dateCreated
                    ? (<p className={classes.date}><CalendarToday />Posted: {moment(dateCreated).fromNow()}</p>)
                    : (<p />)
                  }
                  </div>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

JobCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  jobId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default withStyles(styles)(JobCard);