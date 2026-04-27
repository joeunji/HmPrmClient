/**
 * @file	pushDataReducer.js
 * @date	2024.07.09
 * @author	yomile
 * @brief	푸시 데이터에 대한 Reducer 파일
 */
import { PUSH_MSG_ARRIVED, PUSH_MSG_INIT } from '../actionType';

const INITIAL_STATE = {
	arrived		: false,
	data		: {}
};

/**
 * 푸시 데이터 대한 Reducer 함수
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export default function (state = INITIAL_STATE, action)
{
   
   switch (action.type)
   {
		case PUSH_MSG_ARRIVED:
			console.log("@@@@@@@ 푸시 도착 @@@@@2");
			return {...state, arrived: true, data : action.payload };

		case PUSH_MSG_INIT:
			return {...state, arrived: false, data : {} };
 
		default:
			return state;
   }
}