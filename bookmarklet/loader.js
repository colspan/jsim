// 3.10以前にのみ適用可能

function hangul_ime_loader( url ){
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.charset = 'utf-8'; s.src = url;
	document.body.appendChild(s);
}
hangul_ime_uri = 'http://colspan.net/hangulime_stable/';
//hangul_ime_uri = './';
if( typeof(hangul_ime_loaded) == 'undefined' ){
	hangul_ime_loader( hangul_ime_uri + 'scripts/browser.js' );
	hangul_ime_loader( hangul_ime_uri + 'scripts/keycode.js' );
	hangul_ime_loader( hangul_ime_uri + 'scripts/selectionSupport.js' );
	hangul_ime_loader( hangul_ime_uri + 'scripts/JS_IM.js' );
	hangul_ime_loader( hangul_ime_uri + 'scripts/johab.js' );
	hangul_ime_loader( hangul_ime_uri + 'scripts/JS_IM_hangul.js' );
	hangul_ime_loader( hangul_ime_uri + 'bookmarklet/execute.js' );
}
else{
	hangul_ime_toggle();
}

