import React from 'react';

const FooterView = () =>
  <footer className="text-center">
    <div className="footer-above">
      <div className="container">
        <div className="row">
          <div className="footer-col col-md-4">
            <h3>Location</h3>
            <p>г. Мінск<br />ст. метро пл. Я. Коласа.</p>
          </div>
          <div className="footer-col col-md-4">
            <h3>Around the Web</h3>
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
          <div className="footer-col col-md-4">
            <h3>About Freelancer</h3>
            <p>Freelance is a free to use, open source Bootstrap theme created by <a
              href="http://startbootstrap.com"
            >Start Bootstrap</a>.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-below">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            Copyright &copy; Your Website 2014
          </div>
        </div>
      </div>
    </div>
  </footer>;

export default FooterView;
