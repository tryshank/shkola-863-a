import React, {Component} from "react";
import ReactDOM from "react-dom";
import HeaderView from "./view/HeaderView";
import PortfolioView from "./view/PortfolioView";
import AboutView from "./view/AboutView";
import ContactView from "./view/ContactsView";
import FooterView from "./view/FooterView";
import PortfolioModalView from "./view/PortfolioModalView";
import NavigationView from "./view/NavigationView";

require('font-awesome/less/font-awesome.less');
require('../less/variables.less');
require('../less/freelancer.less');


var portfolioData = [
    {
        id: 1,
        divId: 'portfolioModal1',
        image: 'src/img/portfolio/cabin.png'
    }, {
        id: 2,
        divId: 'portfolioModal2',
        image: 'src/img/portfolio/cake.png'
    }, {
        id: 3,
        divId: 'portfolioModal3',
        image: 'src/img/portfolio/circus.png'
    }, {
        id: 4,
        divId: 'portfolioModal4',
        image: 'src/img/portfolio/game.png'
    }, {
        id: 5,
        divId: 'portfolioModal5',
        image: 'src/img/portfolio/safe.png'
    }, {
        id: 6,
        divId: 'portfolioModal6',
        image: 'src/img/portfolio/submarine.png'
    }
];


class App extends Component {

    render() {

        const portfolioDataModals = portfolioData.map(data =>
            <PortfolioModalView key={data.id} context={data}/>
        );

        return <div>
            <NavigationView />
            <HeaderView />

            <PortfolioView items={portfolioData}/>

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
            {portfolioDataModals}

        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));