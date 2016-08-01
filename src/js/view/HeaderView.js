import React, {Component} from "react";
export default class HeaderView extends Component {

    render() {
        //return null;
        return (<header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <img src="src/img/profile.png" alt=""/>
                        <div className="intro-text">
                            <span className="name">Start Bootstrap</span>
                            <hr className="star-light"/>
                            <span className="skills">Web Developer - Graphic Artist - User Experience Designer</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>);
    }

}
