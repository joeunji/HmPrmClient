/**
 * @file	AlertDialog.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	Alert 다이얼로그 파일
 */
import React, { Component } from 'react'
import { TextStyle, View, Text, Platform, TouchableOpacity } from 'react-native'
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

import PropTypes from 'prop-types';
import Dialog from './Dialog'

const DEFAULT_COLOR_BUTTON = "#0000FF99";
const DEFAULT_BACKGROUNDCOLOR_BUTTON = "transparent";


/**
 * Alert 다이얼로그 클래스 
 * - 안드로이드는 기능이 있으나, IOS에서는 View로 직접 구현해야해서 컴퍼넌트화함.
 * @author	yomile
 * @version	1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2021.07.01  yomile          최초 생성
 * 
 * </pre>
 */
class AlertDialog extends Component
{
	/**
	 * 버튼을 스타일을 리턴한다.
	 * @param {*} button  버튼 
	 * @param {*} positive 포지티브 버튼 스타일
	 * @returns 
	 */
	getButtonStyle = (button, positive) => {
		const { disabled } = button;
		const style = button.style || {};
		const { backgroundColor, backgroundColorDisabled, ...othersStyle } = style;
		return Platform.select({
			ios: {
				height: 46,
				justifyContent: "center",
				backgroundColor: (!disabled ? backgroundColor : (backgroundColorDisabled || backgroundColor)) || DEFAULT_BACKGROUNDCOLOR_BUTTON,
				...othersStyle
			},
			android: {
				backgroundColor: (!disabled ? backgroundColor : (backgroundColorDisabled || backgroundColor)) || DEFAULT_BACKGROUNDCOLOR_BUTTON,
				...othersStyle
			}
		})
	}
	/**
	 * 버튼의 텍스트 스타일을 리턴한다.
	 * @param {*} button 버튼
	 * @param {*} positive 포지티브 버튼 스타일
	 * @returns 
	 */
	getButtonTextStyle = (button, positive) => {
		const { disabled } = button;
		const titleStyle = button.titleStyle || {};
		const { color, colorDisabled, ...othersStyle } = titleStyle;
		return Platform.select({
			ios: {
				textAlign: "center",
				textAlignVertical: "center",
				color: (!disabled ? color : (colorDisabled || color)) || DEFAULT_COLOR_BUTTON,
				fontWeight: positive ? "bold" : "normal",
				...othersStyle
			},
			android: {
				height: 36,
				minWidth: 64,
				padding: 8,
				textAlign: "center",
				textAlignVertical: "center",
				color: (!disabled ? color : (colorDisabled || color)) || DEFAULT_COLOR_BUTTON,
				fontWeight: "bold",
				...othersStyle
			}
		});
	}

	/**
	 * 메시지 화면 렌더
	 * @returns 
	 */
	renderMessage()
	{
		const { message, messageStyle } = this.props;
		const textAlign = Platform === 'ios' ? "center" : null;
		if (message) return (<Text style={[{ textAlign, color: "#00000089", fontSize: 18 }, messageStyle]}>{message}</Text>)
	}

	/**
	 * 컨텐츠 렌더
	 * @returns 
	 */
	renderContent()
	{
		const { children } = this.props;
		if (children) return children;
		return this.renderMessage();
	}

	/**
	 * 버튼 렌더
	 * @param {*} button 버튼 
	 * @param {*} positive 포지티브버튼 스타일
	 * @returns 
	 */
	renderButton(button, positive)
	{
		if (button)
		{
			const { onPress, disabled, color, } = button;
			const title = Platform === 'ios' ? button.title : button.title.toUpperCase();
			const containerStyle = this.getButtonStyle(button, positive);
			const textStyle = this.getButtonTextStyle(button, positive);
			const touchableStyle = Platform === 'ios' ? { flex: 1 } : {};

			return (
				<TouchableOpacity onPress={onPress} disabled={disabled} style={touchableStyle}>
					<View style={containerStyle}>
						<Text style={textStyle} >{title}</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}

	/**
	 * 모든버튼에 대한 렌더
	 * @returns 
	 */
	renderButtons()
	{
		const { negativeButton, positiveButton } = this.props;
		const containerStyle = Platform === 'ios' ? { flexDirection: "row" } : { flexDirection: "row", justifyContent: "flex-end", height: 36 }
		const dividerVertStyle = Platform === 'ios' ? { width: negativeButton ? 1 : 0, backgroundColor: "#00000011" } : { width: 8 }
		const dividerHoriStyle = Platform === 'ios' ? { height: 1, backgroundColor: "#00000011" } : { height: 0 };

		return (
			<View>
				<View style={dividerHoriStyle}></View>
				<View style={containerStyle}>
					{this.renderButton(negativeButton, false)}
					<View style={dividerVertStyle}></View>
					{this.renderButton(positiveButton, true)}
				</View>
			</View>
		)
	}

	/**
	 * 렌더
	 * @returns 
	 */
	render()
	{
		return (
			<Dialog {...this.props} buttons={this.renderButtons()}>
				{this.renderContent()}
			</Dialog>
		)
	}
}
// Text.propTypes.style 가 Depreated되어 TextStyle로 수정함.

const buttonPropType = PropTypes.shape({
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	titleStyle: PropTypes.shape({
		//...Text.propTypes.style,
		...TextStyle,
		colorDisabled: PropTypes.string,
	}),
	style: PropTypes.shape({
		...ViewPropTypes.style,
		backgroundColorDisabled: PropTypes.string,
	})
});


AlertDialog.propTypes = {
	...Dialog.propTypes,


	message			: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	//messageStyle	: Text.propTypes.style,
	messageStyle	: TextStyle,
	negativeButton	: buttonPropType,
	positiveButton	: buttonPropType.isRequired
}

export default AlertDialog