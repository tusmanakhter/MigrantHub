import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import validator from 'validator';
import { objectErrorText } from 'helpers/Object';
import { familyObject } from 'lib/SignUpConstants';
import Age from 'components/fields/personal/Age';
import RelationshipStatus from 'components/fields/personal/RelationshipStatus';
import Relation from 'components/fields/family/Relation';
import Gender from 'components/fields/personal/Gender';
import Divider from '@material-ui/core/Divider';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = theme => ({
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      padding: theme.spacing.unit * 3,
    },
    layout: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
});
class FamilyInfo extends Component {
  constructor(props) {
    super(props);
    this.objectErrorText = objectErrorText.bind(this);
  }

  state = {
    familyError: [],
  }

  validate = () => {
    const { family, intl } = this.props;
    let isError = false;
    const errors = {
      familyError: [],
    };

    family.forEach((member, index) => {
      errors.familyError = errors.familyError.concat([JSON.parse(JSON.stringify(familyObject))]);

      if (validator.isEmpty(member.age)) {
        errors.familyError[index].age = `${intl.formatMessage({ id: 'personal.age' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }

      if (validator.isEmpty(member.gender)) {
        errors.familyError[index].gender = `${intl.formatMessage({ id: 'personal.gender' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }

      if (validator.isEmpty(member.relationshipStatus)) {
        errors.familyError[index].relationshipStatus = `${intl.formatMessage({ id: 'personal.relationship' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }

      if (validator.isEmpty(member.relation)) {
        errors.familyError[index].relation = `${intl.formatMessage({ id: 'family.relation' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }
    });

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      classes, handleAddObject, handleRemoveObject, handleEditObject, family,
    } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.familyinfo" />
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom className={classes.row}>
              <FormattedMessage id="signup.family.addfam" />
              <Fab
                size="small"
                aria-label="Add"
                color="primary"
                onClick={() => handleAddObject('family', familyObject)}
                className={classes.button}
              >
                <AddIcon />
              </Fab>
            </Typography>
          </Grid>
          {family.map((member, index) => (
            <Grid item xs={12}>
              <Paper elevation={4} className={classes.paper}>
                <Grid container justify="space-between" alignItems="center" style={{ paddingBottom: 10 }}>
                  <Typography variant="subtitle1" align="left" gutterBottom className={classes.row}>
                    <FormattedMessage id="signup.family.member" />
                    {' '}
                    {index + 1}
                  </Typography>
                  <Fab
                    size="small"
                    aria-label="Delete"
                    color="secondary"
                    onClick={event => handleRemoveObject('family', index, event)}
                    className={classes.button}
                    styles={{ marginTop: 0 }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={4}>
                    <Age
                      age={member.age}
                      ageError={this.objectErrorText('familyError', index, 'age')}
                      handleChange={handleEditObject('family', index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <RelationshipStatus
                      relationshipStatus={member.relationshipStatus}
                      relationshipStatusError={this.objectErrorText('familyError', index, 'relationshipStatus')}
                      handleChange={handleEditObject('family', index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Relation
                      relation={member.relation}
                      relationError={this.objectErrorText('familyError', index, 'relation')}
                      handleChange={handleEditObject('family', index)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Gender
                      gender={member.gender}
                      genderError={this.objectErrorText('familyError', index, 'gender')}
                      handleChange={handleEditObject('family', index)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

FamilyInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleAddObject: PropTypes.func.isRequired,
  handleRemoveObject: PropTypes.func.isRequired,
  handleEditObject: PropTypes.func.isRequired,
  family: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(FamilyInfo, { withRef: true }));
