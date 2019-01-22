import React, { Component } from "react";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField } from '@material-ui/core';

class Chatbot extends Component {

  render() {
    return (
      < div >
        <GridItem>
          <Card>
            <CardHeader>
              <h4>Chatbot</h4>
              <hr />
            </CardHeader>
            <CardBody>
              Hi I am a bot!
              <TextField
                id="username"
                name="username"
                label="Ask me a question!"
                fullWidth
              />
            </CardBody>
          </Card>
        </GridItem>
      </div >
    )
  }

}

export default (Chatbot);
