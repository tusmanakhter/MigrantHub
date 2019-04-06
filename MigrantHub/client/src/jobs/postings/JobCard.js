import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from 'components/CustomButtons/Button.jsx';
import Tooltip from '@material-ui/core/Tooltip';
import 'rc-menu/assets/index.css';
import { getCategoryIcon, getCategory, getSubCategory } from 'helpers/Category';
import Place from '@material-ui/icons/Place';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UnFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Business from '@material-ui/icons/Business';
import moment from 'moment';
import GridContainer from 'components/Grid/GridContainer.jsx';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

const styles = theme => ({
  card: {
    minHeight: 205,
    maxHeight: 205,
    textAlign: 'left',
  },
  headContainer: {
    minHeight: 50,
    maxHeight: 50,
  },
  bodyContainer: {
    minHeight: 40,
    maxHeight: 40,
  },
  media: {
    objectFit: 'cover',
  },
  jobTitle: {
    textDecoration: 'underline',
  },
  locationContainer: {
    position: 'absolute',
    left: 0,
  },
  timePostedContainer: {
    position: 'absolute',
    right: 0,
  },
  tooltip: {
    position: 'relative',
  },
  date: {
    color: 'green',
  },
  cardFooter: {
    position: 'relative',
    minHeight: 40,
    maxHeight: 40,
  },
  cardSaved: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 240,
    maxHeight: 240,
  },
  cardSavedBody: {
    minHeight: 60,
    maxHeight: 60,
  },
  cardSavedFooter: {
    minHeight: 70,
    maxHeight: 70,
  },
  locationSavedContainer: {
    position: 'relative',
  },
  timePostedSavedContainer: {
    position: 'relative',
  },
});

const JobCard = (props) => {
  const {
    classes, jobId, title, description, location, companyName, dateCreated,
    className, smallCard, savedJob, addSavedJob, deleteSavedJob, itemIndex,
  } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardSaved]: smallCard,
    [className]: className !== undefined,
  });

  const cardBodyClasses = classNames({
    [classes.bodyContainer]: true,
    [classes.cardSavedBody]: smallCard,
    [className]: className !== undefined,
  });

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardSavedFooter]: smallCard,
    [className]: className !== undefined,
  });

  const cardLocationClasses = classNames({
    [classes.locationContainer]: true,
    [classes.locationSavedContainer]: smallCard,
    [className]: className !== undefined,
  });

  const cardTimeClasses = classNames({
    [classes.timePostedContainer]: true,
    [classes.timePostedSavedContainer]: smallCard,
    [className]: className !== undefined,
  });

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <Card className={cardClasses}>
            <GridItem align="right">
              {user.type === UserTypes.MIGRANT ? (
                <Tooltip
                  id="tooltip-top"
                  aria-label="SavedIcon"
                  title={savedJob ? <FormattedMessage id="job.unsave" /> : <FormattedMessage id="job.save" />}
                  className={classes.tooltip}
                >
                  {savedJob
                    ? (
                      <Button
                        size="sm"
                        color="primary"
                        justIcon
                        round
                        simple
                        onClick={() => deleteSavedJob(jobId, itemIndex)}
                      >
                        <FavoriteIcon />
                      </Button>
                    )
                    : (
                      <Button
                        size="sm"
                        color="primary"
                        justIcon
                        round
                        simple
                        onClick={() => addSavedJob(jobId, itemIndex)}
                      >
                        <UnFavoriteIcon />
                      </Button>
                    )
              }
                </Tooltip>
              )
                : (<div><br /><br /></div>
                )
          }
            </GridItem>
            <CardActionArea component={cardProps => <Link to={`/jobs/${jobId}`} {...cardProps} />}>
              <CardHeader color="primary" icon className={classes.headContainer}>
                <CardIcon color="primary">
                  <Business />
                </CardIcon>
                <Typography variant="title" className={classes.jobTitle}>
                  <b>
                    {(title != undefined && (title).length > 54)
                      ? (
                        <Typography variant="body2">
                          {((title).substring(0, 51))} <b>...</b>
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          {title}
                        </Typography>
                      )}
                  </b>
                </Typography>
                {(companyName != undefined && (companyName).length > 38)
                  ? (
                    <Typography variant="subheading" color="primary">
                      {((companyName).substring(0, 35))} <b>...</b>
                    </Typography>
                  )
                  : (
                    <Typography variant="subheading" color="primary">
                      {companyName}
                    </Typography>
                  )
              }
              </CardHeader>
              <CardBody className={cardBodyClasses}>
                {(description != undefined && (description).length > 122)
                  ? (
                    <Typography variant="body1">
                      {((description).substring(0, 110))} <b>...View More</b>
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {description}
                    </Typography>
                  )}
              </CardBody>
              <CardFooter stats className={cardFooterClasses}>
                <GridContainer justify="center">
                  <GridItem lg={12} md={12} sm={12} xs={12}>
                    <div className={cardLocationClasses}>
                      {location
                        ? (<p><Place fontSize="inherit" /> {location}</p>)
                        : (<p><Place fontSize="inherit" /> Canada</p>)
                      }
                    </div>
                  </GridItem>
                  <GridItem lg={12} md={12} sm={12} xs={12}>
                    <div className={cardTimeClasses}>
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
      )}
    </AuthConsumer>
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
