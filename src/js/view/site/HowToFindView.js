import React from 'react';

import SimpleMapView from './SimpleMapView';
import Localization from '../common/Localization';

// GOOGLE MAP
const initialCenter = { lng: 27.583746, lat: 53.916212 };
const zoom = 16;
const marker = [{
  position: initialCenter,
  key: 'Shkola-A',
  defaultAnimation: 2,
}];

const locale = Localization.howToFind;

const HowToFindView = () =>

  <section id="howtofind">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>{locale.title}</h2>
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
            <h4>
              <span className="service-heading">
                г. Мінск, ст. метро пл. Я. Коласа. <br />
                Незалежнасці 49 <br />
                +375-29-9030310 <br />
                info@shkola-a.by
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>;

export default HowToFindView;
