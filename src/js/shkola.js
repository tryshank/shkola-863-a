import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//require('font-awesome-webpack');

require ('../less/variables.less');
require ('../less/freelancer.less');

//require ('../font-awesome/less/font-awesome.less');
//require("font-awesome-webpack");

import HeaderView from './view/HeaderView';
import PortfolioView from './view/PortfolioView';
import AboutView from './view/AboutView';
import ContactView from './view/ContactsView';
import FooterView from './view/FooterView';



class App extends Component {
    render() {
        return <div>
            <div>
                <HeaderView />
                <PortfolioView />
                <AboutView />
                <ContactView />
                <FooterView />
            </div>
        </div>;
        // <body id="page-top" className="index">123
        // </body>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));