/**
 * slide dots 指示器
 */

import React, { Component } from 'react'

class Dots extends Component {
	render() {
		var clssName = 'dots';
		if (this.props.active.length > 0) {
			clssName = 'dots_active'
		}

		return (
			<span className={clssName} ></span>
		)
	}
}

module.exports = Dots;
