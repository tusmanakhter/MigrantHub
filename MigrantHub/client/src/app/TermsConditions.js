import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  content: {
    textAlign: 'center',
  },
});

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Terms and Conditions
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <div className={classes.content}></div>
          <DialogTitle id="alert-dialog-title">{"Using MigrantHub?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <b>Terms and Conditions</b><br/>
            <p>In using this website you are deemed to have read and agreed to the
              following terms and conditions:
              The following terminology applies to these Terms and Conditions, Privacy
              Statement and Disclaimer Notice and any or all Agreements: "Client", “You”
              and “Your” refers to you, the person accessing this website and accepting the
              Company’s terms and conditions. "The Company", “Ourselves”, “We” and
              "Us", refers to our Company. “Party”, “Parties”, or “Us”, refers to both the
              Client and ourselves, or either the Client or ourselves. All terms refer to the
              offer, acceptance and consideration of payment necessary to undertake the
              process of our assistance to the Client in the most appropriate manner,
              whether by formal meetings of a fixed duration, or any other means, for the
              express purpose of meeting the Client’s needs in respect of provision of the
              Company’s stated services/products, in accordance with and subject to,
              prevailing Canadian Law. Any use of the above terminology or other words in
              the singular, plural, capitalisation and/or he/she or they, are taken as
              interchangeable and therefore as referring to same.
            </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(injectIntl(AlertDialog));
