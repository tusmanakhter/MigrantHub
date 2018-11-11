import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const NavPanel = (props) => {
  const { navOptions } = props;
  return (
    <div>
      <Card className="Card-nav-panel">
        <CardContent>
          <p>Navigation:</p>
          <ul>
            {navOptions.map(option => <li><a href={option.link}>{option.description}</a></li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

NavPanel.propTypes = {
  navOptions: PropTypes.shape({}).isRequired,
};
export default NavPanel;
