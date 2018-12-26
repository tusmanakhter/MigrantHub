
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class QuestionnairePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Questions: true,
    };
  }

  render() {
    return (
      <div>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Please answer this uestion so we can recommend services to you!</p>
            <ul>
              
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default QuestionnairePanel;
