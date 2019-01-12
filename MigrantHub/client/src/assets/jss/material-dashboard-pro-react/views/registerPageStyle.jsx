// ##############################
// // // RegisterPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";
import Background from "../../../img/login.jpeg";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  register: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${Background})`,
    backgroundColor: 'black',
    backgroundSize: 'cover',
  },
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
    // paddingTop: "23vh"
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    padding: "40px 0px",
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    padding: "0 20px",
    position: "relative"
  },
  socialTitle: {
    fontSize: "18px"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  customFormControlClasses: {
    margin: "0 12px"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    color: "rgba(0, 0, 0, 0.26)"
  }
};

export default registerPageStyle;
