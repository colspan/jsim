#!/bin/sh
cat prototype_ie_bookmarklet.js keycode.js caret.js JS_IM.js roma.js JS_IM_vje.js | nkf --utf8 > ../bookmarklet/js_im_packed_vje.js 
