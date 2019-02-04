import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ContactInfo from 'account/common/ContactInfo';
import AboutInfo from 'account/business/AboutInfo';

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

import { handleChange } from 'helpers/Forms';
import { AuthConsumer } from 'routes/AuthContext';

const qs = require('qs');

const styles = ({
  select: {
    textAlign: 'left',
  },
  mainContainer: {
    marginLeft: 75,
  },
});

class EditBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.contactChild = React.createRef();
    this.aboutChild = React.createRef();

    this.getAccount = this.getAccount.bind(this);
    this.handleChange = handleChange.bind(this);
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

  handleSave = async () => {
    const error = await this.validate();

    if (!error) {
      this.updateAccount(this);
    }
  };

  validate = async () => {
    const contactError = await this.contactChild.current._wrappedInstance.validate();
    const aboutError = await this.aboutChild.current._wrappedInstance.validate();

    const errors = [contactError, aboutError];
    if (errors.indexOf(true) > -1) {
      return true;
    }
    return false;
  }

  updateAccount() {
    const {
      email, password, confirmPassword, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = this.state;
    axios.put(`/api/businesses/${email}`,
      qs.stringify({
        email,
        corpId,
        password,
        confirmPassword,
        firstName,
        lastName,
        address,
        apartment,
        city,
        province,
        postalCode,
        phoneNumber,
        organizationName,
        orgType,
        department,
        serviceType,
        description,

      })).then((response) => {
      this.setState({
        messageFromServer: response.data,
      });
    });
  }

  render() {
    const { classes } = this.props;

    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      organizationName, department, orgType, serviceType, description,
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.mainContainer}>
          <ContactInfo
            innerRef={this.contactChild}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            address={address}
            apartment={apartment}
            city={city}
            province={province}
            postalCode={postalCode}
            phoneNumber={phoneNumber}
          />
          <AboutInfo
            innerRef={this.aboutChild}
            handleChange={this.handleChange}
            organizationName={organizationName}
            orgType={orgType}
            department={department}
            serviceType={serviceType}
            description={description}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSave}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

EditBusiness.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

EditBusiness.contextType = AuthConsumer;

export default withStyles(styles)(EditBusiness);
