/**
 * @file	Dialog.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	다이얼로그 파일
 */

import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Platform, ScrollView  } from 'react-native';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';



/**
 * 다이얼로그 클래스 
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
class Dialog extends Component
{
	/**
	 * 생성자
	 * @param {*} props 
	 */
	constructor(props)
	{
		super(props);
	}

	/**
	 * 모달 상단과 하단에 대한 터치가능한 투명 뷰처리
	 * @param {*} onTouch 
	 * @returns 
	 */
	renderOutsideTouchable(onTouch)
	{
		const view = <View style={{ flex: 1, width: '100%' }} />
		if (!onTouch) return view;
		return (<TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>{view}</TouchableWithoutFeedback>)
	}

	/**
	 * 타이틀 부분 렌더 처리
	 * @returns 
	 */
	renderTitle()
	{
		const { title, titleStyle } = this.props.dialogData;
		const textAlign = Platform === 'ios' ? "center" : null;
		if (title != null)
		{
			return (<Text style={[{ textAlign, color: "#000000DD", fontSize: 20, margin: 24, marginBottom: 0 }, titleStyle]}>{title}</Text>)
			//return (<Text style={[{ textAlign, color: "#000000DD", fontSize: 20, margin: 24, marginBottom: 0 }, ]}>{title}</Text>)
		}
	}

	/**
	 * 컨텐츠 부분 렌더 처리
	 * @returns 
	 */
	renderContent()
	{
		const { content, contentStyle } = this.props.dialogData;
		return (<View style={[{ width: '100%' }, contentStyle]}>{content}</View>)
	}

	/**
	 * 버튼 부분 렌더 처리
	 * @returns 
	 */
	renderButton()
	{
		const { buttons, buttonsStyle } = this.props.dialogData;
		const containerStyle = Platform === 'ios' ? {} : { width: '100%', padding: 8 };
		if (buttons != null)
		{
			return (<View style={[containerStyle, buttonsStyle]}>{buttons}</View>)
		}
	}
	close =() =>
	{
		console.log("@@@@@@@@@@@@@@@@@@@");
		console.log("@@ CLOSE @@@@");
		console.log("@@@@@@@@@@@@@@@@@@@");
	}

	/**
	 * 렌더 처리
	 * @returns 
	 */
	render()
	{
		//console.log("=========================================");
		//console.log("*Dialog.render()");
		//console.log(" -props:" + JSON.stringify(this.props));
		//console.log("=========================================");
		const {
			visible, animationType, modalStyle, scrollViewStyle, dialogStyle, overlayStyle, keyboardDismissMode, keyboardShouldPersistTaps, onTouchOutside, onRequestClose,
		} = this.props.dialogData;
		
		let strAnimationType = "fade";
		if(animationType != null) strAnimationType = animationType;

		const strDialogBgColor = Platform.OS === 'ios' ? "#ffffff" : "#e8e8e8";
		const strDialogBorderRadius = Platform.OS === 'ios' ? 5 : 1;
	
		if(Platform.OS === 'ios')
		{
			return (
				<Modal style={[{}, modalStyle]} isVisible={visible} transparent={true} animationType={strAnimationType} onRequestClose={onRequestClose} swipeDirection={"right"} onSwipeComplete={onRequestClose}>
					<ScrollView style={[{ flex: 1 }, scrollViewStyle]} contentContainerStyle={{ flex: 1 }}
						keyboardDismissMode={keyboardDismissMode} keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
						<View style={[{ flex: 1, backgroundColor: "#00000000" }, overlayStyle]}>
							{this.renderOutsideTouchable(onTouchOutside)}
							<View style={[{ backgroundColor: strDialogBgColor, borderRadius: strDialogBorderRadius }, dialogStyle]}>
								{this.renderTitle()}
								{this.renderContent()}
								{this.renderButton()}
							</View>
							{this.renderOutsideTouchable(onTouchOutside)}
						</View>
					</ScrollView>
				</Modal>	
			)
		}
		else
		{
			return (
				<Modal style={[{ }, modalStyle]} isVisible={visible} transparent={true} animationType={strAnimationType} onRequestClose={onRequestClose}>
					<ScrollView style={[{ flex: 1 }, scrollViewStyle]} contentContainerStyle={{ flex: 1 }}
						keyboardDismissMode={keyboardDismissMode} keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
						<View style={[{ flex: 1, backgroundColor: "#00000000" }, overlayStyle]}>
							{this.renderOutsideTouchable(onTouchOutside)}
							<View style={[{ backgroundColor: strDialogBgColor, borderRadius: strDialogBorderRadius }, dialogStyle]}>
								{this.renderTitle()}
								{this.renderContent()}
								{this.renderButton()}
							</View>
							{this.renderOutsideTouchable(onTouchOutside)}
						</View>
					</ScrollView>
				</Modal>	
			)
		}

	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log("------------------------------");
	// console.log("*Dialog.mapStateToProps()");
	// console.log("-state:" + JSON.stringify(state));
	// console.log("-ownProps:" + JSON.stringify(ownProps));
	// console.log("------------------------------");
	return {
		dialogData: state.dialogData,
	}
}
export default connect(mapStateToProps)(Dialog);

