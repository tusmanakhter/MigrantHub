import React, { Component } from 'react';

class NavPanel extends Component {
    render(props) {
      return (
        <div>
          <ul>
            {this.props.navOptions.map( option =>
              <li><a href={option.link}>{option.description}</a></li>
            )}
          </ul>
        </div>
      );
    }
  }

  export default NavPanel;