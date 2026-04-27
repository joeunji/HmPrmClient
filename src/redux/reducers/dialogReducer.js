/**
 * @file	dialogReducer.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	다이얼로그에 대한 Reducer 파일
 */

import { SHOW_DIALOG, HIDE_DIALOG, SHOW_MSG_DIALOG, HIDE_MSG_DIALOG } from '../actionType';

const INITIAL_STATE = {
	visible						: false,
	animationType				: "fade",
	title						: "",
	content						: null,  // 하위 컨트롤
	buttons						: null,
	modalStyle					: {}, 
	scrollViewStyle				: {},
	dialogStyle					: {},
	titleStyle					: {},
	contentStyle				: {},
	buttonsStyle				: {},
	overlayStyle				: {},
	keyboardDismissMode			: "none",
	keyboardShouldPersistTaps	: "never",
	onTouchOutside				: null,
	onRequestClose				: null,
	data						: {},
};

/**
 * SafeArea 대한 Reducer 함수
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export default function (state = INITIAL_STATE, action)
{
	let arrOption = action.payload;
	switch (action.type)
	{
		case SHOW_DIALOG:
		
			// console.log("-------------------------------------------------------");
			// console.log("*dialogReducer.SHOW_DIALOG");
			// //console.log(" -payload:" + JSON.stringify(arrOption));
			// console.log("-------------------------------------------------------");

			return {
				...state,
				visible						: true,
				animationType				: arrOption.animationType,
				title						: arrOption.title,
				content						: arrOption.content,
				buttons						: arrOption.buttons,
				modalStyle					: arrOption.modalStyle ? arrOption.modalStyle : {},
				scrollViewStyle				: arrOption.scrollViewStyle ? arrOption.scrollViewStyle : {},

				dialogStyle					: arrOption.dialogStyle ? arrOption.dialogStyle : {},
				titleStyle					: arrOption.titleStyle ? arrOption.titleStyle : {},
				contentStyle				: arrOption.contentStyle ? arrOption.contentStyle : {},
				buttonsStyle				: arrOption.buttonsStyle ? arrOption.buttonsStyle : {},
				overlayStyle				: arrOption.overlayStyle ? arrOption.overlayStyle : {},
				keyboardDismissMode			: arrOption.keyboardDismissMode,
				keyboardShouldPersistTaps	: arrOption.keyboardShouldPersistTaps,
				onTouchOutside				: arrOption.onTouchOutside,
				onRequestClose				: arrOption.onRequestClose,
				data						: arrOption.data,
			};

		case HIDE_DIALOG:
			// console.log("-------------------------------------------------------");
			// console.log("*dialogReducer.HIDE_DIALOG");
			// console.log("-------------------------------------------------------");
			return { ...INITIAL_STATE, };

		case SHOW_MSG_DIALOG:
		
			// console.log("-------------------------------------------------------");
			// console.log("*dialogReducer.SHOW_MSG_DIALOG");
			// //console.log(" -payload:" + JSON.stringify(arrOption));
			// console.log("-------------------------------------------------------");

	
			return {
				...state,
				visible						: true,
				animationType				: arrOption.animationType,
				title						: arrOption.title,
				content						: arrOption.content,
				buttons						: arrOption.buttons,
				modalStyle					: arrOption.modalStyle ? arrOption.modalStyle : {},
				scrollViewStyle				: arrOption.scrollViewStyle ? arrOption.scrollViewStyle : {},
				dialogStyle					: arrOption.dialogStyle ? arrOption.dialogStyle : {},
				titleStyle					: arrOption.titleStyle ? arrOption.titleStyle : {},
				contentStyle				: arrOption.contentStyle ? arrOption.contentStyle : {},
				buttonsStyle				: arrOption.buttonsStyle ? arrOption.buttonsStyle : {},
				overlayStyle				: arrOption.overlayStyle ? arrOption.overlayStyle : {},
				keyboardDismissMode			: arrOption.keyboardDismissMode,
				keyboardShouldPersistTaps	: arrOption.keyboardShouldPersistTaps,
				onTouchOutside				: arrOption.onTouchOutside,
				onRequestClose				: arrOption.onRequestClose,
				data						: arrOption.data,
			};

		case HIDE_MSG_DIALOG:
			// console.log("-------------------------------------------------------");
			// console.log("*dialogReducer.HIDE_MSG_DIALOG");
			// console.log("-------------------------------------------------------");
			return { ...INITIAL_STATE, };			
		default:
			return state;
	}
}