import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import SignUpMigrant from './personal/SignUpMigrant';
import SignUpMerchant from './business/SignUpMerchant';
import Error from "../components/Error";
import Home from "../home/HomePage";

class AccountTypeMenu extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to="/"> Home </NavLink></li>
                    <li><NavLink to="/UserAccount"> Create personal account </NavLink></li>
                    <li><NavLink to="/BusinessAccount"> Create a business account </NavLink></li>
                </ul>
            </div>
        )
    }
}
export default AccountTypeMenu;