import React, {Component} from 'react';
import ReactDOM from 'react-dom';

require('font-awesome/less/font-awesome.less');
require ('../less/variables.less');
require ('../less/freelancer.less');

import HeaderView from './view/HeaderView';
import PortfolioView from './view/PortfolioView';
import AboutView from './view/AboutView';
import ContactView from './view/ContactsView';
import FooterView from './view/FooterView';
import PortfolioModalView from './view/PortfolioModalView';



class App extends Component {
    render() {
        return <div>
            <HeaderView />
            <PortfolioView />
            <AboutView />
            <ContactView />
            <FooterView />

            /* Scroll to Top Button (Only visible on small and extra-small screen sizes) */
            <div className="scroll-top page-scroll visible-xs visible-sm">
                <a className="btn btn-primary" href="#page-top">
                    <i className="fa fa-chevron-up"></i>
                </a>
            </div>

            /* Portfolio Modals */
            <PortfolioModalView/>

        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));