import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { serviceCategories } from 'lib/ServiceCategories';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
const styles = {
  card: {
    width: 150,
    height: 120,
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
          <p>Select a category that you are looking for</p>
        </div>
        <Grid container className={classes.root} spacing={40}>
        {this.renderRedirectTo()}
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={40}
            >
              {serviceCategories.map(category => (
                <Grid key={category.id} item>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <Card 
                  className={classes.card}
                  onClick={() => this.handleCategoryClick(category.value, '')}
                  >

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