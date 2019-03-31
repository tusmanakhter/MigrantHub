import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import axios from 'axios';
import qs from 'qs';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import Fab from '@material-ui/core/Fab';
import { positionTypes } from 'lib/JobConstants';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UnFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import OutlineButton from '@material-ui/core/Button';

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
  },
  gridStyleSmallPadding: {
    marginTop: '2px',
  },
  websiteButton: {
    textTransform: "none"
  },
  tooltip:{
    position: "relative",
  },
  savedJob:{
    position: "absolute",
    right: 0,
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
      alert: null,
      savedJob: false,
    };

    this.hideAlert = this.hideAlert.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.warningWithConfirmAndCancelMessage = this.warningWithConfirmAndCancelMessage.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(props) {
    axios.get(`/api/job/${this.state.jobId}`, {
      params: {
        _id: this.state.jobId,
      },
    }).then((response) => {
      const parsedObj = qs.parse(response.data);
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
        savedJob: parsedObj.savedJob,
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

  handleDelete = () => {
    const { jobId } = this.state;

    axios.delete(`/api/job/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Job post deleted!");
          this.setState({
            redirect: true,
          });
        }
      }).catch((error) => {
      toast.error("Error Deleting Job Post!");
    });
    this.hideAlert();
  };

  warningWithConfirmAndCancelMessage() {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Are you sure?"
          onConfirm={() => this.handleDelete()}
          onCancel={() => this.cancelDelete()}
          confirmBtnCssClass={
            `${this.props.classes.button} ${this.props.classes.success}`
          }
          cancelBtnCssClass={
            `${this.props.classes.button} ${this.props.classes.danger}`
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this job!
        </SweetAlert>
      ),
    });
  }

  cancelDelete() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-100px' }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            `${this.props.classes.button} ${this.props.classes.success}`
          }
        >
          Your job is safe :)
        </SweetAlert>
      ),
    });
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  addSavedJob = (jobId) => {
    axios.put(`/api/job/saved/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Job Post Saved!");
          this.setState({
            savedJob: true,
          });
        }
      }).catch((error) => {
      toast.error("Error Saving Job Post!");
    });
  };

  deleteSavedJob = (jobId) => {
    axios.delete(`/api/job/saved/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Job Post Unsaved!");
          this.setState({
            savedJob: false,
          });
        }
      }).catch((error) => {
      toast.error("Error Unsaving Job Post!");
    });
  };

    render() {
      const {
        classes,
      } = this.props;
      const {
        alert, owner, redirect, jobId, jobDate, title, description, positionType, companyName, contactName, contactEmail, contactPhone, location, savedJob, website,
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
                      <h4><b>Job Posting  </b></h4>
                    </CardIcon>
                    <br />
                    <br />
                    <br />
                    <Typography variant="h4" className={classes.cardIconTitle}>
                      <b>{title}{' '}</b>
                        {savedJob ?
                          (
                            <OutlineButton
                              id="savedJob"
                              color="primary"
                              variant="outlined"
                              aria-label="Saved Job"
                              title={<FormattedMessage id="job.save" />}
                              onClick={() => this.deleteSavedJob(jobId)}
                              className={classes.savedJob}>
                            <UnFavoriteIcon/> {' '} Saved
                            </OutlineButton>
                          )
                          :
                          (
                            <OutlineButton
                              id="savedJob"
                              color="primary"
                              variant="outlined"
                              aria-label="Saved Job"
                              title={<FormattedMessage id="job.save" />}
                              onClick={() => this.addSavedJob(jobId)}
                              className={classes.savedJob}>
                              <FavoriteIcon/>{' '} Save
                            </OutlineButton>
                          )
                        }
                    </Typography>
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
              <Grid item xs={12}>
                {user.type === UserTypes.ADMIN
                && (
                  <Button onClick={this.warningWithConfirmAndCancelMessage} color="danger">
                    Delete
                  </Button>
                )
                }
                {user.username === owner && (
                  <React.Fragment>
                    <Button onClick={this.warningWithConfirmAndCancelMessage} color="danger">
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      component={props => <Link to={{ pathname: '/jobs/create', state: { editMode: true, jobId } }} {...props} />}
                    >
                      Edit
                    </Button>
                  </React.Fragment>
                )}
              </Grid>
            </div>
          )}
        </AuthConsumer>
      );
    }
}

export default withStyles(styles)(JobDetails);
