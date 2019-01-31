import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ServiceSuggestionItem from './ServiceSuggestionItem';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ServiceSuggestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps() {
    this.getData();
  }

  getData() {
    axios.get('/api/services/suggestions')
      .then((response) => {
        this.setState({
          items: response.data,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { items } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.root} elevation={2}>
              {
                items.map(item => (
                  <ServiceSuggestionItem
                    serviceSuggestionId={item._id}
                    serviceTitle={item.serviceTitle}
                    serviceSummary={item.serviceSummary}
                    category={item.category}
                    subcategory={item.subcategory}
                    getData={this.getData}
                  />
                ))
              }
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ServiceSuggestionList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceSuggestionList);
