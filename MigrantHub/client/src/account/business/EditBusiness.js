import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ContactInfo from 'account/common/ContactInfo';
import AboutInfo from 'account/business/AboutInfo';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { handleChange } from 'helpers/Forms';
import { AuthConsumer } from 'routes/AuthContext';
import qs from 'qs';
import { toast } from 'react-toastify';

const styles = theme => ({
  layout: {
    background: 'white',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  item: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class EditBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    this.getAccount();
  }

  componentWillReceiveProps() {
    this.getAccount();
  }

  getAccount = () => {
    const { user } = this.context;
    this.setState({ isLoading: true });
    axios.get(`/api/businesses/${user.username}`).then((response) => {
      if (response.status === 200) {
        const businessInfo = qs.parse(qs.stringify(response.data));
        this.setState({
          ...businessInfo,
          isLoading: false,
        });
      }
    });
  }

  validate = async () => {
    const contactError = await this.contactChild.current._wrappedInstance.validate();
    const aboutError = await this.aboutChild.current._wrappedInstance.validate();

    const errors = [contactError, aboutError];
    if (errors.indexOf(true) > -1) {
      return true;
    }
    return false;
  }

  updateAccount = async () => {
    const error = await this.validate();
    if (error) {
      return;
    }

    const { user } = this.context;
    this.setState({ isLoading: true });
    const {
      firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = this.state;

    axios.put(`/api/businesses/${user.username}`,
      qs.stringify({
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
      toast.success(response.data);
      this.setState({ isLoading: false });
    }).catch((e) => {
      toast.error(e.response.data);
    });
  }

  render() {
    const {
      firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description, alert, isLoading,
    } = this.state;
    const { user } = this.context;
    const { classes } = this.props;

    return (
      <Paper className={classes.layout}>
        {alert}
        <Typography
          className={classes.title}
          align="left"
          color="textSecondary"
          variant="h5"
          gutterBottom
        >
          Edit Your Business Profile
        </Typography>
        {isLoading
          ? (
            <div>
              <CircularProgress className={classes.progress} />
            </div>
          )
          : (
        <>
          <div className={classes.item}>
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
              user={user}
            />
          </div>
          <div className={classes.item}>
            <AboutInfo
              innerRef={this.aboutChild}
              handleChange={this.handleChange}
              organizationName={organizationName}
              orgType={orgType}
              department={department}
              serviceType={serviceType}
              description={description}
            />
          </div>
          <div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={this.updateAccount}
            >
              Save
            </Button>
          </div>
        </>
          )}
      </Paper>
    );
  }
}


EditBusiness.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

EditBusiness.contextType = AuthConsumer;

export default withStyles(styles)(EditBusiness);
