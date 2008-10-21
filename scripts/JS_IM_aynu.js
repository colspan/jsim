var globalKakuteiStr = "";
var globalKouhoStr = "";
var globalKouhoKeys = "";
var globalRegister;

//asciiのままか、変換するか
var isAscii = false;

//半角仮名か、Unicode(のアイヌ語用仮名)か
var isUnicode = false;
//音引き記号を使うのか，それとも全角のminus記号を使うのか
var flagOnbiki = true;
var flagMinus = false;
//句点は縦書き用？横書用？
var flagTateKuten = true;
var flagYokoKuten = false;
//読点は縦書き用？横書用？
var flagTateTouten = true;
var flagYokoTouten = false;

//半角カナを使った変換データ
henkan_data = new Array(
  "xa", "ァ",
  "xi", "ィ",
  "xu", "ゥ",
  "xe", "ェ",
  "xo", "ォ",
  "xka", "ヵ",
  "xku", "ｸ",
  "xke", "ヶ",
  "xsu","ｽ",
  "xtu", "ﾂ",
  "xto", "ﾄ",
  "xn", "ﾝ",
  "xha", "ﾊ",
  "xhi", "ﾋ",
  "xhu", "ﾌ",
  "xhe", "ﾍ",
  "xho", "ﾎ",
  "xm", "ﾑ",
  "xya", "ャ",
  "xyu", "ュ",
  "xyo", "ョ",
  "xra", "ﾗ",
  "xri", "ﾘ",
  "xru", "ﾙ",
  "xre", "ﾚ",
  "xro", "ﾛ",
  "xw", "ゥ",
  "xp", "ﾌﾟ",

  "ra", "ラ",
  "ri", "リ",
  "ru", "ル",
  "re", "レ",
  "ro", "ロ",
  "ラr", "ラﾗ",
  "リr", "リﾘ",
  "ルr", "ルﾙ",
  "レr", "レﾚ",
  "ロr", "ロﾛ",
  "ar", "aﾗ",
  "ir", "iﾘ",
  "ur", "uﾙ",
  "er", "eﾚ",
  "or", "oﾛ",
  "ha", "ハ",
  "hi", "ヒ",
  "hu", "フ",
  "he", "ヘ",
  "ho", "ホ",

  // 以下の15行も樺太用ですが北海道のテキスト処理の邪魔にはなりません。
  "ハh", "ハﾊ",
  "ヒh", "ヒﾋ",
  "フh", "フﾌ",
  "ヘh", "ヘﾍ",
  "ホh", "ホﾎ",
  "ラh", "ラﾊ",
  "リh", "リﾋ",
  "ルh", "ルﾌ",
  "レh", "レﾍ",
  "ロh", "ロﾎ",
  "ah", "aﾊ",
  "ih", "iﾋ",
  "uh", "uﾌ",
  "eh", "eﾍ",
  "oh", "oﾎ", //樺太用はここまで

  "mp", "ンp",
  "mm", "ンm",
  "pp", "ッp",
  "tt", "ッt",
  "cc", "ッc",
  "kk", "ッk",
  "ss", "ッs",

  "ztu", "ツ",
  "Tsu", "ツ",
  "Ztu", "ツﾟ",
  "TSu", "トﾟ",
  "Tu", "ツﾟ",
  "To", "トﾟ",
  "cja", "チャ",
//  "ti", "チ",
  "cju", "チュ",
  "cje", "チェ",
  "cjo", "チョ",
  "Se", "セﾟ",
  "Wi", "ヰ",
  "We", "ヱ",
  "Wo", "ヲ",
  "za", "ザ",
  "zi", "ジ",
  "zu", "ズ",
  "ze", "ゼ",
  "zo", "ゾ",
  "da", "ダ",
  "di", "ヂ",
  "du", "ヅ",
  "de", "デ",
  "do", "ド",
  "ba", "バ",
  "bi", "ビ",
  "bu", "ブ",
  "be", "ベ",
  "bo", "ボ",
  "kja", "キャ",
  "kji", "キィ",
  "kju", "キュ",
  "kje", "キェ",
  "kjo", "キョ",
  "gja", "ギャ",
  "gji", "ギィ",
  "gju", "ギュ",
  "gje", "ギェ",
  "gjo", "ギョ",
  "qa", "クァ",
  "qi", "クィ",
  "qu", "クゥ",
  "qe", "クェ",
  "qo", "クォ",
  "sja", "シャ",
  "sji", "シィ",
  "sju", "シュ",
  "sje", "シェ",
  "sjo", "ショ",
  "zja", "ジャ",
  "zji", "ジィ",
  "zju", "ジュ",
  "zje", "ジェ",
  "zjo", "ジョ",
  "dja", "ヂャ",
  "dji", "ヂィ",
  "dju", "ヂュ",
  "dje", "ヂェ",
  "djo", "ヂョ",
  "zta", "ツァ",
  "ti", "ツィ",
  "zte", "ツェ",
  "zto", "ツォ",
  "nja", "ニャ",
  "nji", "ニィ",
  "nju", "ニュ",
  "nje", "ニェ",
  "njo", "ニョ",
  "hja", "ヒャ",
  "hji", "ヒィ",
  "hju", "ヒュ",
  "hje", "ヒェ",
  "hjo", "ヒョ",
  "fa", "ファ",
  "fi", "フィ",
  "fji", "フィ",
  "fe", "フェ",
  "fje", "フェ",
  "fo", "フォ",
  "fja", "フャ",
  "fju", "フュ",
  "fjo", "フョ",
  "bja", "ビャ",
  "bji", "ビィ",
  "bju", "ビュ",
  "bje", "ビェ",
  "bjo", "ビョ",
  "pja", "ピャ",
  "pji", "ピィ",
  "pju", "ピュ",
  "pje", "ピェ",
  "pjo", "ピョ",
  "mja", "ミャ",
  "mji", "ミィ",
  "mju", "ミュ",
  "mje", "ミェ",
  "mjo", "ミョ",
  "rja", "リャ",
  "rji", "リィ",
  "rju", "リュ",
  "rje", "リェ",
  "rjo", "リョ",
  "Kiw", "キュー",
  "Giw", "ギュー",
  "Siw", "シュー",
  "Ziw", "ジュー",
  "Ciw", "チュー",
  "Diw", "ヂュー",
  "Niw", "ニュー",
  "Hiw", "ヒュー",
  "Biw", "ビュー",
  "Piw", "ピュー",
  "Miw", "ミュー",
  "Riw", "リュー",

  "hi", "ヒ",
  "hu", "フ",
  "fu", "フ",
  "he", "ヘ",
  "ho", "ホ",
  "pa", "パ",
  "pi", "ピ",
  "pu", "プ",
  "pe", "ペ",
  "po", "ポ",
  "ta", "タ",
  "tu", "トゥ",
  "te", "テ",
  "to", "ト",
  "ca", "チャ",
  "ci", "チ",
  "cu", "チュ",
  "ce", "チェ",
  "co", "チョ",
  "ka", "カ",
  "ki", "キ",
  "ku", "ク",
  "ke", "ケ",
  "ko", "コ",
  "sa", "サ",
  "si", "シ",
  "su", "ス",
  "se", "セ",
  "so", "ソ",
  "ma", "マ",
  "mi", "ミ",
  "mu", "ム",
  "me", "メ",
  "mo", "モ",
  "na", "ナ",
  "ni", "ニ",
  "nu", "ヌ",
  "ne", "ネ",
  "no", "ノ",
  "wa", "ワ",
  "wi", "ウィ",
  "wu", "ウ",
  "we", "ウェ",
  "wo", "ウォ",
  "ya", "ヤ",
  "yi", "イ",
  "yu", "ユ",
  "ye", "イェ",
  "yo", "ヨ",
  "'a", "ア",
  "'i", "イ",
  "'u", "ウ",
  "'e", "エ",
  "'o", "オ",

  "a", "ア",
  "i", "イ",
  "u", "ウ",
  "e", "エ",
  "o", "オ",
  "p", "ﾌﾟ",
  "t", "ッ",
  "k", "ｸ",
  "w", "ウ",
  "y", "イ",
  "s", "ｼ",
  "m", "ﾑ",
  "n", "ン"
  ) //↑最後の行の最後にはカンマ「,」をつけてはいけない

//Unicodeの拡張仮名を使った変換データ
henkan_unicode_data = new Array(
  "xa", "ァ",
  "xi", "ィ",
  "xu", "ゥ",
  "xe", "ェ",
  "xo", "ォ",
  "xka", "ヵ",
  "xku", "ㇰ",
  "xke", "ヶ",
  "xsu","ㇲ",
  "xtu", "ッ",
  "xto", "ㇳ",
//  "xn", "ﾝ",
  "xha", "ㇵ",
  "xhi", "ㇶ",
  "xhu", "ㇷ",
  "xhe", "ㇸ",
  "xho", "ㇹ",
  "xm", "ㇺ",
  "xya", "ャ",
  "xyu", "ュ",
  "xyo", "ョ",
  "xra", "ㇻ",
  "xri", "ㇼ",
  "xru", "ㇽ",
  "xre", "ㇾ",
  "xro", "ㇿ",
  "xw", "ゥ",
  "xp", "ㇷ゚",

  "ra", "ラ",
  "ri", "リ",
  "ru", "ル",
  "re", "レ",
  "ro", "ロ",
  "ラr", "ラㇻ",
  "リr", "リㇼ",
  "ルr", "ルㇽ",
  "レr", "レㇾ",
  "ロr", "ロㇿ",
  "ar", "aㇻ",
  "ir", "iㇼ",
  "ur", "uㇽ",
  "er", "eㇾ",
  "or", "oㇿ",
  "ha", "ハ",
  "hi", "ヒ",
  "hu", "フ",
  "he", "ヘ",
  "ho", "ホ",

  // 以下の15行も樺太用ですが北海道のテキスト処理の邪魔にはなりません。
  "ハh", "ハㇵ",
  "ヒh", "ヒㇶ",
  "フh", "フㇷ",
  "ヘh", "ヘㇸ",
  "ホh", "ホㇹ",
  "ラh", "ラㇵ",
  "リh", "リㇶ",
  "ルh", "ルㇷ",
  "レh", "レㇸ",
  "ロh", "ロㇹ",
  "ah", "aㇵ",
  "ih", "iㇶ",
  "uh", "uㇷ",
  "eh", "eㇸ",
  "oh", "oㇹ", //樺太用はここまで

  "mp", "ンp",
  "mm", "ンm",
  "pp", "ッp",
  "tt", "ッt",
  "cc", "ッc",
  "kk", "ッk",
  "ss", "ッs",

  "ztu", "ツ",
  "Tsu", "ツ",
  "Ztu", "ツ゚",
  "TSu", "ト゚",
  "Tu", "ツ゚",
  "To", "ト゚",
  "cja", "チャ",
//  "ti", "チ",
  "cju", "チュ",
  "cje", "チェ",
  "cjo", "チョ",
  "Se", "セ゚",
  "Wi", "ヰ",
  "We", "ヱ",
  "Wo", "ヲ",
  "za", "ザ",
  "zi", "ジ",
  "zu", "ズ",
  "ze", "ゼ",
  "zo", "ゾ",
  "da", "ダ",
  "di", "ヂ",
  "du", "ヅ",
  "de", "デ",
  "do", "ド",
  "ba", "バ",
  "bi", "ビ",
  "bu", "ブ",
  "be", "ベ",
  "bo", "ボ",
  "kja", "キャ",
  "kji", "キィ",
  "kju", "キュ",
  "kje", "キェ",
  "kjo", "キョ",
  "gja", "ギャ",
  "gji", "ギィ",
  "gju", "ギュ",
  "gje", "ギェ",
  "gjo", "ギョ",
  "qa", "クァ",
  "qi", "クィ",
  "qu", "クゥ",
  "qe", "クェ",
  "qo", "クォ",
  "sja", "シャ",
  "sji", "シィ",
  "sju", "シュ",
  "sje", "シェ",
  "sjo", "ショ",
  "zja", "ジャ",
  "zji", "ジィ",
  "zju", "ジュ",
  "zje", "ジェ",
  "zjo", "ジョ",
  "dja", "ヂャ",
  "dji", "ヂィ",
  "dju", "ヂュ",
  "dje", "ヂェ",
  "djo", "ヂョ",
  "zta", "ツァ",
  "ti", "ツィ",
  "zte", "ツェ",
  "zto", "ツォ",
  "nja", "ニャ",
  "nji", "ニィ",
  "nju", "ニュ",
  "nje", "ニェ",
  "njo", "ニョ",
  "hja", "ヒャ",
  "hji", "ヒィ",
  "hju", "ヒュ",
  "hje", "ヒェ",
  "hjo", "ヒョ",
  "fa", "ファ",
  "fi", "フィ",
  "fji", "フィ",
  "fe", "フェ",
  "fje", "フェ",
  "fo", "フォ",
  "fja", "フャ",
  "fju", "フュ",
  "fjo", "フョ",
  "bja", "ビャ",
  "bji", "ビィ",
  "bju", "ビュ",
  "bje", "ビェ",
  "bjo", "ビョ",
  "pja", "ピャ",
  "pji", "ピィ",
  "pju", "ピュ",
  "pje", "ピェ",
  "pjo", "ピョ",
  "mja", "ミャ",
  "mji", "ミィ",
  "mju", "ミュ",
  "mje", "ミェ",
  "mjo", "ミョ",
  "rja", "リャ",
  "rji", "リィ",
  "rju", "リュ",
  "rje", "リェ",
  "rjo", "リョ",
  "Kiw", "キュー",
  "Giw", "ギュー",
  "Siw", "シュー",
  "Ziw", "ジュー",
  "Ciw", "チュー",
  "Diw", "ヂュー",
  "Niw", "ニュー",
  "Hiw", "ヒュー",
  "Biw", "ビュー",
  "Piw", "ピュー",
  "Miw", "ミュー",
  "Riw", "リュー",

  "hi", "ヒ",
  "hu", "フ",
  "fu", "フ",
  "he", "ヘ",
  "ho", "ホ",
  "pa", "パ",
  "pi", "ピ",
  "pu", "プ",
  "pe", "ペ",
  "po", "ポ",
  "ta", "タ",
  "tu", "トゥ",
  "te", "テ",
  "to", "ト",
  "ca", "チャ",
  "ci", "チ",
  "cu", "チュ",
  "ce", "チェ",
  "co", "チョ",
  "ka", "カ",
  "ki", "キ",
  "ku", "ク",
  "ke", "ケ",
  "ko", "コ",
  "sa", "サ",
  "si", "シ",
  "su", "ス",
  "se", "セ",
  "so", "ソ",
  "ma", "マ",
  "mi", "ミ",
  "mu", "ム",
  "me", "メ",
  "mo", "モ",
  "na", "ナ",
  "ni", "ニ",
  "nu", "ヌ",
  "ne", "ネ",
  "no", "ノ",
  "wa", "ワ",
  "wi", "ウィ",
  "wu", "ウ",
  "we", "ウェ",
  "wo", "ウォ",
  "ya", "ヤ",
  "yi", "イ",
  "yu", "ユ",
  "ye", "イェ",
  "yo", "ヨ",
  "'a", "ア",
  "'i", "イ",
  "'u", "ウ",
  "'e", "エ",
  "'o", "オ",

  "a", "ア",
  "i", "イ",
  "u", "ウ",
  "e", "エ",
  "o", "オ",
  "p", "ㇷ゚",
  "t", "ッ",
  "k", "ㇰ",
  "w", "ウ",
  "y", "イ",
  "s", "ㇱ",
  "m", "ㇺ",
  "n", "ン"
  ) //↑最後の行の最後にはカンマ「,」をつけてはいけない

function myinit() {
  globalReplacethis = new RegExp("","g");
  browser_detect()
//  document.onkeypress = kpress;
//  document.onkeydown = kdown;
  input_onbiki();
  input_tatekuten();
  input_tatetouten();
  input_henkan();
}

function isBoin (mykey) {
  if("aiueo".indexOf(mykey) < 0) return false;
  return true;
}

function isSiin (mykey) {
  if("'kstnhmyrwcjxgzdbpqfKSTNHMYRWCJXGZDBPQF".indexOf(mykey) < 0) return false;
  return true;
}

function fromAsciiToUnicode(mystr) {
  if(isUnicode) {
    return henkan(mystr, henkan_unicode_data);
  } else {
    return henkan(mystr, henkan_data);
  }
}

function henkan(current_text, from_to_data) {
  var i;
  var in_string, out_string;
  var after_text;
  for(i=0; i < from_to_data.length; i=i+2) {
    in_string = from_to_data[i];
    out_string = from_to_data[i+1];
    globalReplacethis.compile(in_string, "g");
    current_text = current_text.replace(globalReplacethis, out_string);
  }
  return current_text;
}

// 未確定文字列 globalKouhoStr
// その対応するキー列 globalKouhoKeys
// 今入力されたキー  mykey

function globalUnicodeStrPlusKey(mykey){
  if(isBoin(mykey) || isSiin(mykey)) {
    globalKouhoStr = fromAsciiToUnicode(globalKouhoKeys + mykey);
    globalKouhoKeys = globalKouhoKeys + mykey;
  } else {
    globalKakuteiStr = globalKakuteiStr + globalKouhoStr + mykey;
    globalKouhoStr = globalKouhoKeys = "";
  }
}

function globalKakutei() {
  globalKakuteiStr = globalKakuteiStr + globalKouhoStr;
  globalKouhoStr = "";
  globalKouhoKeys = "";
}


//現在の入力モードを記憶する
var isAynuInputMode;

//テキスト長を記憶する．
//keyup時のテキスト長との差が１の時のみハングル変換を実行するため．
var lastTextLength;

//入力モードの初期化
function start_function() {
  set_input_aynu();
}

// 最初，onkeypressイベントを利用していました．
// Internet Explorerではkeypressイベントの後でテキストエリアに入力されましたが，
// Linux上のMozillaではテキストエリアに文字入力の後でkeypressイベントが発生して，
// うまく動きませんでした．
// そこで，keydownイベントを利用するようにしたら，動きました．
function kdown() {
  lastTextLength = document.ans_form.ans.value.length; //テキスト長を記憶
}

function kup() {
  mytext = document.ans_form.ans.value;
// lastTextLength + 一文字 = mytext.length ならば，キー入力があったとみなして，
// romaji->kana変換をする．
// 逆にいえば，lastTextLength != mytext.length - 1 なら，romaji->kana変換はしない
  if(lastTextLength != (mytext.length - 1)) return; 
  if(mytext.length <= 0) return; //BackSpaceを押した時の対策
  mykey = mytext.substring(mytext.length - 1, mytext.length);
  mytext = mytext.substring(0, mytext.length - 1);

  if(globalKakuteiStr + globalKouhoStr != mytext) {
    globalKakuteiStr = mytext;
    globalKouhoStr = globalKouhoKeys = "";
  }
  if(document.ans_form.use_unicode.checked) {
    isUnicode = true;
  } else {
    isUnicode = false;
  }

  mykey = keyTranslate(mykey);

  if(!isAscii) {
    globalUnicodeStrPlusKey(mykey);
  } else {
//    globalKakuteiStr = globalKakuteiStr + globalKouhoStr + mykey;
    globalKakuteiStr = globalKakuteiStr + globalKouhoStr;
    globalKouhoStr = globalKouhoKeys = "";
  }
  document.ans_form.ans.value = globalKakuteiStr + globalKouhoStr;
  lastTextLength = document.ans_form.ans.value.length; //テキスト長を記憶
}

function delete_one() {
  if(globalKakuteiStr + globalKouhoStr != mytext) {
    globalKakuteiStr = mytext;
    globalKouhoStr = globalKouhoKeys = "";
  }
  if(globalKouhoKeys.length > 0) {
    globalKouhoKeys = globalKouhoKeys.substring(0, globalKouhoKeys.length - 1);
    globalKouhoStr = fromAsciiToUnicode(globalKouhoKeys);
  } else {
    globalKakuteiStr = globalKakuteiStr.substring(0, globalKakuteiStr.length - 1);
  }
  document.ans_form.ans.value = globalKakuteiStr + globalKouhoStr;
  document.ans_form.ans.focus();
}

function select_all() {
  document.ans_form.ans.focus();
  document.ans_form.ans.select();
}

function clear() {
  document.ans_form.ans.value = "";
  document.ans_form.ans.focus();
}

function set_input_aynu() {
  lastTextLength = document.ans_form.ans.value.length; //テキスト長を記憶
  isAynuInputMode = true;
  document.ans_form.input_mode[1].checked = true;
  document.onkeydown = kdown;
  document.onkeyup = kup;
  document.ans_form.ans.focus();
}


function change_input_mode() {
  if(isAynuInputMode == true) {
    set_input_ascii();
  } else {
    set_input_aynu();
  }
}

function no_kdown(){}
function no_kup(){}

function clear() {
  globalKakuteiStr = globalKouhoStr = globalKouhoKeys = "";
}

function delete_one() {
  if(globalKouhoKeys.length > 0) {
    globalKouhoKeys = globalKouhoKeys.substring(0, globalKouhoKeys.length - 1);
    globalKouhoStr = fromAsciiToUnicode(globalKouhoKeys);
  } else {
    globalKakuteiStr = globalKakuteiStr.substring(0, globalKakuteiStr.length - 1);
  }
}


function keyTranslate(mykey) {
  if(mykey == "-" && flagOnbiki) return "ー";
  if(mykey == "-" && flagMinus) return "−";
  if(mykey == "," && flagTateKuten) return "、";
  if(mykey == "," && flagYokoKuten) return "，";
  if(mykey == "." && flagTateTouten) return "。";
  if(mykey == "." && flagYokoTouten) return "．";
  return mykey;
}

function input_onbiki() {
  flagOnbiki = true;
  flagMinus = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("onbikimode", "音引き記号［ー］");
}

function input_fullwidthminus() {
  flagOnbiki = false;
  flagMinus = true;
  if(br_check == 1 || br_check == 3) set_innerHTML("onbikimode", "全角マイナス［−］");
}

function input_no_onbiki() {
  flagOnbiki = false;
  flagMinus = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("onbikimode", "半角文字［-］");
}

function input_yokokuten() {
  flagYokoKuten = true;
  flagTateKuten = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("kutenmode", "全角横書き［，］");
}

function input_tatekuten() {
  flagYokoKuten = false;
  flagTateKuten = true;
  if(br_check == 1 || br_check == 3) set_innerHTML("kutenmode", "全角縦書き［、］");
}

function input_no_kuten() {
  flagYokoKuten = false;
  flagTateKuten = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("kutenmode", "半角記号［,］");
}

function input_yokotouten() {
  flagYokoTouten = true;
  flagTateTouten = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("toutenmode", "全角横書き［．］");
}

function input_tatetouten() {
  flagYokoTouten = false;
  flagTateTouten = true;
  if(br_check == 1 || br_check == 3) set_innerHTML("toutenmode", "全角縦書き［。］");
}

function input_no_touten() {
  flagYokoTouten = false;
  flagTateTouten = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("toutenmode", "半角記号［.］");
  document.ans_form.ans.focus();
}

function input_henkan() {
  globalKakutei();
  document.onkeydown = kdown;
  document.onkeyup = kup;
  isAscii = false;
  if(br_check == 1 || br_check == 3) set_innerHTML("asciimode", "アイヌ語カナ");
  document.ans_form.ans.focus();
}

