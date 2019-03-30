import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from 'components/CustomButtons/Button.jsx';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Fab from '@material-ui/core/Fab';
import { positionTypes } from 'lib/JobConstants';
import Typography from '@material-ui/core/Typography';

const styles = {
  cardIconTitle: {
    ...cardTitle,
  },
  gridStyleSmallPadding: {
    marginTop: '2px',
  },
  websiteButton: {
    textTransform: "none"
  },
};

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: props.match.params.id,
      jobDate: '',
      title: '',
      descriptionLength: 0,
      positionType: '',
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      location: '',
      salaryStart: '',
      salaryEnd: '',
      website: '',
      redirect: false,
    };
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    axios.get(`/api/job/${this.state.jobId}`, {
      params: {
        _id: this.state.jobId,
      },
    }).then((response) => {
      const parsedObj = qs.parse(response.data);
      console.log(parsedObj);

      this.setState({
        owner: parsedObj.user,
        jobDate: parsedObj.dateCreated,
        title: parsedObj.title,
        positionType: parsedObj.positionType,
        companyName: parsedObj.companyName,
        contactName: parsedObj.contactName,
        contactEmail: parsedObj.contactEmail,
        contactPhone: parsedObj.contactPhone,
        location: parsedObj.location,
        salaryStart: parsedObj.salaryEnd,
        salaryEnd: parsedObj.salaryEnd,
        website: parsedObj.website,
      });

      if (parsedObj.description) {
        this.setState({
          description: EditorState.createWithContent(convertFromRaw(JSON.parse(parsedObj.description))),
        });
      } else {
        this.setState({
          description: EditorState.createEmpty(),

        });
      }
    });
  }
    render() {
      const {
        classes,
      } = this.props;
      const {
        alert, owner, redirect, jobId, jobDate, title, description, positionType, companyName, contactName, contactEmail, contactPhone, location, salaryStart, salaryEnd, website,
      } = this.state;


     const positionTypeObject = positionTypes.find(type => type.value === positionType);
     const positionTypeString = positionTypeObject == undefined? '' : positionTypeObject.label;

      if (redirect) {
        return (
          <Redirect to="/jobs" />
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
                      <h4><b>Job Posting</b></h4>
                    </CardIcon>
                    <br />
                    <br />
                    <br />
                    <Typography variant="h4" className={classes.cardIconTitle}><b>{title}</b></Typography>
                    <Typography variant="caption" className={classes.cardIconTitle}>{companyName}{'-'}{location}</Typography>
                    <br />
                    {website? <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      aria-label="Add"
                      className={classes.websiteButton}
                      onClick={()=>window.open(website, "_blank")}
                    >
                      Visit Company Website
                    </Fab> : ''}
                  </CardHeader>
                  <CardBody>
                    <GridItem xs={12} align="left">
                      <Typography variant="body1"><b> Position Type: </b>{positionTypeString}</Typography>

                      <br />
                      <Typography variant="body1"><b>Contact Name: </b>{contactName}</Typography>
                      <Typography variant="body1"><b>Contact Email: </b>{contactEmail}</Typography>
                      <Typography variant="body1"><b>Contact Phone: </b>{contactPhone}</Typography>
                      <br />
                      <Typography variant="title"><b>Job Description: </b></Typography>
                      <br />
                      <Editor
                        toolbarHidden
                        editorState={description}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={8} md={8} lg={4} align="left">
                      <br />
                      {moment(jobDate).format('MMM D YYYY')}
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

export default withStyles(styles)(JobDetails);
