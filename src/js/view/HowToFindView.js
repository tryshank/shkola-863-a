import React, { Component } from 'react';
export default class HeaderView extends Component {

  componentDidMount() {
    function initialize() {
      const mapCanvas = document.getElementById('map');
      const latLng = new google.maps.LatLng(53.891295, 27.537461);
      const mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      const map = new google.maps.Map(mapCanvas, mapOptions);
      const marker = new google.maps.Marker({
        position: latLng,
        map,
        title: '',
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
  }

  render() {
    return (
            <section id="howtofind">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Як дабрацца</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-6 text-center">
                            <div id="map"></div>
                        </div>
                        <div className="col-md-6">
                            <div className="how-to-find-description">
                                <h4 className="service-heading">6 лютага а 12:00</h4>

                            <span className="text-muted">
                                Бізнэс клуб IMAGURU, г. Мінск, вул. Фабрыцыуса 4, заля Nordic.<br />
                                <b>Калі ласка, <a href="#register">зарэгіструйцеся!</a></b>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
  }

}
