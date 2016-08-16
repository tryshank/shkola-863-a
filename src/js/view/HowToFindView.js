import React from 'react';

import SimpleMapView from './SimpleMapView';

// GOOGLE MAP
const initialCenter = { lng: 27.537461, lat: 53.891295 };
const zoom = 17;
const marker = [{
  position: initialCenter,
  key: 'Imaguru',
  defaultAnimation: 2,
}];

const HowToFindView = () =>

  <section id="howtofind">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>Як дабрацца</h2>
          <hr
            className="star-primary"
          />
        </div>
      </div>
      <div
        className="row text-center"
      >
        <div
          className="col-md-6 text-center"
        >
          <div className="GMap">
            <SimpleMapView
              markers={marker}
              initialCenter={initialCenter}
              zoom={zoom}
            />
          </div>
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
  </section>;

HowToFindView.propTypes = {
  markers: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number.isRequired,
  initialCenter: React.PropTypes.object.isRequired,
};

export default HowToFindView;
