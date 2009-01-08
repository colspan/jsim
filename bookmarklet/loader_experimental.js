
if( typeof( JS_IM_Core_Loaded ) == 'undefined' ){

	function JS_IM_B_JSLoader( url ){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.language = 'javascript';
//		s.charset = 'utf-8';
		s.src = JS_IM_URL_Prefix + url;
		var rc = document.body.appendChild(s);
	}
	function JS_IM_B_StyleLoader(){
		var url = JS_IM_URL_Prefix + 'style/style.css';
		var s = document.createElement('link');
		s.rel = 'stylesheet';
		s.href = url;
		document.body.appendChild(s);
	}

	function JS_IM_B_Load( methodName ){
		var i,l;
		var srcPrefix = 'scripts/';

		if( methodName == null ) return;

		if( typeof( JS_IM_Core_Loaded ) == 'undefined' ){
			for( i = 0, l = JS_IM_Src.core.length; i < l; i++ ){
				JS_IM_B_JSLoader( srcPrefix + JS_IM_Src.core[i] );
			}
			JS_IM_B_StyleLoader();
			JS_IM_Core_Loaded = true;
		}
		if( JS_IM_Src[methodName] && ! JS_IM_Loaded[methodName] ){
			if( JS_IM_CurrentMethod != null ) JS_IM_B_Disable();
			for( i = 0, l = JS_IM_Src[methodName].length; i < l; i++ ){
				JS_IM_B_JSLoader( srcPrefix + JS_IM_Src[methodName][i] );
			}
			JS_IM_Loaded[methodName] = true;
		}

		if( JS_IM_CurrentMethod != methodName ){
			JS_IM_CurrentMethod = methodName;
			setTimeout( 'JS_IM_B_Execute( "' + methodName + '" )', 1000 );
		}
		else{
			JS_IM_B_Toggle();
		}
	}

	function JS_IM_B_Execute( methodName ){
		if( ! JS_IM_Loaded[methodName] ) return false;
		var textareas = document.getElementsByTagName('textarea');
		var inputs = document.getElementsByTagName('input');
		var i;
		for( i=0;i<textareas.length;i++ ) textareas[i].JS_IM_Obj = new JS_IM( textareas[i], eval( "JS_IM_" + methodName ) );
		for( i=0;i<inputs.length;i++) if( inputs[i].type == "text" ) inputs[i].JS_IM_Obj = new JS_IM( inputs[i], eval( "JS_IM_" + methodName ) );
	}
	function JS_IM_B_Toggle(){
		var textareas = document.getElementsByTagName('textarea');
		var inputs = document.getElementsByTagName('input');
		var i;
		for( i=0;i<textareas.length;i++ ) textareas[i].JS_IM_Obj.toggle();
		for( i=0;i<inputs.length;i++) if( inputs[i].type == "text" ) inputs[i].JS_IM_Obj.toggle();
	}
	function JS_IM_B_Disable(){
		var textareas = document.getElementsByTagName('textarea');
		var inputs = document.getElementsByTagName('input');
		var i;
		for( i=0;i<textareas.length;i++ ) textareas[i].JS_IM_Obj.disable();
		for( i=0;i<inputs.length;i++) if( inputs[i].type == "text" ) inputs[i].JS_IM_Obj.disable();
	}

	JS_IM_Src = {};
	JS_IM_Src.core = new Array(
		'prototype.js',
		'keycode.js',
		'caret.js',
		'JS_IM.js'
	);
	
	JS_IM_Src.hangul = new Array(
		'johab.js',
		'JS_IM_hangul.js'
	);

	JS_IM_Src.vje = new Array(
		'roma.js',
		'JS_IM_vje.js'
	);

	JS_IM_Loaded = {};
	JS_IM_CurrentMethod = null;

	JS_IM_URL_Prefix = 'http://colspan.net/hangulime/';
	JS_IM_URL_Prefix = './';
	JS_IM_AutoLoadMethod = 'hangul'; // autoload

	JS_IM_B_Load( JS_IM_AutoLoadMethod );


}


