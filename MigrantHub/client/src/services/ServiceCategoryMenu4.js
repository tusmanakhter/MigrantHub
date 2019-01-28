import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serviceCategories } from 'lib/ServiceCategories';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu, {SubMenu, MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import GridItem from "components/Grid/GridItem.jsx";
import Icon from "@material-ui/core/Icon";
import Button from 'components/CustomButtons/Button';
import Add from "@material-ui/icons/Add";
import CardHeader from "components/Card/CardHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ServiceCategoryItem from 'services/ServiceCategoryItem';
import Card from "components/Card/Card.jsx";
import ServiceCategories from "./ServiceCategoryMenu2";
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    menu: {
        maxWidth: 500,
        zIndex: 1000,
        background: 'white'
},
    submenu: {
        zIndex: 1005,
        background: 'white'
    },
    customCategoryButton: {
        height: 100,
        width: 100
    }
});

const menuStyle = {
    width: 300,
    height: 500,
    overflow: 'auto',
    position: 'absolute',
    zIndex: 1000,
    background: 'white'
};

class ServiceCategoryMenu4 extends Component {
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
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div>
                    <Card style={{ padding: '20px' }}>
                        <CardHeader>
                            <h4>Service Categories</h4>
                        </CardHeader>
                        {this.renderRedirectTo()}
                        <GridContainer direction={'row'} spacing={"16"}>
                            <GridItem>
                                <ServiceCategoryItem
                                    category='All Services'
                                    onClick={() => this.handleCategoryClick('', '')}
                                    color={'primary'}
                                    className={classes.customCategoryButton}
                                />
                            </GridItem>
                            <GridItem >
                                <div className={classes.categoryButton} style={{justifyContent: 'center'}}>
                                    <Menu style={{boxShadow:'none', border: 0, color: "inherit", }}>
                                        <SubMenu itemIcon={<Icon/>} expandIcon={<Icon/>} title={
                                            <GridContainer direction={'column'}>
                                                <GridItem >
                                                    <Button
                                                        variant="contain"
                                                        color="primary"
                                                        aria-label="Select Category"
                                                        size="large"
                                                        justifyContent='center'
                                                        onClick={event => this.handleViewCategories()}
                                                        className={classes.customCategoryButton}
                                                    >
                                                        <Add style={{height: 100, width: 100}}/>
                                                    </Button>
                                                </GridItem>
                                                <GridItem>
                                                    <Typography variant="h5" gutterBottom>
                                                        <FormattedMessage id="categories.select" />
                                                    </Typography>
                                               </GridItem>
                                            </GridContainer>
                                        }>
                                            <Menu style={menuStyle}>
                                                <ServiceCategories />
                                            </Menu>
                                        </SubMenu>
                                    </Menu>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

ServiceCategoryMenu4.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceCategoryMenu4);
