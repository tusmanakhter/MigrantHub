import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { serviceCategories } from 'lib/ServiceCategories';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  getCategoryIcon,
} from 'helpers/Category';

const styles = {
  card: {
    width: 140,
    height: 115,
    padding: 10,
  },
};

class ServiceCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
    };
  }

  renderRedirectTo = () => {
    const { redirectTo, redirectToURL, redirectState } = this.state;
    if (redirectTo) {
      this.setState({
        redirectTo: false,
        redirectToURL: '',
      });
      return (
        <Redirect to={{
          pathname: redirectToURL,
          state: redirectState,
        }}
        />
      );
    }
  }

  handleCategoryClick(category, subcategory) {
    const selectedCategory = category;
    this.setState({
      redirectTo: true,
      redirectToURL: '/services',
      redirectState: {
        category: selectedCategory,
        subcategory,
      },
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div>
          <h1>Service Categories</h1>
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <Grid
                container
                className={classes.demo}
                justify="center"
                spacing={8}
              >
                <Grid item data-tut="reactour__selectAllServices">
                  <CardActionArea>
                    <Card
                      className={classes.card}
                      onClick={() => this.handleCategoryClick('', '')}
                    >
                      <i className="fas fa-list fa-2x" />
                      <CardContent>
                        <Typography component="p"><b>ALL SERVICES</b></Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <p>OR</p>
          <p>Select a category that you are looking for</p>
        </div>
        <Grid container className={classes.root} spacing={8}>
          {this.renderRedirectTo()}
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={8}
            >
              {serviceCategories.map(category => (
                <Grid key={category.id} item>
                  <CardActionArea>
                    <Card
                      className={classes.card}
                      onClick={() => this.handleCategoryClick(category.value, '')}
                    >
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                      {getCategoryIcon(category.value) ? (getCategoryIcon(category.value)) : (console.log('none'))}
                      <CardContent>
                        <Typography component="p">{category.label}</Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ServiceCategoryList.defaultProps = {
  classes: {},
};

ServiceCategoryList.propTypes = {
  classes: PropTypes.shape({}),
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceCategoryList);
