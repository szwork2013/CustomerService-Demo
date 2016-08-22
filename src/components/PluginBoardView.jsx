import React from 'react';
import ReactDOM from 'react-dom';

var PluginBoardView = React.createClass({

    propTypes: {
        itemClick: React.PropTypes.func.isRequired,
    },


    // itemClick: function(index) {
    //     console.log(index);
    //     window.mutiParams('参数1','参数2','参数3');
    // },


    render: function() {
        return (
            <div className="plugin-board-view" >
                <div className="plugin-board-item" style={{'width':'50px', 'height':'50px'}} onClick={this.props.itemClick.bind(null, 0)}>
                    照片
                </div>
                <div className="plugin-board-item" style={{'width':'50px', 'height':'50px'}} onClick={this.props.itemClick.bind(null, 1)}>
                    拍摄
                </div>
            </div>
        );
    }
});

module.exports = PluginBoardView;
