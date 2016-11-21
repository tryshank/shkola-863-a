import React from 'react';

import Localization from '../common/Localization';

const locale = Localization.footer;

const FooterView = () =>
  <footer className="text-center">
    <div className="footer-above">
      <div className="container">
        <div className="row">
          <div className="footer-col col-md-4" />
          <div className="footer-col col-md-4">
            <h3>{locale.aroundTheWeb}</h3>
            <ul className="list-inline">
              <li>
                <a
                  href="https://www.facebook.com/ShkolaA1/"
                  className="btn-social btn-outline"
                ><i className="fa fa-fw fa-facebook" /></a>
              </li>
              <li>
                <a
                  href="https://vk.com/shkola_a1"
                  className="btn-social btn-outline"
                ><i className="fa fa-fw fa-vk" /></a>
              </li>
              <li>
                <a
                  href="mailto:info@shkola-a.by"
                  className="btn-social btn-outline"
                ><i className="fa fa-fw fa-envelope" /></a>
              </li>
              <li>
                <a
                  href="#"
                  className="btn-social btn-outline"
                ><i className="fa fa-fw fa-link" /></a>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-4" />
        </div>
      </div>
    </div>
    <div className="footer-below">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            Copyright &copy; shkola-a.by 2016
          </div>
        </div>
      </div>
    </div>
  </footer>;

export default FooterView;
