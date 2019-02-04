import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { AuthConsumer } from 'routes/AuthContext';

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Clearfix from 'components/Clearfix/Clearfix.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress.jsx';

// @material-ui/core components
import { FormattedMessage } from 'react-intl';

const qs = require('qs');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  label: {
    fontWeight: 'bold',
  },
});

class ViewBusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountProgress: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
    };

    this.getAccount = this.getAccount.bind(this);
  }

  componentDidMount() {
    this.getAccount(this);
  }

  componentWillReceiveProps() {
    this.getAccount(this);
  }

  getAccount(e) {
    const { user } = this.context;
    axios.get(`/api/businesses/${user.username}`).then((response) => {
      const jsonObj = qs.parse(qs.stringify(response.data));

      if (response.status === 200) {
        e.setState({
          email: jsonObj.email,
          corpId: jsonObj.corpId,
          password: jsonObj.password,
          confirmPassword: jsonObj.confirmPassword,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName,
          address: jsonObj.address,
          apartment: jsonObj.apartment,
          city: jsonObj.city,
          province: jsonObj.province,
          postalCode: jsonObj.postalCode,
          phoneNumber: jsonObj.phoneNumber,
          organizationName: jsonObj.organizationName,
          orgType: jsonObj.orgType,
          department: jsonObj.department,
          serviceType: jsonObj.serviceType,
          description: jsonObj.description,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;

    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      organizationName, department, orgType, serviceType, description, accountProgress,
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <GridItem>
            <legend> <FormattedMessage id="profile.progress" /> </legend>
            <h6><FormattedMessage id="profile.progressdesc" /></h6>
            <small>
              <br /><i><b><FormattedMessage id="profile.legalwarn" /></b></i>
            </small>
          </GridItem>
          <GridContainer justify="center">
            <GridItem xs={11}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="warning">
                    <PermIdentity />
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      First Name
                      <p><b>{firstName || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      Last Name
                      <p><b>{lastName || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <hr />
                  <b>PERSONAL INFORMATION</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Address
                      <p><b>{address || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Appartment
                      <p><b>{apartment || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      City
                      <p><b>{city || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Povince
                      <p><b>{province || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      PostalCode
                      <p><b>{postalCode}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Phone Number
                      <p><b>{phoneNumber}</b></p>
                    </GridItem>
                  </GridContainer>
                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <br />
                  <hr />
                  <b>About Information</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Organization Name
                      <p><b>{organizationName || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Speaking Level
                      <p><b>{orgType || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Department
                      <p><b>{department || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Department
                      <p><b>{serviceType || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Description
                      <p><b>{description || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </React.Fragment>
    );
  }
}

ViewBusinessProfile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

ViewBusinessProfile.contextType = AuthConsumer;

export default withStyles(styles)(ViewBusinessProfile);
