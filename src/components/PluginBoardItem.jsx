import React from 'react';
import ReactDOM from 'react-dom';

var PluginBoardItem = React.createClass({

    render: function() {
        return (
            <div className="">
                <button className="" >{this.props.name}</button>
                <p className="" >{this.props.title}</p>
            </div>
        );
    }
});

module.exports = PluginBoardItem;
