import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { serviceCategories } from '../lib/ServiceCategories';
import Header from '../components/Header/Header';
import { Redirect } from 'react-router-dom';

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

        return (
            <React.Fragment>
                <Header />
                <div>
                    {this.renderRedirectTo()}
                    <Button
                        id='all'
                        size="large"
                        value='all'
                        onClick={() => this.handleCategoryClick('', '')}
                    >
                        All Services
                    </Button>

                    {serviceCategories.map(category => (
                        category.SubCategories? (
                            category.SubCategories.map(subcategory => (
                                <div>
                                    <Button
                                        id={subcategory.value}
                                        size="large"
                                        value={subcategory.value}
                                        onClick={() => this.handleCategoryClick(category.value, subcategory.value)}
                                    >
                                        {category.label}{' : '}{subcategory.label}
                                        </Button>
                                </div>
                            ))):(
                                <div>
                                    <Button
                                        id={category.value}
                                        size="large"
                                        value={category.value}
                                        onClick={() => this.handleCategoryClick(category.value, '')}
                                    >
                                        {category.label}
                                    </Button>
                                    <br></br>
                                </div>
                        )))}
                </div>
            </React.Fragment>
        );
    }
}

ServiceCategories.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};

export default ServiceCategories;
