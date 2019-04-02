import React from 'react';
// @material-ui/icons
import { Link } from 'react-router-dom';
// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';

const Error = () => (
  <div>
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5}>
                <h3><font color="gray">Oops!</font></h3>
                <h5><b>404 - PAGE NOT FOUND</b></h5>
                <h7><font>The page you are looking for might have been removed,<br /> had its name changed or temporaily unavailable <br /></font></h7>
                <Link to="/main">
                  <Button round color="warning" simple variant="contained">
                    Bring me back
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  </div>
);

export default Error;
