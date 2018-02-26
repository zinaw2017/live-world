import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Page from './Page';

var App = React.createClass({

    render: function() {

        return (
            <div>
                <List data={window.data} auth={window.auth} user={window.user} />
                <Pagination path={window.path} page={window.page} />
                <div className="footer text-center">Full Stack APP | <a href="https://github.com/yealemiyelij/Final-Project" target="_blank">GitHub</a></div>
            </div>
        )
    }
})

ReactDOM.render(<App />, document.getElementById('app'));