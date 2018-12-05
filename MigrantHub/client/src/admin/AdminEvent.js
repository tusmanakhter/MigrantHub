import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({  layout: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
},
card: {
  width: '70%',
  marginTop: `${theme.spacing.unit * 2}px`,
},

});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.getData = this.getData.bind(this);
  }


  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps() {
    this.getData();
  }

  getData() {
    axios.get('/api/events/view/all/', {
      params: {
        editOwner: '',
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

    handleDelete = (id) => {
      axios.delete('/api/admins/event/' + id)
        .then((response) => {
          if (response.status === 200) {
            this.getData();
          }
        });
    };

    render() {
      const { classes } = this.props;
      const { items } = this.state;

      return (
        <React.Fragment>
          <main className={classes.layout}>
            {
            items.map(item => (
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={item.eventName}
                    className={classes.media}
                    height="200"
                    width="300"
                    src={item.eventImagePath}
                    title={item.eventName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {item.eventName}
                    </Typography>
                    <Typography component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => this.handleDelete(item._id)}> Delete </Button>
                </CardActions>
              </Card>
            ))
          }
          </main>
        </React.Fragment>
      );
    }
}

EventList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EventList);
