/**
 * @file	pushDataAction.js
 * @date	2024.07.09
 * @author	yomile
 * @brief	푸시 데이터에 대한 액션처리 파일
 */

import { PUSH_MSG_ARRIVED, PUSH_MSG_INIT } from '../actionType';

/**
 * 푸시 데이터를 설정한다.
 * @param {*} arrOption 옵션
 * @returns 
 */
export const  pushMsgArrived = (objData) => (dispatch) => {
	dispatch({ type: PUSH_MSG_ARRIVED, payload: objData });
}

export const  pushMsgInit = () => (dispatch) => {
	dispatch({ type: PUSH_MSG_INIT });
 }
 