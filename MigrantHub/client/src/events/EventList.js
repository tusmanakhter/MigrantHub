import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EventItem from './EventItem';
import Header from '../components/Header/Header';

var qs = require('qs');

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToCreateEvent: false,
      editMode: '',
      editOwner: '',
    };

    this.getData = this.getData.bind(this);
  }


  componentDidMount() {
    this.getData(this);
  }

  componentWillReceiveProps() {
    this.getData(this);
  }

  getData() {
    const { location } = this.props;

    let editOwnerEmail ='';
    if(location.state){
        this.setState({
            editMode: location.state.editMode,
            editOwner: location.state.editOwner
        });

        editOwnerEmail=location.state.editOwner;
    }
    axios.get('/api/events/view/all/',{
        params: {
            editOwner: editOwnerEmail
        }
    }).then((response) => {
        this.setState({
            items: response.data
        });
    }).catch(error => {

    })
  }

    setRedirectToCreateEvent = () => {
      this.setState({
        redirectToCreateEvent: true,
      });
    }

    renderRedirectToCreateEvent = () => {
      const { redirectToCreateEvent } = this.state;

      if (redirectToCreateEvent) {
        return <Redirect to="/events/create" />;
      }
    }

    render() {
      const { classes } = this.props;
      const { items, editMode, editOwner } = this.state;

      return (
        <div>
          {this.renderRedirectToCreateEvent()}
          <Header appName="Migrant Hub" />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.setRedirectToCreateEvent}
          >
            Create Event
          </Button>
          <Paper className={classes.root} elevation={2}>
            {
            items.map(item => (
              <EventItem
                eventId={item._id}
                eventName={item.eventName}
                eventImagePath={item.eventImagePath}
                description={item.description}
                location={item.location}
                dateStart={item.dateStart}
                dateEnd={item.dateEnd}
                timeStart={item.timeStart}
                timeEnd={item.timeEnd}
                editMode={editMode}
                editOwner={editOwner}
              />
            ))
          }
          </Paper>
        </div>
      );
    }
}

EventList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EventList);
