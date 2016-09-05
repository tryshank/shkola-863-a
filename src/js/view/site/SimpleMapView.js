import React from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from 'react-google-maps';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
const SimpleMap = props => (
  <div className="GMap-canvas">
    <GoogleMapLoader
      containerElement={
        <div
          id="Gmap-div"
          {...props.containerElementProps}
          style={{
            height: '300px',
          }}
        />
      }

      googleMapElement={
        <GoogleMap
          defaultZoom={props.zoom}
          defaultCenter={{ lat: props.initialCenter.lat, lng: props.initialCenter.lng }}
        >
          {props.markers.map((marker, index) => (
            <Marker
              {...marker}
            />
          ))}
        </GoogleMap>
      }
    />
  </div>
);

SimpleMap.propTypes = {
  markers: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number.isRequired,
  initialCenter: React.PropTypes.object.isRequired,
  containerElementProps: React.PropTypes.object,
};

export default SimpleMap;
