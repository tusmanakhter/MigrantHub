import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';

const urlForIdValidation = corporationId => `https://cors-anywhere.herokuapp.com/https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/api/corporations/${corporationId}.json?lang=eng`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class IdApi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      items: [],
      isLoaded: false,
      loading: false,
      isValidId: false,
    }
  }

  updateView() {
    //resets states asynchronously upon click
    this.setState({
      requestFailed: false,
      items: [],
      isLoaded: false,
      loading: true,
    });
    fetch(urlForIdValidation(this.props.corporationId))
      .then(response => {
        if (!response.ok) {
          throw Error("RESQUEST FAIL")
        }
        this.setState({
          loading: true,
          isLoaded: false,
        })
        return response;
      })
      .then(res => res.json(),
        () => {
          throw Error("INVALID LINK")
          this.setState({
            requestFailed: true,
            loading: true
          })
        })
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          loading: false,
        })
      }, () => {
        throw Error("INVALID FORMAT")
        this.setState({
          requestFailed: true,
          loading: false,
        })
      });
    console.log('Verifying business ID');

  }


  componentDidUpdate(prevProps, nextProps) {
    if (this.props.corporationId !== prevProps.corporationId) {
      this.setState({
        requestFailed: false,
        items: [],
        isLoaded: false,
        loading: false,
        isValidId: false,
      });
    }
    // if (!nextProps.items) {
    //   console.log(nextProps.items);
    //   if (nextProps.items[0]) {
    //     console.log("INSIDE SET 2");
    //     var firstEntry = String(prevProps.items[0]);
    //     var firstEntryError = "could not find corporation " + prevProps.corporationId;
    //     if (!(firstEntry === firstEntryError)) {
    //       console.log("SETTING");
    //       this.setState({
    //         isValidId: true,
    //       })
    //       console.log(this.state.isValidId);
    //     }
    //   }
    // }
  }

  // setValidateID = () => {
  //   console.log("VALIDATE CALLED");
  //   if (this.state.items[0].corporationId == this.props.corporationId) {
  //     this.setState({
  //       isValidId: true,
  //     })
  //   }
  // }

  render() {
    var { isLoaded, items, loading } = this.state;
    if (loading) {
      return (
        <div>
          <br />
          <CircularProgress />
          <br />
          <p>Please wait while we verify your ID</p>
        </div>
      )
    }
    var firstEntry = String(items[0]);
    var firstEntryError = "could not find corporation " + this.props.corporationId;

    if (firstEntry === firstEntryError) {
      return (
        <div>
          <p>Invalid ID</p>
          <Button variants="contained" color="secondary" onClick={this.updateView.bind(this)}> Validate </Button>
        </div>
      )
    }
    else if (isLoaded) {
      return (
        <div>
          <p> Your Corporate ID <strong>{items[0].corporationId}</strong> is recognized by the Government Of Canada  <Checkbox disabled checked value="checkedE" /> </p>
          <br /><Button variants="contained" color="primary"> You May Proceed </Button>
        </div >
      )
    }
    else {
      return (
        <div>
          <p>Please enter a valid ID</p>
          <Button variants="contained" color="secondary" onClick={this.updateView.bind(this)}> Validate </Button>
        </div>
      )
    }
  };

}

IdApi.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IdApi);