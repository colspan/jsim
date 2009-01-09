//    Hangul IME Bookmarklet Loader
//        by Colspan (Miyoshi)
//         http://colspan.net/

if( typeof( JS_IM_Core_Loaded ) == 'undefined' ){

	function JS_IM_B_JSLoader( url ){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.language = 'javascript';
//		s.charset = 'utf-8';
		s.src = url;
		var rc = document.body.appendChild(s);
	}
	function JS_IM_B_StyleLoader(){
		var url = JS_IM_URL_Prefix + 'style/style.css';
		var s = document.createElement('link');
		s.rel = 'stylesheet';
		s.href = url;
		document.body.appendChild(s);
	}

	function JS_IM_B_Execute( methodName ){
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
	
	function JS_IM_credit_create(){
		var url = "http://colspan.net/japaneseime/credit.html";
		var c = document.createElement('iframe');
		c.id = "japanese_ime_credit";
		c.style.border = "solid 1px #808080";
		c.style.position = "absolute";
		c.style.width = "300px";
		c.style.height = "90px";
		c.style.right = "10px";
		c.style.bottom = "10px";
		c.style.background = "white";
		c.src = url;
		document.body.appendChild(c);
	}


	JS_IM_URL_Prefix = 'http://colspan.net/japaneseime/';
//	JS_IM_URL_Prefix = './';

	JS_IM_Core_Loaded = true;

//	JS_IM_B_JSLoader( 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.2/prototype.js' );
//	JS_IM_B_JSLoader( 'scripts/prototype.js' );
	JS_IM_B_JSLoader( JS_IM_URL_Prefix + "bookmarklet/js_im_packed_vje.js" );
	JS_IM_B_StyleLoader();

	JS_IM_credit_create();

	setTimeout( 'JS_IM_B_Execute( "vje" )', 2000 );

}
else{
	JS_IM_B_Toggle();
}

