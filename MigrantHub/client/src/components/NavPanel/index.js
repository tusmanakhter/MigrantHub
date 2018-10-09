import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class NavPanel extends Component {
    render(props) {
      return (
        <div>
            <Card className="Card-nav-panel">
                <CardContent>
                    <ul>
                        {this.props.navOptions.map( option =>
                        <li><a href={option.link}>{option.description}</a></li>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
      );
    }
  }

  export default NavPanel;