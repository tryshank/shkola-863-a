import React from 'react';

import SimpleMapView from './SimpleMapView';

// GOOGLE MAP
const initialCenter = { lng: 27.583746, lat: 53.916212 };
const zoom = 16;
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
            <h4 className="service-heading">Shkola-A</h4>
            <span className="text-muted">
              г. Мінск, ст. метро пл. Я. Коласа.<br />
              +375-29-9030310<br />
              info@shkola-a.by
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>;

export default HowToFindView;
