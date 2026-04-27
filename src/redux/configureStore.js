/**
 * @file	configureStore.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	Redux 스토어 파일
 */

/*
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';

import rootReducer from './reducers/index';


export default configureStore = (initialState = {}) => {

	console.log("*configureStore");
	const middleware = compose(applyMiddleware(thunk));
	return createStore(rootReducer, initialState, middleware)
}
*/

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // combineReducers로 만든 리듀서

const store = configureStore({
	reducer: rootReducer,
	// 필요한 경우, 미들웨어 추가도 가능
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

export default store;