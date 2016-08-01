import React, {Component} from "react";

export default class CourseItemViewView extends Component {

    render() {
        const itemData = this.props.itemData;
        return <div className="col-sm-4 course-item">
            <a href={"#"+itemData.divId} className="course-link" data-toggle="modal">
                <div className="caption">
                    <div className="caption-content">
                        <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                </div>
                <img src={"src/img/courses/"+itemData.image} className="img-responsive" alt=""/>
            </a>
        </div>;
    }
}

export default class CoursesViewView extends Component {
    render() {
        return (<section id="courses">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2>Courses</h2>
                        <hr className="star-primary"/>
                    </div>
                </div>
                <div className="row">
                    {this.props.items.map(function (itemData) {
                        return <CourseItemViewView key={itemData.id} itemData={itemData}/>;
                    })}
                </div>
            </div>
        </section>);
    }
}