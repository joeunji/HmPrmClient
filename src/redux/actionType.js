
/**
 * @file	actionType.js
 * @date	2021.09.06
 * @author	yomile
 * @brief	Redux의 액션 타입 파일
 */

//===================================================================
// 다이얼로그
//-------------------------------------------------------------------
export const SHOW_DIALOG = "show_dialog";
export const HIDE_DIALOG = "hide_dialog";
export const SHOW_MSG_DIALOG = "show_message_dialog";
export const HIDE_MSG_DIALOG = "hide_message_dialog";
//===================================================================


//===================================================================
// App Data
//-------------------------------------------------------------------
export const SET_APP_DATA			= "set_app_data";
export const SET_CHECK_PERMISSION	= "set_check_permission";
export const SET_STATUS_BAR			= "set_status_bar";
export const SET_STATUS_BAR_COLOR	= "set_status_bar_color";
//===================================================================

//===================================================================
// 푸시 데이터
//-------------------------------------------------------------------
export const PUSH_MSG_ARRIVED	= "push_msg_arrived";
export const PUSH_MSG_INIT		= "push_msg_init";
//===================================================================