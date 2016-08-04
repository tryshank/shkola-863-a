import React from 'react';

class GoogleMapView extends React.Component {

  static propTypes = {
    initialCenter: React.PropTypes.object,
    zoom: React.PropTypes.number,
  }

  state = { zoom: 17 };

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.infoWindow = this.createInfoWindow()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    const mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    };
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    );
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    });
  }

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    });
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    });
  }

  render() {
    return (<div className="GMap">
      <div className="GMap-canvas" ref="mapCanvas">
      </div>
    </div>);
  }
}

module.exports = GoogleMapView;
