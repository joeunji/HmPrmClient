/**
 * @file	Permission.js
 * @date	2025.02.14
 * @author	yomile
 * @brief	안드로이드 퍼미션 파일
 */
import RNPermissions, {NotificationOption, PERMISSIONS, RESULTS} from 'react-native-permissions';

/**
  * 퍼미션 클래스
  * @author	yomile
  * @version	1.0
  * @see <pre>
  *  == 개정이력(Modification Information) ==
  *   
  *   수정일      수정자           수정내용
  *  -------    --------    ---------------------------
  *   2025.02.14  yomile          최초 생성
  * 
  * </pre>
  */
class Permission
{
	constructor()
	{
	}
}

/**
  * 퍼미션 제어 클래스
  * @author	yomile
  * @version	1.0
  * @see <pre>
  *  == 개정이력(Modification Information) ==
  *   
  *   수정일      수정자           수정내용
  *  -------    --------    ---------------------------
  *   2025.02.14  yomile          최초 생성
  * 
  * </pre>
  */

class PermissionMgr
{
	constructor(arrPermission)
	{
		this.mArrPermission = arrPermission;
	}

	async checkPermission()
	{
		console.log("*PermissionMgr.checkPermission()");		
		let intSuccessCount = 0;
		let intPermissonLength = this.mArrPermission.length;

		console.log(" -Permisson 갯수:"+ intPermissonLength);
		for(let intIndex = 0; intIndex < intPermissonLength; intIndex++)
		{
			let strPermission = this.mArrPermission[intIndex];
			let strStatus = await RNPermissions.check(strPermission);
			console.log(" -퍼미션:"+ strPermission +", 상태:"+ strStatus);
			if(strStatus == RESULTS.GRANTED || strStatus == RESULTS.BLOCKED)
			{
				intSuccessCount++;
			}
		}
		console.log(" -성공건수:"+ intSuccessCount);		
		if(intSuccessCount == intPermissonLength) return true;
		return false;
	}

	async requestMultiple()
	{
		console.log("*PermissionMgr.requestMultiple()");
		return await RNPermissions.requestMultiple(this.mArrPermission);
	}
	async checkRequestMultiple()
	{
		console.log("*PermissionMgr.checkRequestMultiple()");
		const arrResult = await RNPermissions.requestMultiple(this.mArrPermission);
		let intSuccessCount = 0;
		let intPermissonLength = 0;

		Object.keys(arrResult).forEach(strPermission => {
			
			let strStatus = arrResult[strPermission];
			console.log(` -퍼미션: ${strPermission}, 상태:${arrResult[strPermission]}`);
			if(strStatus == RESULTS.GRANTED || strStatus == RESULTS.BLOCKED)
			{
				intSuccessCount++;
			}
			intPermissonLength++;
		});
		console.log(" -요청된퍼미션수:"+ intPermissonLength);	
		console.log(" -checkRequestMultiple, 성공건수:"+ intSuccessCount);		
		if(intSuccessCount == intPermissonLength) return true;
		return false;
	}
}	

Permission.PermissionMgr = PermissionMgr;
export default Permission;