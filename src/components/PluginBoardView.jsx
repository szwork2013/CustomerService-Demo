import React from 'react';
import ReactDOM from 'react-dom';

var PluginBoardView = React.createClass({

    propTypes: {
        itemClick: React.PropTypes.func.isRequired,
    },

    render: function() {
        return (
            <div className="plugin-board-view" onClick={this.props.itemClick}>
            </div>
        );
    }
});

module.exports = PluginBoardView;
