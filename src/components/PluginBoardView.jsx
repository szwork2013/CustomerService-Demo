import React from 'react';
import ReactDOM from 'react-dom';

var PluginBoardView = React.createClass({

    propTypes: {
        itemClick: React.PropTypes.func.isRequired,
    },

    // <div className="plugin-board-view" >
    //     <ul>
    //         <li>
    //             <div className="plugin-board-item" onClick={this.props.itemClick.bind(null, 0)}>
    //                 照片
    //             </div>
    //         </li>
    //         <li>
    //             <div className="plugin-board-item" onClick={this.props.itemClick.bind(null, 1)}>
    //                 拍摄
    //             </div>
    //         </li>
    //     </ul>
    // </div>

    render: function() {
        return (
            <div className="plugin-board-view">
                 <div className="plugin-board-item" onClick={this.props.itemClick.bind(null, 0)}>
                     <div className="camera-icon"></div>
                     <p style={{'textAlign': 'center'}}>拍照</p>
                </div>
                <div className="plugin-board-item" onClick={this.props.itemClick.bind(null, 1)}>
                    <div className="picture-icon"></div>
                    <p style={{'textAlign': 'center'}}>相册</p>
               </div>
            </div>

        );
    }
});

module.exports = PluginBoardView;
