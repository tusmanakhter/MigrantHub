import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AccountTypeMenu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><NavLink to="/"> Home </NavLink></li>
          <li><NavLink to="/UserAccount"> Create personal account </NavLink></li>
          <li><NavLink to="/BusinessAccount"> Create a business account </NavLink></li>
          <li><NavLink to="/Login">LogIn</NavLink></li>
        </ul>
      </div>
    )
  }
}
export default AccountTypeMenu;