
class String
{
	constructor()
	{
	}

	static isNullOrEmpty(strText)
	{
		var strResult = false;
		if (typeof (strText) == "undefined" || strText == null || strText == "") strResult = true;
		return strResult;
	}

	static getByteLength(bstr)
	{
		var len = bstr.length;
		for (var ii = 0; ii < bstr.length; ii++) {
			var xx = bstr.substr(ii, 1).charCodeAt(0);
			if (xx > 127) { len++; }
		}
		return len;

	}

	static cut(strSrcText, intLength, strOmitMark)
	{
		if (strSrcText != null && strSrcText != "") {
			var l = 0;
			for (var intIndex = 0; intIndex < strSrcText.length; intIndex++) {
				l += (strSrcText.charCodeAt(intIndex) > 128) ? 2 : 1;
				if (l > intLength) return strSrcText.substring(0, intIndex) + strOmitMark;
			}
		}
		return strSrcText;
	}

	// 문자열의 정해진 길이만큼 나머지부분을 특정한 문자로 채워서 반환하는 함수
	static lPad(psStr, piLen, psSeed) {
		if (psSeed == null) psSeed = '0';

		return pad(psStr, piLen, psSeed, 'left');
	}

	// 문자열의 정해진 길이만큼 나머지부분을 특정한 문자로 채워서 반환하는 함수
	static rPad(psStr, piLen, psSeed) {
		if (psSeed == null) psSeed = '0';

		return pad(psStr, piLen, psSeed, 'right');
	}

	static pad(psStr, piLen, psSeed, psTag) {
		var sRtnStr = psStr.toString();
		psSeed = psSeed.toString();
		

		if (getByteLength(psSeed) != 1) return sRtnStr;

		for (var i = 0; i < (piLen - getByteLength(psStr.toString())); i++)
		{
			sRtnStr = (psTag == 'left' ? psSeed + sRtnStr : sRtnStr + psSeed);
		}
		return sRtnStr;
	}

	static encodeText(str) {
		str = encodeURI(str);
		str = str.replace(new RegExp("&", 'g'), "%26");
		str = str.replace(new RegExp(";", 'g'), "%3B");
		str = str.replace(new RegExp("[?]", 'g'), "%3F");
		return str;
	}

	static lf2Br(strSource) {
		strSource = strSource.replace(/\n/g, "<br />");
		return strSource;
	}

	static toComma(strSource) {
		return strSource.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	static getTextLength = function (strText) {
		if (strText == null || strText == "") return 0;
		var intIndex;
		var intLength = 0;
		var intTextLength = strText.length;

		// 한글 2바이트 기준으로 변경, 2017.09.25
		for (intIndex = 0; intIndex < intTextLength; intIndex++) {
			var chrCurChar = escape(strText.charAt(intIndex));
			if (chrCurChar.length == 1) {
				intLength++;
			}
			else if (chrCurChar.indexOf("%u") != -1) {
				intLength += 2;
			}
			else if (chrCurChar.indexOf("%") != -1) {
				intLength++;
			}
		}

		return intLength;
	};
}
export default String;
