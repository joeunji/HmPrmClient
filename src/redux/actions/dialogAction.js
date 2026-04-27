/**
 * @file	dialogAction.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	다이얼로그에 대한 액션처리 파일
 */

import React from "react";
import { Button, Text } from "react-native";
import {colors, fonts } from "~/common/libs/base";
import { SHOW_DIALOG, HIDE_DIALOG, SHOW_MSG_DIALOG, HIDE_MSG_DIALOG } from '../actionType';

/**
 * 다이얼로그를 보여준다.
 * @param {*} arrOption 옵션
 * @returns 
 */
export const showDialog = (arrOption) => (dispatch) => {
	//console.log("-------------------------------------------------------");
	//console.log("*dialogAction.showDialog");
	//console.log(" -arrOption:" + JSON.stringify(arrOption));
	//console.log("-------------------------------------------------------");
	dispatch({ type: SHOW_DIALOG, payload: arrOption });
}

/**
 * 다이얼로그를 숨긴다.
 * @returns 
 */
export const hideDialog = () => (dispatch) => {
	dispatch({ type: HIDE_DIALOG });
}

/**
 * 메시지 다이얼로그를 보여준다.
 * @param {*} arrOption  옵션
 * @returns 
 */
export const showMsgDialog = (arrOption) => (dispatch) => {
	//console.log("-------------------------------------------------------");
	//console.log("*dialogAction.showMsgDialog");
	//console.log(" -arrOption:" + JSON.stringify(arrOption));
	//console.log("-------------------------------------------------------");
	let strMessage = arrOption.message;
	arrOption.dialogStyle		= { paddingTop:20, borderWidth:2, borderColor: colors.PRIMARY };
	arrOption.buttonsStyle		= { flext:1, alignItems: "center", height:50, padding:0 };
	arrOption.onTouchOutside 	= () => { dispatch(hideMsgDialog()) };
	arrOption.content			= (<Text style={{color: colors.TEXT, fontSize:15, paddingVertical:10, fontFamily: fonts.NANUNM_REGULAR}}>{strMessage}</Text>);

	if(arrOption.buttons == null)
	{
		arrOption.buttons	= (<Button color={colors.TEXT} style={{flex:1, width: '100%', margin:0, color: colors.TEXT_REVERSAL }} onPress={ () => dispatch(hideMsgDialog()) } title="닫기"/>);
	}
	dispatch({ type: SHOW_MSG_DIALOG, payload: arrOption });
}

/**
 * 메시지다이어로그를 숨긴다.
 * @returns 
 */
export const hideMsgDialog = () => (dispatch) => {
	dispatch({ type: HIDE_MSG_DIALOG });
}

