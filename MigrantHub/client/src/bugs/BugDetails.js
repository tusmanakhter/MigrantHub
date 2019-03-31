import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'App.css';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthConsumer } from 'routes/AuthContext';
import moment from 'moment';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  gridStyleSmallPadding: {
    marginTop: '2px',
  },
};

class BugDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugId: props.match.params.id,
      reporter: '',
      bugName: '',
      description: '',
      dateCreated: '',
    };
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    axios.get(`/api/bugs/${this.state.bugId}`, {
      params: {
        _id: this.state.bugId,
      },
    }).then((response) => {
      this.setState({
        reporter: response.data.user,
        bugName: response.data.bugName,
        description: response.data.description,
        dateCreated: response.data.dateCreated,
      });
    });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      reporter, bugName, description, dateCreated, redirect,
    } = this.state;

    if (redirect) {
      return (
        <Redirect to="/bugs" />
      );
    }

    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            {alert}
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <h4><b>Bug Report</b></h4>
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}><b>{bugName}</b></h4>
                </CardHeader>
                <CardBody>
                  <GridItem xs={12} align="left">
                    <h5><b> Description </b></h5>
                    <p>{description}</p>
                  </GridItem>
                  <GridItem xs={12} align="left">
                    <h5><b> Date Reported </b></h5>
                    <p>{moment(dateCreated).format('ll')}</p>
                  </GridItem>
                  <GridItem xs={12} align="left">
                    <h5><b> Reported By </b></h5>
                    <p>{reporter}</p>
                  </GridItem>
                </CardBody>
              </Card>
            </GridItem>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default withStyles(styles)(BugDetails);
