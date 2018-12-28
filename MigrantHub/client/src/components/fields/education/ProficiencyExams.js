import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { proficiencyExaminations } from '../../../lib/SignUpConstants';

const styles = ({
  formControl: {
    textAlign: 'left',
  },
  group: {
    flexDirection: 'row',
  },
});

const ProficiencyExams = (props) => {
  const {
    classes, proficiencyExams, handleChange,
  } = props;

  return (
    <FormControl component="fieldset" fullWidth className={classes.formControl}>
      <FormLabel component="legend">Proficiency Exams</FormLabel>
      <FormGroup className={classes.group} name="proficiencyExams">
        {proficiencyExaminations.map(option => (
          <FormControlLabel
            key={option.value}
            control={(
              <Checkbox
                name={option.value}
                checked={proficiencyExams[option.value]}
                onChange={handleChange('proficiencyExams', option.value)}
              />
            )}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

ProficiencyExams.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  proficiencyExams: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProficiencyExams);
