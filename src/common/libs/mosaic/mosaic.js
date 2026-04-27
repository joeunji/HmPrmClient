import string from "~/common/libs/mosaic/mosaic.string.js"
import timer from "~/common/libs/mosaic/mosaic.timer.js"
import HashMap from "~/common/libs/mosaic/mosaic.hashmap.js"
import permission from "~/common/libs/mosaic/mosaic.permisson.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
class Mosaic
{
	constructor()
	{
	}

	static async getDeviceId()
	{
		let strDeviceId = await AsyncStorage.getItem("deviceId");
		if (strDeviceId == null)
		{
			strDeviceId = uuid.v4();
			await AsyncStorage.setItem("deviceId", strDeviceId);
		}
		return strDeviceId;
	}	
}

Mosaic.string = string;
Mosaic.timer = timer;
Mosaic.HashMap = HashMap;
Mosaic.permission = permission;

export default Mosaic;