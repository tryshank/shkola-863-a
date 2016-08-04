import React from 'react';

let GoogleMap = require('./GoogleMapView');

const HowToFindView = ({ zoom, initialCenter }) =>

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
          <GoogleMap
            initialCenter={initialCenter}
            zoom={zoom}
          />
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
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
};

export default HowToFindView;
