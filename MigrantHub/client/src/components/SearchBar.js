import React from "react";
//import "../assets/css/searchBar.css";
import Search from "@material-ui/icons/Search";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from "components/Card/Card.jsx";

const styles = theme => ({
    card: {
            maxWidth: 100,
            padding: 20,
        },
    media: {
        paddingTop: '0%', // 16:9,
        maxWidth:200,
        },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class SearchBar extends React.Component {
  render() {
    return (
        <div>
        <Card style={{ padding:'20px'}}>
            <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
                <span className="input-group-text green" id="basic-text1" >
                <Search className="text-white" icon="search"  />
                </span>
            </div>
            <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
            </div>
        </Card>
        </div>
    );
  }
}

export default withStyles(styles)(SearchBar);