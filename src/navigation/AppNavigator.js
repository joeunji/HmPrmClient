/**
 * @file	AppNavigator.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	앱의 네비게이션 관련 파일
 */
import React from "react";
import { Platform } from 'react-native';
import moment from 'moment';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { connect } from 'react-redux'
import DeviceInfo from "react-native-device-info";
import { setAppData, loadAppDataFromStorage } from "~/redux/actions/appDataAction";
import mosaic from '~/common/libs/mosaic/mosaic';
import {fcmService} from "../services/FcmService"
import {notificationService} from "../services/NotificationService"
import Main from "~/screens/Main";
import QrScan from '~/screens/QrScan';
import Permission from "~/screens/Permission";
import NewScreen from "~/screens/NewScreen";
import { pushMsgArrived } from '~/redux/actions/pushDataAction'
const RootStack = createStackNavigator();


/**
 * 앱의 네비게이션을 관리하는 클래스
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
class AppNavigator extends React.Component
{
	/**
	 * 생성자
	 * @param {*} props  프로퍼티
	 */	
	constructor(props)
	{
		super(props);
		this.mStrDeviceId = null;
		this.state = {
			isLoading : false,
			
		};
	}		

	async componentDidMount()
	{
		console.log("*AppNavigator componentDidMount");
		this.mStrDeviceId = await mosaic.getDeviceId();

		await this.loadAppData();
		await this.startFcmService();
		await this.setState({ isLoading: true });
	}
	
	async loadAppData()
	{
		console.log("*AppNavigator.loadAppData()");
		await this.props.dispatch(loadAppDataFromStorage());
	}

		/**
	 * FCM 서비스를 실행한다.
	 */
	async startFcmService()
	{
		console.log("*AppNavigator.startFcmService()");
		await fcmService.register(this.onFcmRegister, this.onNotification, this.onFcmOpenNotification);
		await notificationService.configure(this.onNotiOpenNotification);	
	}


	/**
	 * FCM 서비스 등록시 수신된 등록 이벤트
	 * @param {*} strToken  토큰정보
	 */
	onFcmRegister = async(strToken) =>
	{
		
		console.log("===================================");
		console.log("*AppNavigator.onFcmRegister()");
		let objData = {
			deviceId	: this.mStrDeviceId, 
			deviceModel	: DeviceInfo.getModel(),
			appVersion	: DeviceInfo.getVersion(),
			osType		: Platform.OS, 
			osVersion	: DeviceInfo.getSystemVersion(),
			pushTokenId	: strToken
		};
		console.log(" objData:"+ JSON.stringify(objData));
		console.log("===================================");
		this.props.dispatch(setAppData(objData));
		
	}

	
	/**
	 * FCM 서비스로 부터 수신한 포그라운드 메시지
	 * @param {*} objData  수신된데이터
	 */	
	onNotification = async(remoteMessage) =>
	{
		console.log("*AppNavigator.onNotification(), remoteMessage:"+ JSON.stringify(remoteMessage));


		let objData = remoteMessage.data;
		let intNotiMode = objData.nom;		// 통지방식
		let strCmdType = objData.cmt;		// 명령구분 
		let strPublishDate = objData.sdt;	// 전송일시
	 
		console.log(" -통지방식:" + intNotiMode);
		console.log(" -명령구분:" + strCmdType);
		console.log(" -전송일자:" + strPublishDate);
		console.log(" -메세지 :" + objData.msg);
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
			console.log("-1시간보다 오래 보관된 메시지 여서 패스");
			return;
		} 

		// if(mosaic.string.isNullOrEmpty(objData.ref) == false) 
		// {
		// 	console.log("-화면으로 이동,Ref:"+ objData.ref +",MsgKey:" + objData.msk);
		// 	NaviService.navigate(objData.ref, objData.msk);
		// }
			

		const arrOptions = {
			soundName : 'default',
			playSound : true,
			largeIcon : 'ic_notification',
			smallIcon : 'ic_notification' 
		};
		notificationService.showNotification(0, objData.tit, objData.msg, objData, arrOptions);	
	}

	/**
	 * 앱은 실행중이지만, 백그운드 상태일때 수신되는 메시지
	 * 
	 * @param {*} objData 수신된데이터
	 */
	onFcmOpenNotification = (objData) =>
	{
	}

	

	/**
	 * 노티피케이션을 클릭했을때 수신되는 이벤트
	 * @param {*} arrData 수신된데이터
	 */
	onNotiOpenNotification = async(objData) =>
	{
		//console.log("====================================");
		console.log("AppNavigator.onOpenNotification(), notify: "+ JSON.stringify(objData));
		//console.log("====================================");
		// //alert(JSON.stringify(arrData));
		// let strCmdType = objData.cmt;		// 명령구분 

		//await this.setPushLinkUrl(objDta);
		this.props.dispatch(pushMsgArrived(objData));
	}		

	async componentWillUnmount()
	{
		await fcmService.unRegister();
		await notificationService.unregister();
	}

	
	/**
	 * 렌더
	 * @returns 
	 * 
	 */
	render()
	{
		const {checkPermission, androidPermissions, iosPermissions  } = this.props.appData;
		console.log("*AppNavigator.render()");
		console.log(" -checkPermission:"+ checkPermission);
		console.log(" -androidPermissions.length:"+ androidPermissions.length);
		console.log(" -iosPermissions.length:"+ iosPermissions.length);

		let boolCheckPermission = checkPermission;
		// 이젠 퍼미션이 한개라도 있으므로 바이패스할이유가 없엇 주석처리 
		//if(androidPermissions.length == 0 && iosPermissions.length == 0) boolCheckPermission = true;	// 퍼미션 체크안함 
		console.log(" -this.state.isLoading:"+ this.state.isLoading);
		if(this.state.isLoading)
		{
			return (
				<RootStack.Navigator initialRouteName="Main" screenOptions={{ headerTitleStyle: { fontWeight: 'bold' }, ...TransitionPresets.SlideFromRightIOS,}}>
					<RootStack.Screen name="Main" component={boolCheckPermission ? Main : Permission} 
						initialParams={{deviceId : this.mStrDeviceId}}
						options={{ headerShown: false}}/>
					<RootStack.Screen name="QrScan"	component={QrScan} options={{headerShown : Platform.OS === 'ios'}} />
					<RootStack.Screen name="NewScreen" component={NewScreen} options={{ headerShown: false}}/>		
				</RootStack.Navigator>
			);
		}
		else
		{
			return (<></>)
		}
	}	
}

const mapStateToProps = (state, ownProps) => {
	return {
		appData			: state.appData
	}
}
export default connect(mapStateToProps)(React.memo(AppNavigator));

