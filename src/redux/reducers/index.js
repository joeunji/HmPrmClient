/**
 * @file	index.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	다이얼로그에 대한 Redux 인덱스 파일
 */

import { combineReducers } from 'redux'
import dialogReducer from './dialogReducer'
import appDataReducer from './appDataReducer'
import pushDataReducer from './pushDataReducer'

export default combineReducers({
	dialogData		: dialogReducer,
	appData			: appDataReducer,
	pushData		: pushDataReducer
})
