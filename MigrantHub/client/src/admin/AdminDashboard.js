import React, { Component } from 'react';
import { Navbar, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import '../App.css';
import Logout from '../components/Logout';
import { Route } from 'react-router-dom';
import CurrentAdmins from './CurrentAdmins';
import RejectedAdmins from './RejectedAdmins';
import DeletedAdmins from './DeletedAdmins';
import UnapprovedAdmins from './UnapprovedAdmins';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        collapse: false,
        isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
      this.setState({
          collapse: !this.state.collapse,
      });
  }

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Navbar color="indigo" dark expand="md" scrolling>
          { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
          <Collapse isOpen = { this.state.collapse } navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink to="/admin/dashboard">Home</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                    <DropdownToggle nav caret>Admins</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><NavLink to={`${match.url}/admins`} style={{color:'black'}}>Current</NavLink></DropdownItem>
                        <DropdownItem><NavLink to={`${match.url}/admins/deleted`} style={{color:'black'}}>Deleted</NavLink></DropdownItem>
                        <DropdownItem><NavLink to={`${match.url}/admins/rejected`} style={{color:'black'}}>Rejected</NavLink></DropdownItem>
                        <DropdownItem><NavLink to={`${match.url}/admins/unapproved`} style={{color:'black'}}>Unapproved</NavLink></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        <Logout />
        <Route path={`${match.url}/admins`} component={CurrentAdmins} exact />
        <Route path={`${match.url}/admins/deleted`} component={DeletedAdmins} exact />
        <Route path={`${match.url}/admins/rejected`} component={RejectedAdmins} exact />
        <Route path={`${match.url}/admins/unapproved`} component={UnapprovedAdmins} exact />
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
