import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { FaGithub, FaRegCopyright } from 'react-icons/fa';

const styles = {
  root: {
    display: 'flex',
    textAlign: 'center',
    background: '#193446',
    color: 'white',
    flexGrow: 1,
    padding: '20px 20px 10px 20px',
    '& a': {
      color: 'white',
      marginRight: 20,
    },
    '& a:hover': {
      color: '#e5e5e5',
    },
    '& h6': {
      marginRight: 15,
    },
  },
  logo: {
    marginLeft: 'auto',
  },
};

const HomeFooter = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" color="inherit" component={Link} to="/">Home</Typography>
      <Typography variant="subtitle2" color="inherit">Privacy Policy</Typography>
      <Typography variant="subtitle2" color="inherit">Faq</Typography>
      <Typography variant="subtitle2" color="inherit">Contact</Typography>
      <Typography variant="subtitle2" color="inherit"><FaRegCopyright className={classes.icon} /> 2019 MigrantHub</Typography>
      <div className={classes.logo}>
        <a href="https://github.com/tusmanakhter/MigrantHub" target="_blank" rel="noopener noreferrer"><FaGithub size="2em"/></a>
      </div>
    </div>
  );
};

HomeFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeFooter);