import React from 'react';
import PropTypes from 'prop-types';
import HomeHeader from './HomeHeader';

const HomeLayout = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <HomeHeader />
      { children }
    </React.Fragment>
  );
};
HomeLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
export default HomeLayout;
