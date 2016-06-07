import React, {Component} from "react";

export default class PortfolioItemViewView extends Component {

    render() {
        const itemData = this.props.itemData;
        return <div className="col-sm-4 portfolio-item">
            <a href={"#"+itemData.divId} className="portfolio-link" data-toggle="modal">
                <div className="caption">
                    <div className="caption-content">
                        <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                </div>
                <img src={itemData.image} className="img-responsive" alt=""/>
            </a>
        </div>;
    }
}

export default class PortfolioViewView extends Component {
    render() {
        return (<section id="portfolio">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2>Portfolio</h2>
                        <hr className="star-primary"/>
                    </div>
                </div>
                <div class="row">
                    {this.props.items.map(function (itemData) {
                        return <PortfolioItemViewView key={itemData.id} itemData={itemData}/>;
                    })};
                </div>
            </div>
        </section>);
    }
}