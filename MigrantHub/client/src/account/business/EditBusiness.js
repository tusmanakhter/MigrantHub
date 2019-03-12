import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import ContactInfo from 'account/common/ContactInfo';
import AboutInfo from 'account/business/AboutInfo';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from 'components/CustomButtons/Button.jsx';

import { handleChange } from 'helpers/Forms';
import { AuthConsumer } from 'routes/AuthContext';

const qs = require('qs');

const styles = ({
  select: {
    textAlign: 'left',
  },
  mainContainer: {
  },
});

class EditBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
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
    this.hideAlert = this.hideAlert.bind(this);
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

  titleAndTextAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: 'block', marginTop: '-100px' }}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            `${this.props.classes.button} ${this.props.classes.info}`
          }
        >
          Update Successful
        </SweetAlert>
      ),
    });
    this.handleSave();
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  updateAccount() {
    const {
      email, password, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = this.state;
    axios.put(`/api/businesses/${email}`,
      qs.stringify({
        email,
        corpId,
        password,
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
        {this.state.alert}
        <div className={classes.mainContainer}>
          <GridContainer justify="center">
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <div className={classes.center}>
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
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <AboutInfo
                    innerRef={this.aboutChild}
                    handleChange={this.handleChange}
                    organizationName={organizationName}
                    orgType={orgType}
                    department={department}
                    serviceType={serviceType}
                    description={description}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <div className={classes.center}>
                    <h5>Save your changes</h5>
                    <Button
                      color="warning"
                      onClick={this.titleAndTextAlert.bind(this)}
                    >
                      Update
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

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
