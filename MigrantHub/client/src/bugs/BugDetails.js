import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'App.css';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthConsumer } from 'routes/AuthContext';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';
import UserTypes from 'lib/UserTypes';
import Button from 'components/CustomButtons/Button.jsx';
import qs from 'qs';
import { toast } from 'react-toastify';
import Status from 'components/fields/bug/Status';
import validator from 'validator';
import { handleChange } from 'helpers/Forms';

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
      status: '',
      statusError: '',
      redirectToAllBugs: false,
    };

    this.handleChange = handleChange.bind(this);
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
        status: response.data.status,
      });
    });
  }

  validate = () => {
    const {
      intl,
    } = this.props;
    const {
      status,
    } = this.state;
    let isError = false;
    const errors = {
      statusError: '',
    };

    if (validator.isEmpty(status)) {
      errors.statusError = `${intl.formatMessage({ id: 'bug.status' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  handleUpdate = () => {
    const error = this.validate();
    if (!error) {
      this.updateBug();
    }
  }

  updateBug = async () => {
    const user = this.state.reporter;
    const {
      bugId,
      bugName,
      description,
      dateCreated,
      status,
    } = this.state;

    axios.put(`/api/bugs/${bugId}`,
      qs.stringify({
        user,
        bugName,
        description,
        dateCreated,
        status,
      })).then((response) => {
      toast.success(response.data);
      if (response.status === 200) {
        this.setState({
          redirectToAllBugs: true,
        });
      }
    }).catch((e) => {
      toast.error(e.response.data);
    });
  }

  renderRedirectToAllBugs = () => {
    const { redirectToAllBugs } = this.state;
    if (redirectToAllBugs) {
      return <Redirect to="/bugs" />;
    }
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      reporter, bugName, description, dateCreated, status, statusError,
    } = this.state;

    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            {this.renderRedirectToAllBugs()}
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
                  <Grid item xs={12} sm={4}>
                    <Status
                      status={status}
                      statusError={statusError}
                      handleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {user.type === UserTypes.ADMIN
                      && (
                      <Button onClick={this.handleUpdate} color="danger">
                            Update
                      </Button>
                      )
                    }
                  </Grid>
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
