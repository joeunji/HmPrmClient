import React, { useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, Vibration, BackHandler} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { useFocusEffect } from '@react-navigation/native';

const QrScan = (props) => {
	const [scan, setScan] = useState(false);
	const onReadQrCode = (event) => {
		if(scan == false)
		{
			Vibration.vibrate(100);
			var strData = event.nativeEvent.codeStringValue;
			let arrData = {...props.route.params};
			arrData.data = strData;
			console.log("------------------------");
			console.log("*onReadQrCode:"+ strData);
			console.log(" -arrData:"+ JSON.stringify(arrData));
			console.log("------------------------");
		
			props.navigation.popTo("Main", arrData);

			setScan(true);
		}
	};
	useEffect(() => {}, []);

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				props.navigation.goBack();
				return true;
			};
			const clsBackEvent = BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () => {
				clsBackEvent.remove();
			};
		}, [])
	);

	if(scan == false)
	{
		return (
			<Camera	style={styles.camera}
				cameraType={CameraType.Back}
				scanBarcode={true}
				showFrame={true}
				laserColor="#ff0000"
				frameColor="#1479ff"
				torchMode="off"
				cameraRatioOverlay={undefined} 
				captureButtonImage={undefined} 
				captureButtonImageStyle={{}} 
				cameraFlipImage={undefined} 
				cameraFlipImageStyle={{}} 
				hideControls={undefined} 
				torchOnImage={undefined} 
				torchOffImage={undefined} 
				torchImageStyle={{}} 
				onReadCode={onReadQrCode}>
			</Camera>	
		)
	}
	else
	{
		return(<View style={styles.container}></View>)
	}
};
export default QrScan;

const styles = StyleSheet.create({
	container	: { flex:1, justifyContent:'center', alignItems:'center', zIndex:0, backgroundColor:"transparent" },
	camera		: { flex:1, justifyContent:'center', alignItems:'center' },
});
