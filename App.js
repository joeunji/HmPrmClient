/**
 * @file	App.js
 * @date	2026.04.01
 * @author	yomile
 * @brief	앱 구성 파일
 */

import React, { Component } from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from 'react-redux'

import store from "./src/redux/configureStore";
import {Dialog} from "./src/components/dialog";

import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import mosaic from '~/common/libs/mosaic/mosaic';
import {notificationService} from "./src/services/NotificationService"
import { pushMsgArrived } from '~/redux/actions/pushDataAction'
//const store = configureStore();

/**
 * 파이어베이스 백그라운드 푸시 메시지 수신
 * @param remoteMessage 서버로 부터 수신된 메시지
 */

messaging().setBackgroundMessageHandler(async remoteMessage => {
	console.log('파이어베이스 푸시 수신(백그라운드):'+ JSON.stringify(remoteMessage));

	let objData = remoteMessage.data;
	let intNotiMode = objData.nom;		// 통지방식
	let strCmdType = objData.cmt;		// 명령구분 
	let strPublishDate = objData.sdt;	// 전송일시

	console.log(" -통지방식:" + intNotiMode);
	console.log(" -명령구분:" + strCmdType);
	console.log(" -전송일자:" + strPublishDate);
	console.log(" -메세지:" + objData.msg);

	let lngDiffSecond = 0;
		
	if(mosaic.string.isNullOrEmpty(strPublishDate) == false)
	{
		const dtPublishDate = moment(strPublishDate, "YYYYMMDDHHmmss").toDate();
		lngDiffSecond = (new Date() - dtPublishDate) / 1000;
		console.log(" -시간차(초):" + lngDiffSecond);
	}

	// 시간차가 1시간(3600초)보다 크면 메시지창을 띄우지 않고 리턴한다.
	if(lngDiffSecond >= 3600)
	{
		console.log(" -1시간보다 오래 보관된 메시지 여서 패스");
		return;
	}
	
	store.dispatch(pushMsgArrived(objData));
	const arrOptions = {
		soundName : 'default',
		playSound : true,
		largeIcon : 'ic_notification',
		smallIcon : 'ic_notification' 
	};
	notificationService.showNotification(0, objData.tit, objData.msg, objData, arrOptions);	
});

/**
  * 앱에 대한 구성을 관리하는 클래스
  * @author	yomile
  * @version	1.0
  * @see <pre>
  *  == 개정이력(Modification Information) ==
  *   
  *   수정일      수정자           수정내용
  *  -------    --------    ---------------------------
  *  2026.04.01  yomile          최초 생성
  * 
  * </pre>
  */
 class App extends Component
 {
	/**
	* 생성자
	* @param {*} props  프로퍼티
	*/
	constructor(props)
	{
		super(props);
	}

	
	/**
	 * 렌더
	 * @returns 
	 */
	render()
	{
		return (
			<Provider store={store}>
				<SafeAreaProvider>
					<NavigationContainer>
						<AppNavigator />
					</NavigationContainer>
					<Dialog />
				</SafeAreaProvider>
			</Provider>
		);
	}
 }
 export default App; 