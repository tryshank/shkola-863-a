import React, {Component} from "react";
export default class PortfolioModalViewView extends Component {

    render() {
        return <div className="portfolio-modal modal fade" id={this.props.context.divId} tabindex="-1" role="dialog"
                    aria-hidden="true">
            <div className="modal-content">
                <div className="close-modal" data-dismiss="modal">
                    <div className="lr">
                        <div className="rl">
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <div className="modal-body">
                                <h2>{this.props.context.title}</h2>
                                <hr className="star-primary"/>
                                <img src={this.props.context.image} className="img-responsive img-centered" alt=""/>
                                <p dangerouslySetInnerHTML={ { __html: this.props.context.content} }></p>
                                <ul className="list-inline item-details">
                                    <li>Client:
                                        <strong><a href={this.props.context.link}>{this.props.context.client}</a>
                                        </strong>
                                    </li>
                                    <li>Date:
                                        <strong><a href={this.props.context.link}>{this.props.context.date}</a>
                                        </strong>
                                    </li>
                                    <li>Service:
                                        <strong><a href={this.props.context.link}>{this.props.context.service}</a>
                                        </strong>
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times"></i> Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

}
