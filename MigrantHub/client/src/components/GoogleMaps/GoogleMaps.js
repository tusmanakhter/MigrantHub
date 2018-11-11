/* global google */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';

const GoogleMapWithMarker = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    lat: 45.5017,
    lng: -73.5673,
    isMarkerShown: false,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const geocoder = new google.maps.Geocoder();
      const { location } = this.props;

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
            lat: results1[0].geometry.location.lat(),
            lng: results1[0].geometry.location.lng(),
            isMarkerShown: true,
          });
        }
      });
    },
  }),
)(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(props.lat, props.lng)}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
));

class GoogleMaps extends Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        <GoogleMapWithMarker
          location={location}
        />
      </div>
    );
  }
}

GoogleMaps.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default GoogleMaps;
