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
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));