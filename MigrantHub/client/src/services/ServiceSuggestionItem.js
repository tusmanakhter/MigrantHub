import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from '../lib/UserTypes';

const styles = {
  card: {
    width: '100%',
  },
  media: {
    objectFit: 'contain',
  },
};

class ServiceItem extends Component {
  handleDelete = () => {
    const { serviceSuggestionId, getData } = this.props;
    axios.delete('/api/services/suggestions/' + serviceSuggestionId)
      .then((response) => {
        if (response.status === 200) {
          getData();
        }
      });
  };

  render() {
    const {
      classes, serviceTitle, serviceSummary, category, subcategory,
    } = this.props;
    return (
      <AuthConsumer>
        {({ user }) => (
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {serviceTitle}
                </Typography>
                <Typography component="p">
                  {serviceSummary}
                </Typography>
                <Typography variant="body2" color="inherit" paragraph align="center">
                  Service Category: {category}
                </Typography>
                <Typography variant="body2" color="inherit" paragraph align="center">
                  Service Subcategory: {subcategory}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              { user.type === UserTypes.ADMIN
                && (
                  <Button onClick={this.handleDelete} color="secondary"> Delete </Button>
                )
              }
            </CardActions>
          </Card>
        )}
      </AuthConsumer>
    );
  }
}

ServiceItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  serviceSuggestionId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  serviceSummary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(styles)(ServiceItem);
