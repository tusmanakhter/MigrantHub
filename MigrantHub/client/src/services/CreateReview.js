import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import axios from 'axios';
import qs from 'qs';
import withStyles from "@material-ui/core/styles/withStyles";
import { AuthConsumer } from 'routes/AuthContext';
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { toast } from 'react-toastify';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import StarRatingComponent from 'react-star-rating-component';
import ServiceCard from 'services/ServiceCard';

const styles = {
};

class CreateReview extends Component {
    constructor(props) {
        super(props);
        this.validator = new FormValidator(Validations.reviewPost);
        this.state = {
            serviceId: props.match.params.id,
            serviceItem: {},
            reviewItem: {},
            rating: 1,
            reviewTitle: '',
            comment: '',
            postLoading: false,
            redirect: false,
            redirectToURL: false,
            validation: this.validator.valid(),
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount(props) {
        this.getData(props);
    }

    componentWillReceiveProps(props) {
        this.getData(props);
    }

    getData(props) {
        axios.get('/api/services/' + this.state.serviceId, {
            params: {
                _id: this.state.serviceId,
            },
        }).then((response) => {
            const parsedObj = qs.parse(qs.stringify(response.data));
            this.setState({
                serviceItem: parsedObj,
            });
            axios.get('/api/services/' + this.state.serviceId + '/reviews/review', {
                params: {
                    _id: this.state.serviceId,
                },
            }).then((response2) => {
                this.setState({
                    reviewItem: response2.data,
                });
            });
        });
    }

    validate = () => {
        const validation = this.validator.validate(this.state);
        this.setState(prevState => ({
            validation: {
                ...prevState.validation,
                ...validation,
            },
        }));

        return validation.isValid;
    };

    handleStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handlePostReview = async () => {
        try {
            const result = await axios.post('/api/services/' + this.state.serviceId + '/reviews/', qs.stringify({
                serviceId: this.state.serviceId,
                rating: this.state.rating,
                comment: this.state.comment,
                title: this.state.reviewTitle
            }));
            if (result.status === 200) {
                toast.success('Review Posted.');
                this.getData(this.props);
                this.setState({
                    redirect: true,
                    redirectToURL: '/services/' + this.state.serviceId,
                });
            }
            return false;
        } catch (e) {
            toast.error('Error posting review.');
            return true;
        }
    }

    handlePost = async () => {
        const isValid = await this.validate();

        if (isValid) {
            this.setState({
                postLoading: true,
            });
            await this.handlePostReview();

            this.setState({
                postLoading: false,
            });
        }
    };

    render() {
        const {
            classes,
        } = this.props;
        const {
            serviceId, serviceItem, reviewItem, reviewTitle, comment, redirect, redirectToURL, validation, postLoading, rating
        } = this.state;
        let icon = { 'calendar-plus-o': 'left'};

        if (redirect) {
            this.setState({
                redirect: false,
                redirectToURL: '',
            });
            return (
                <Redirect to={{
                    pathname: redirectToURL,
                }}
                />
            );
        }

        let postReviewButtonMessage;
        if (postLoading) {
            postReviewButtonMessage = (
                <>
                <CircularProgress size={30} color="inherit" />
                </>
            );
        } else {
            postReviewButtonMessage = (
                <>
                Post Review
                </>
            );
        }

        return (
            <AuthConsumer>
                {({ user }) => (
                    <div>
                        <Grid container alignItems="center" justify="center" spacing={8}>
                            <GridItem lg={10} md={10} sm={12} xs={12} align='center'>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            <h4><b>Create Review</b></h4>
                                        </CardIcon>
                                    </CardHeader>
                                    <CardBody>
                                        <Grid container alignItems="center" justify="center" spacing={8}>
                                            <GridItem >
                                                <ServiceCard
                                                    serviceId={serviceItem._id}
                                                    serviceTitle={serviceItem.serviceTitle}
                                                    serviceImagePath={serviceItem.serviceImagePath}
                                                    category={serviceItem.category}
                                                    subcategory={serviceItem.subcategory}
                                                    serviceLocation={serviceItem.location}
                                                    rating={serviceItem.avgRating}
                                                    count={serviceItem.countRating}
                                                />
                                            </GridItem>
                                            <GridItem lg={6} md={6} sm={12} xs={12} align='left'>
                                                <Grid container spacing={8}>
                                                    <GridItem lg={4} md={4} sm={12} xs={12} align='left'>
                                                        <br></br>
                                                        <StarRatingComponent
                                                            name="reviewRate"
                                                            starCount={5}
                                                            value={rating}
                                                            onStarClick={this.handleStarClick.bind(this)}
                                                        />
                                                    </GridItem>
                                                    <GridItem lg={8} md={8} sm={12} xs={12} align='left'>
                                                        <TextField
                                                            id="reviewTitle"
                                                            name="reviewTitle"
                                                            label="Review Title (Optional)"
                                                            value={reviewTitle}
                                                            onChange={event => this.handleChange(event)}
                                                            fullWidth
                                                        />
                                                    </GridItem>
                                                    <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                                        <TextField
                                                            id="comment"
                                                            name="comment"
                                                            label="Comment"
                                                            value={comment}
                                                            onChange={event => this.handleChange(event)}
                                                            fullWidth
                                                            helperText={validation.comment.message}
                                                            error={validation.comment.message.length > 0}
                                                            multiline
                                                            rows="2"
                                                        />
                                                    </GridItem>
                                                    <GridItem lg={4} md={4} sm={12} xs={12} align='left'>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            component={props => <Link to={`/services/${serviceId}`} {...props} />}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </GridItem>
                                                    {reviewItem.user == undefined ?
                                                        <GridItem lg={4} md={4} sm={12} xs={12} align='left'>
                                                            <Button
                                                                type="submit"
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={this.handlePost}
                                                                className={classes.btn}
                                                            >
                                                                {postReviewButtonMessage}
                                                            </Button>
                                                        </GridItem>
                                                        : ''}
                                                </Grid>
                                            </GridItem>
                                        </Grid>

                                    </CardBody>
                                </Card>
                            </GridItem>
                        </Grid>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}

export default withStyles(styles)(CreateReview);