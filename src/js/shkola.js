import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../main.less');
//require("!style!css!less!../main.less");

class App extends Component {
    render() {
        return <div className="box">
            <div>
                <p> 123!</p>
            </div>
        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));