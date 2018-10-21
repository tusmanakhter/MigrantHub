import React, { Component } from 'react';
import HomeLayout from './HomeLayout'
class HomePage extends Component {
  render() {
    return (
      <HomeLayout>
        <div className="HomePage">
          <h1>Welcome to MigrantHub</h1>
        </div>
      </HomeLayout>
    );
  }
}

export default HomePage;
