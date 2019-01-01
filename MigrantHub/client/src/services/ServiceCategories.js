import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serviceCategories } from 'lib/ServiceCategories';
import Header from 'components/Header/Header';
import { Redirect } from 'react-router-dom';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ServiceCategoryItem from 'services/ServiceCategoryItem';
import {
    Navbar, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem,
} from 'mdbreact';
class ServiceCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: false,
            redirectToURL: '',
            redirectState: {},
        };
    }

    renderRedirectTo = () =>{
        const { redirectTo, redirectToURL, redirectState } = this.state;
        if (redirectTo) {
            this.setState({
                redirectTo: false,
                redirectToURL: '',
            });
            return (
                <Redirect to={{
                    pathname: redirectToURL,
                    state: redirectState,
                }}
                />
            );
        }
    }

    handleCategoryClick(category, subcategory){
        console.log(category);
        let selectedCategory = category;
        this.setState({
            redirectTo: true,
            redirectToURL: '/services',
            redirectState: {
                category: selectedCategory,
                subcategory: subcategory
            },
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div>
                    <Card style={{ padding: '20px' }}>
                        <CardHeader>
                            <h4 className={classes.cardTitle}>Category</h4>
                        </CardHeader>
                        <GridContainer>
                    {this.renderRedirectTo()}

                    <GridItem xs={12} sm={6} md={2}>
                        <ServiceCategoryItem
                            category='All Services'
                            onClick={() => this.handleCategoryClick('', '')}
                            color={'success'}
                        />
                    </GridItem>
                    {serviceCategories.map(category => (
                        category.SubCategories? (
                            <GridItem xs={12} sm={6} md={2}>
                                <Dropdown>
                                    <DropdownToggle nav caret>
                                        <ServiceCategoryItem
                                            category={category.label}
                                            color={'success'}
                                            size={category.SubCategories.length}
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {category.SubCategories.map(subcategory => (
                                            <DropdownItem>
                                                <ServiceCategoryItem
                                                    category={subcategory.label}
                                                    onClick={() => this.handleCategoryClick(category.value, subcategory.value)}
                                                    color={'info'}
                                                />
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </GridItem>
                        ):(
                            <GridItem xs={12} sm={6} md={2}>
                                <ServiceCategoryItem
                                    category={category.label}
                                    handleClick={() => this.handleCategoryClick(category.value, '')}
                                    color={'success'}
                                />
                            </GridItem>
                        )))}
                        </GridContainer>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

ServiceCategories.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};

export default ServiceCategories;
