import React, { Component } from 'react';
import {
  Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'mdbreact';

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
    }));
  }

  render() {
    const { isWideEnough, collapse } = this.state;

    return (
      <React.Fragment>
        <Navbar color="indigo" dark expand="md" scrolling>
          <NavbarBrand href="/">
            <strong>MigrantHub</strong>
          </NavbarBrand>
          { !isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={collapse} navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>Sign Up</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><NavLink to="/signup/user" style={{ color: 'black' }}>User</NavLink></DropdownItem>
                    <DropdownItem><NavLink to="/signup/business" style={{ color: 'black' }}>Business</NavLink></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <NavLink to="/login">LogIn</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        {/* <ul>
          <li><NavLink to="/signup/user"> Create personal account </NavLink></li>
          <li><NavLink to="/signup/business"> Create a business account </NavLink></li>
          <li><NavLink to="/login">LogIn</NavLink></li>
        </ul> */}
      </React.Fragment>
    );
  }
}

export default HomeHeader;
