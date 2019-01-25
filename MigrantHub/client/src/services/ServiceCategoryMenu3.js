import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serviceCategories } from 'lib/ServiceCategories';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const styles = theme => ({
    ...extendedFormsStyle,
});

class ServiceCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            subcategory: '',
        };
    }

    handleCategoryClick(category, subcategory){
        let selectedCategory = category;
        this.setState({
            category: selectedCategory,
            subcategory: subcategory
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CustomDropdown
                    ref="multi"
                    hoverColor="info"
                    buttonText="Categories"
                    buttonProps={{
                        simple: true
                    }}
                    dropdownList={serviceCategories.map(category => (
                        category.SubCategories ? (
                            <CustomDropdown
                                ref="multi"
                                innerDropDown
                                hoverColor="info"
                                buttonText={category.label}
                                buttonProps={{
                                    simple: true
                                }}
                                dropPlacement="right-start"
                                dropdownList={category.SubCategories.map(subcategory => (
                                    <div
                                        onClick={() => this.handleCategoryClick(category.value, subcategory.value)}>
                                        {subcategory.label}
                                    </div>
                                ))}
                            />
                        ) : (
                            <div
                                onClick={() => this.handleCategoryClick(category.value, '')}>
                                {category.label}
                            </div>
                        )))}
                />
            </React.Fragment>
        );
    }
}

ServiceCategories.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceCategories);