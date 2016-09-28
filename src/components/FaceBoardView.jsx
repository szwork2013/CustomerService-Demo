import React from 'react';
import ReactDOM from 'react-dom';


var emoji = '😄';

var FaceBoardView = React.createClass({

    render: function() {
        // 3 * 7 - 1
        var items = [];
        for (var i = 0; i < 21; i++) {
            items.push(<li className="emoji_item" key={i} onClick={this.props.emojiClick.bind(null, '😄')} ><span className="emoji_content">😄</span></li> );
        }
        return (
            <div className="face-board-view">
                <ul style={{'width': '100%' ,'height': '100%'}}>
                    {items}
                </ul>
            </div>
        );
    }
});

module.exports = FaceBoardView;
