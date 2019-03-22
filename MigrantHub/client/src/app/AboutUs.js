import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RefugeeCenterLogo from 'assets/img/refugee_centre_logo.png';

const styles = theme => ({
  root: {
    color: 'white',
    flexGrow: '1',
    display: 'flex',
  },
  label: {
    textTransform: 'none',
  },
  summary: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    textSize: '10px',
    color: 'white',
    background: theme.palette.primary.main,
    padding: '1% 15% 1% 15%',
    display: 'inline-block',
  },
  aims: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    padding: '1% 15% 1% 15%',
    background: theme.palette.common.white,
    color: 'black',
  },
});

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} className={classes.summary}>
              <h1>About Us</h1>
              <h5>
                We are a group of software engineering students working to create the most innovative service platform for newcomers in Montreal. 
                MigrantHub was started because of refugees, immigrants, international students that have a hard time finding services that they need. 
                Many times we find ourselves not even knowing the existence of a particular service. 
                This is where MigrantHub comes in, bringing all services available in Montreal into one simple website. 
              </h5>
              This project is powered by <b>The Refugee Centre</b>.
              <hr />
              <div style={{ display: 'inline-block', padding: '10px 10px 10px 10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <ls>
                    <h3>Aims</h3>
                    <div style={{ textAlign: 'left' }}>
                      <li>Facilitate integration for newcomers</li>
                      <li>Promote diversity and inclusion</li>
                      <li>Help businesses reach out to newcomers</li>
                      <li>Learn about newcomers and guide them using AI technology</li>
                    </div>
                  </ls>
                </div>
                <br />
              </div>
              <div style={{ display: 'inline-block', padding: '10px 10px 10px 10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h3>Objectives</h3>
                  <div style={{ textAlign: 'left' }}>
                    <ls>
                      <li>Provide certified services to all users for free</li>
                      <li>Help personalize the types of services they might like</li>
                      <li>Assist newcomers in what they are looking for </li>
                      <li>Centralize all available services in Montreal into one place</li>
                    </ls>
                  </div>
                  <br />
                </div>
              </div>
              <div style={{ clear: 'both' }}>
                <hr />
                <h3>Contact MigrantHub</h3>
                <ls>
                  <p>Have questions regarding the website OR Want to help the project? Please feel free to send us an email at:</p>
                  <h4>mtl-migranthub@placeholder.com</h4>
                </ls>
              </div>
              <br />
            </Grid>
            <Grid item xs={12} className={classes.aims}>
              <h3>Current Members</h3>
              <div style={{ float: 'center', display: 'inline-block' }}>
                <a href="https://github.com/tusmanakhter">Tusman Akhter</a><br />
                <a href="https://github.com/CodeTaj">Tajbid Choudhury</a><br />
                <a href="https://github.com/miramarhaba">Mira Marhaba</a><br />
                <a href="https://github.com/Smoudii">Alexandre Masmoudi</a><br />
                <a href="https://github.com/mazennahle">Mazen Nahle</a><br />
                <a href="https://github.com/rajee10">Rajee Vairamuthu</a><br />
                <a href="https://github.com/iamlax">Laxman Velauthapillai</a><br />
              </div>
              <hr />
              <div style={{ float: 'center', display: 'inline-block' }}>
                <a href="https://www.therefugeecentre.org/">
                  <img src={RefugeeCenterLogo} alt="..." height="25%" width="25%" />
                </a>
                <br />
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

AboutUs.defaultProps = {
  classes: {},
};

AboutUs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutUs);
