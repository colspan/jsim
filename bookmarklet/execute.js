if( typeof(hangul_ime_loaded) == 'undefined' ){
	hangul_ime_execute();
	hangul_ime_loaded = true;
}
function hangul_ime_execute(){
	var textareas = document.getElementsByTagName('textarea');
	var inputs = document.getElementsByTagName('input');
	var i;
	for( i=0;i<textareas.length;i++ ) textareas[i].hangulObj = new JS_IM( textareas[i], JS_IM_hangul );
	for( i=0;i<inputs.length;i++) if( inputs[i].type == "text" ) inputs[i].hangulObj = new JS_IM( inputs[i], JS_IM_hangul );
	hangul_ime_credit_create();
	hangul_ime_state = true;
}
function hangul_ime_toggle(){
	var textareas = document.getElementsByTagName('textarea');
	var inputs = document.getElementsByTagName('input');
	var i;
	for( i=0;i<textareas.length;i++ ) textareas[i].hangulObj.toggle();
	for( i=0;i<inputs.length;i++) if( inputs[i].type == "text" ) inputs[i].hangulObj.toggle();
	var credit_obj = document.getElementById("hangul_ime_credit");
	credit_obj.style.visibility = ( credit_obj.style.visibility == "hidden" ? "visible" : "hidden" );
	credit_obj.style.right = "10px";
	credit_obj.style.bottom = "10px";
}

function hangul_ime_credit_create(){
	var url = "http://colspan.net/hangulime/credit.html";
	var c = document.createElement('iframe');
	c.id = "hangul_ime_credit";
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

