import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Folder from '@material-ui/icons/Folder';
import Pages from '@material-ui/icons/Pages';
import Button from '@material-ui/core/Button';

const ServiceCategoryItem = (props) => {
  const {
    category, handleClick, color, size,
  } = props;
  return (
    <Card>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>
          <Folder />
        </CardIcon>
        <Button
          id={category}
          value={category}
          onClick={handleClick}
        >
          {category}
        </Button>
      </CardHeader>
      <CardFooter stats>
        <div>
          <Pages />
          {size || '0'} {' subcategories'}
        </div>
      </CardFooter>
    </Card>
  );
};

ServiceCategoryItem.defaultProps = {
  size: '0',
};

ServiceCategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default ServiceCategoryItem;
