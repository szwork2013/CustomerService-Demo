/**
 * Sliders
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

class Sliders extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		var aStyles = {
			width: document.documentElement.clientWidth + "px"
		}
		var items = [];
		// <span className="emoji_content" style={{"WebkitTransform ": "scale(1.5)"}}>{emo}</span>
        for (var i = 0; i < this.props.emojis.length; i++) {
			var emo = this.props.emojis[i];
            items.push(
				<li className="emoji_item" key={i} onClick={this.props.emojiClick.bind(null, emo.name)} >
					<img  className="emoji_content" src={emo.src}  width="24"/>
				</li>
				);
        }

		items.push(<li className="emoji_item" key={this.props.emojis.length} onClick={this.props.deleteEmojiAction} ><span className="emoji_content">⬅️</span></li> );

		return (
			<div className="slide-a" style={aStyles}>
				<div className="slide-li" >
					<ul style={{'width': '100%' ,'height': '100%'}}>
						{items}
					</ul>
				</div>
			</div>
		)
	}
}

module.exports = Sliders;
