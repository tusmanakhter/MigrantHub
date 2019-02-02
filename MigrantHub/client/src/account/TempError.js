import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// @material-ui/icons
import ListAlt from "@material-ui/icons/ListAlt";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Group from "@material-ui/icons/Group";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class TempError extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <h3><font color="gray">Login unsuccesful</font></h3>
                    <h5><font>Please try again or create an account if you haven't already</font></h5>
                    <Link to={`/login`}>
                      <Button round color="warning" simple variant="contained">
                        Try Again
                      </Button>
                    </Link>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Service Hub"
                      description="A free list of available services near you. A chat bot that will help you find what you need."
                      icon={ListAlt}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Event Hub"
                      description="Create an event or view a list of events happening near you."
                      icon={CalendarToday}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Connect Hub"
                      description="A built in social media platform that will help you connect with other users."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment >
    );
  }
}

export default TempError;
