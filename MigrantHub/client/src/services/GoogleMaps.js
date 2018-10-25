/*global google*/
import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker  } from "react-google-maps";

const GoogleMapWithMarker = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        lat: 45.5017,
        lng: -73.5673,
        isMarkerShown: false,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {

            let geocoder = new google.maps.Geocoder()

            console.log(this.props.serviceLocation);
            console.log(this.props.userLocation);

            geocoder.geocode( { 'address':
            this.props.serviceLocation.address + ' ' +
            this.props.serviceLocation.apartment + ', ' +
            this.props.serviceLocation.city + ', ' +
            this.props.serviceLocation.province + ' '  +
            this.props.serviceLocation.postalCode}, function(results1, status1) {
                if (status1 == 'OK') {
                    console.log('here result of geocoder', results1[0].geometry.location.lat());
                    console.log('here result of geocoder', results1[0].geometry.location.lng());
                    this.setState({
                        lat: results1[0].geometry.location.lat(),
                        lng: results1[0].geometry.location.lng(),
                        isMarkerShown: true,
                    });

                } else {
                    console.log('Error fetching coordinates: ' + status1);
                }
            }.bind(this));
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(props.lat, props.lng)}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
);

class GoogleMaps extends Component {

    render() {

        return(
            <div>
                <GoogleMapWithMarker
                    serviceLocation={this.props.serviceLocation}
                />
            </div>
        );
    }
}

export default GoogleMaps;