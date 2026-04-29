/**
 * @file	AppStatusBar.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	상태바 파일
 */

 import React from 'react';
 import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
 import { isIphoneX } from 'react-native-iphone-x-helper'
 import { connect } from 'react-redux'
 
 /**
  * 상단에 있는 상태바를 관리하는 클래스 
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
 class AppStatusBar extends React.Component
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
	  * 화면렌더
	  * @returns 
	  */
	 render() {
		const { statusBarColor, statusBarStyle } = this.props.appData;
		console.log("*AppStatusBar.render(), statusBarColor:"+ statusBarColor);
		let intStatusHeight = Platform.OS === "ios" ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;
		return (
			Platform.OS == "ios" ? (
				<View style={{ height: intStatusHeight, backgroundColor: statusBarColor }}>
					<StatusBar translucent backgroundColor={statusBarColor} barStyle={statusBarStyle} />
				</View>
			) : (
				<StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
			)
		 );
	 }
 }

 const mapStateToProps = (state, ownProps) => {
	return {
		appData: state.appData,
	}
}
export default connect(mapStateToProps)(AppStatusBar);