#!/bin/sh
cat prototype_ie_bookmarklet.js keycode.js caret.js JS_IM.js johab.js JS_IM_hangul.js | nkf --utf8 > ../bookmarklet/js_im_packed_hangul.js
