/**
 * @file	NavigationService.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	내비게이션(화면이동) 관련 서비스 파일
 */
import * as React from 'react';

export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

/**
 * 내비게이션(화면이동) 관련 함수
 * @param {*} name  이동할화면
 * @param {*} params 파라미터
 */
function navigate(name, params)
{
	//console.log("*NavigationService.navigate");
	if (navigationRef.current)
	{
		navigationRef.current?.navigate(name, params);
	}
}

export default { navigate };

