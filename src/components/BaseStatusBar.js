/**
 * @file	BaseStatusBar.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	상태바 파일
 */

import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper'
 import { consts, colors} from "~/common/libs/base";
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
class BaseStatusBar extends React.Component
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
	   let intStatusHeight = Platform.OS === "ios" ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;
	   return (
		   <View style={{ height: intStatusHeight, backgroundColor: colors.BACKGROUND}}>
			   <StatusBar translucent backgroundColor={colors.BACKGROUND} barStyle={consts.STATUS_BAR_STYLE_DARK_CONTENT} />
		   </View>
	   )
	}
}

export default BaseStatusBar;