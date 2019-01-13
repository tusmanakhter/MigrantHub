/* global google */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle, withStateHandlers  } from 'recompose';
import {
    withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer,
} from 'react-google-maps';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const GoogleMapWithMarker = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        originLat: 45.5017,
        originLng: -73.5673,
        isMarkerShown: false,
        dataRetrieved: false,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount(props = this.props) {
           this.updateMap(props);
        },
        componentWillReceiveProps(props = this.props){
            this.updateMap(props);
        },
        updateMap(props) {
            const geocoder = new google.maps.Geocoder();
            const { location } = props;

            geocoder.geocode({
                address:
                    `${location.address} ${
                        location.apartment}, ${
                        location.city}, ${
                        location.province} ${
                        location.postalCode}`,
            }, (results1, status1) => {
                if (status1 === 'OK') {
                    this.setState({
                        originLat: results1[0].geometry.location.lat(),
                        originLng: results1[0].geometry.location.lng(),
                        isMarkerShown: true,
                    });
                    this.getUserLocation(props);
                }
            });
        },
        getUserLocation(props){
            const { directionType } = props;

            axios.get('/api/accounts/get/user').then((response) => {
                if (response.status === 200) {
                    let userLocation = {
                        address: response.data.address,
                        apartment: response.data.apartment,
                        city: response.data.city,
                        province: response.data.province,
                        postalCode: response.data.postalCode,
                    };

                    this.setState({
                        userLocation: userLocation,
                    });

                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        address:
                            `${userLocation.address} ${
                                userLocation.apartment}, ${
                                userLocation.city}, ${
                                userLocation.province} ${
                                userLocation.postalCode}`,
                    }, (results2, status2) => {
                        if (status2 === 'OK') {
                            this.setState({
                                destinationLat: results2[0].geometry.location.lat(),
                                destinationLng: results2[0].geometry.location.lng(),
                            });
                            const DirectionsService = new google.maps.DirectionsService();

                            DirectionsService.route({
                                origin: new google.maps.LatLng(this.state.originLat, this.state.originLng),
                                destination: new google.maps.LatLng(this.state.destinationLat, this.state.destinationLng),
                                travelMode: directionType,
                            }, (result3, status3) => {
                                if (status3 === google.maps.DirectionsStatus.OK) {
                                    this.setState({
                                        directions: result3,
                                    });
                                }
                            });
                        }
                    });
                }
            });
        },
    }),
)(props => (
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(props.originLat, props.originLng)}
        panel={ document.getElementById('panel') }
    >
        {props.isMarkerShown && <Marker position={{ lat: props.originLat, lng: props.originLng }} />}
        {props.directions && <DirectionsRenderer directions={props.directions} panel={ document.getElementById('panel') } />}
        <Grid container spacing={12}>
           <Grid id="panel" item xs={12}>
           </Grid>
        </Grid>
    </GoogleMap>
));

class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directionType: 'DRIVING',
        };
    }
    handleDirectionTypeChange(type){
        this.setState({
            directionType: type
        });
    };
    render() {
        const { location } = this.props;
        const { directionType } = this.state;

        return (
            <Grid container spacing={12}>
                <Typography variant="h5" color="inherit" paragraph>
                    Directions:
                </Typography>
                <Grid item xs={12}>
                    <b>Note:</b> Direction only available if you entered a address in your profile.
                </Grid>
                <Grid item xs={12}>
                    <Button size="small" color="primary" onClick={()=>this.handleDirectionTypeChange('BICYCLING')}>
                        BICYCLING
                    </Button>
                    <Button size="small" color="primary" onClick={()=>this.handleDirectionTypeChange('DRIVING')}>
                        DRIVING
                    </Button>
                    <Button size="small" color="primary" onClick={()=>this.handleDirectionTypeChange('TRANSIT')}>
                        TRANSIT
                    </Button>
                    <Button size="small" color="primary" onClick={()=>this.handleDirectionTypeChange('WALKING')}>
                        WALKING
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <GoogleMapWithMarker
                        location={ location }
                        directionType={ directionType }
                    />
                </Grid>
            </Grid>
        );
    }
}

GoogleMaps.propTypes = {
    location: PropTypes.shape({}).isRequired,
};

export default GoogleMaps;
