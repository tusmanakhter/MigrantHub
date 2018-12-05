import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '50%',
  },
  media: {
    objectFit: 'contain',
  },
};

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 'paper',
    };
  }

  render() {
    const {
      classes, userid, firstName, lastName, email,
    } = this.props;
    const { scroll} = this.state;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {firstName + ' ' + lastName}
            </Typography>
            <Typography component="p">
              {email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

UserItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  userid: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserItem);
