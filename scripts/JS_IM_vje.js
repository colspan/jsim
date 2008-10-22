//////////////////////////////////
//
//    JS IM vje
//        by Colspan (Miyoshi)
//         http://colspan.net/
//        License : MIT license
//
// depend roma.js,JSIM.js,prototype.js
var JS_IM_vje = {
  methodName : "jsvje",
  version : "20081021",
  language : "Japanese",
  author : "Colspan",
  params : {
    listBox : true,
    inlineInsertion : false
  },
  extension : {
    result : null,
    convert : function(){
      if( this.methodObj.inlineBuffer != "" ){ // 変換処理開始
        JS_IM_YahooAPI.VJE.convert( this.methodObj.inlineBuffer, this.methodObj );
      }
    },
    receive : function( data ){ // callback
      if( this.methodObj.phase != 'wait' ) return; // 待ち状態じゃなかったら無視する
      this.methodObj.phase = 'convert';
      this.result = data.Result;

      var segmentList = data.Result.SegmentList.Segment;
      var tempCandidate;
      var result = new Object();
      var segment;
      result.segments = new Array();
      result.targetSegment = 0;

      // 受け取ったJSONデータを扱いやすい配列に格納する
      if( segmentList.length ){ // segmentListが配列の時
        for(var i=0;i<segmentList.length;i++){
          tempCandidate = segmentList[i].CandidateList.Candidate;
          segment = new Object();
          if( typeof tempCandidate == 'string' ){
            segment.candidates = new Array();
            segment.candidates[0] = tempCandidate;
          }
          else{
            segment.candidates = tempCandidate;
          }
          segment.targetCandidateNum = 0;
          result.segments[i] = segment;
        }
      }
      else{ // segmentListが1つだけの文節だけを含み、配列ではないとき
        result.segments[0] = new Object();
        tempCandidate = segmentList.CandidateList.Candidate;
        if( typeof tempCandidate == 'string' ){
          result.segments[0].candidates = new Array();
          result.segments[0].candidates[0] = tempCandidate;
        }
        else{
          result.segments[0].candidates = tempCandidate;
        }
        result.segments[0].targetCandidateNum = 0;
      }
      result.targetSegmentNum = 0;
      this.result = result;

      // GUI更新
      this.methodObj.JS_IM_Obj.GUI.list.update( result.segments[ result.targetSegmentNum ].candidates );
      this.methodObj.JS_IM_Obj.GUI.buffer.update( this.generateSegmentsGUI() );
    },
    nextSegment : function(){
      if( this.result.targetSegmentNum < this.result.segments.length - 1 ) this.result.targetSegmentNum ++;
      return this.getCurrentSegment();
    },
    prevSegment : function(){
      if( this.result.targetSegmentNum > 0 ) this.result.targetSegmentNum --;
      return this.getCurrentSegment();
    },
    getCurrentSegment : function(){
      return this.result.segments[ this.result.targetSegmentNum ];
    },
    nextCandidate : function(){
      var segment = this.getCurrentSegment();
      segment.targetCandidateNum += 1 + segment.candidates.length;
      segment.targetCandidateNum %= segment.candidates.length;
    },
    prevCandidate : function(){
      var segment = this.getCurrentSegment();
      segment.targetCandidateNum += -1 + segment.candidates.length;
      segment.targetCandidateNum %= segment.candidates.length;
    },
    getCurrentCandidate : function(){
      var result = this.result;
      var segment = result.segments[ result.targetSegmentNum ];
      return segment.candidates[ segment.targetCandidateNum ];
    },
    getCurrentCandidateNum : function(){
      var result = this.result;
      var segment = result.segments[ result.targetSegmentNum ];
      return segment.targetCandidateNum;
    },
    getAllSegments : function(){
      var tempSegment;
      var segments = this.result.segments;
      var outputSegments = new Array();
      for(var i=0;i<segments.length;i++){
        tempSegment = segments[i];
        outputSegments[i] = tempSegment.candidates[ tempSegment.targetCandidateNum ];
      }
      return outputSegments;
    },
    acceptAllSegments : function(){
      return this.getAllSegments().join("");
    },
    generateSegmentsGUI : function(){
      var segments = this.getAllSegments();
      var targetSegmentNum = this.result.targetSegmentNum;
      var divElem = document.createElement("div");
      var spanElem,i;
      for( i = 0; i < segments.length; i++ ){
        spanElem = document.createElement("span");
        spanElem.innerHTML = segments[i];
        if( targetSegmentNum == i ){
          JS_IM_setClassName( spanElem, 'jsim_target_segment' );
        }
        divElem.appendChild( spanElem);
      }
      return divElem.innerHTML;
    }
  },
  init : function(){
    this.romajiBuffer = "";
    this.phase = 'input'; // available 'input','convert','convert_katakana','convert_hiragana','convert_romaji','wait',
  },
  callback : function( data ){
    return this.extension.receive( data );
  },
  accept : function(){
    var outputStr;
    if( this.phase == 'convert' ){
      outputStr = this.extension.acceptAllSegments();
    }
    else outputStr = this.inlineBuffer;
    this.phase = 'input';
    this.romajiBuffer = "";
    this.inlineBuffer = "";
    this.JS_IM_Obj.GUI.list.hide();
    this.JS_IM_Obj.GUI.buffer.hide();
    return outputStr;
  },
  process : function( keyStatus ){
    var outputStr = "";
    var JS_IM_Obj = this.JS_IM_Obj;
//    $( 'phase' ).value = this.phase;  // debug
    var elemSelectionState = JS_IM_Obj.imeBox.getCaretXY();
    JS_IM_Obj.GUI.buffer.setPosition( elemSelectionState[0], elemSelectionState[1] );
    switch( this.phase ){
      case 'input' : // 入力モード
        if( ! keyStatus.inputChar ) switch( keyStatus.inputCode ){
          case 27 : // ESC
            this.inlineBuffer = '';
            this.romajiBuffer = '';
            JS_IM_Obj.GUI.buffer.hide();
            return ''; // IEでフォームが初期化されるのを防ぐ
          break;
          case 32 : // Space
            if( this.romajiBuffer == '' ) return null; // romajiBufferが空ならそのままスペースを入力する
            this.extension.convert(); // 変換開始
            this.phase = 'wait';
            return '';
          break;
          case 10 : // Enter
          case 13 : // Enter
            if( this.romajiBuffer == "" ) return null;
            else return this.accept();
          break;
          case 118 : // F7
            this.inlineBuffer = roma2.katakana( this.romajiBuffer ).toString();
            return this.accept();
          break;
          case 117 : // F6
            return this.accept();
          break;
        }
        // 結合処理
        if( keyStatus.inputChar != null ){
          this.romajiBuffer += keyStatus.inputChar.toLowerCase();
          this.inlineBuffer = roma2.hiragana(this.romajiBuffer).toString();
          JS_IM_Obj.GUI.buffer.update( this.inlineBuffer );
          return outputStr;
        }
      break;
      case 'wait' : // コールバック待ち
        switch( keyStatus.inputCode ){
          case 27 : // ESC
            this.phase = 'input';
            JS_IM_Obj.GUI.buffer.update( this.inlineBuffer );
            JS_IM_Obj.GUI.list.hide();
            return ''; // inputに戻す
          break;
          case 32 : // Space
            this.extension.convert(); // 変換Retry
            return '';
          break;
          default :
            return ''; // 何も受け付けない
          break;
        }
      break;
      case 'convert' : // 変換動作中
        switch( keyStatus.inputCode ){
          case 27 : // ESC
            // TODO 取り消す
            this.phase = 'input';
            JS_IM_Obj.GUI.buffer.update( this.inlineBuffer )
            JS_IM_Obj.GUI.list.hide();
            return '';
          break;
          case 38 : // Up
            this.extension.prevCandidate();
            JS_IM_Obj.GUI.buffer.update( this.extension.generateSegmentsGUI() );
            JS_IM_Obj.GUI.list.prev();
          break;
          case 32 : // Space
          case 40 : // Down
            this.extension.nextCandidate();
            JS_IM_Obj.GUI.buffer.update( this.extension.generateSegmentsGUI() );
            JS_IM_Obj.GUI.list.next();
          break;
          case 37 : // Left
            JS_IM_Obj.GUI.list.update( this.extension.prevSegment().candidates );
            JS_IM_Obj.GUI.buffer.update( this.extension.generateSegmentsGUI() );
            JS_IM_Obj.GUI.list.setSelectedCandidateNum( this.extension.getCurrentCandidateNum() );
          break;
          case 39 : // Right
            JS_IM_Obj.GUI.list.update( this.extension.nextSegment().candidates );
            JS_IM_Obj.GUI.buffer.update( this.extension.generateSegmentsGUI() );
            JS_IM_Obj.GUI.list.setSelectedCandidateNum( this.extension.getCurrentCandidateNum() );
          break;
          case 118 : // F7
            this.inlineBuffer = roma2.katakana( this.romajiBuffer ).toString();
            return this.accept();
          break;
          case 119 : // F8
            this.inlineBuffer = roma2.hiragana( this.romajiBuffer ).toString();
            return this.accept();
          break;
          case 10 : // Enter
          case 13 : // Enter
          default : // 変換キー以外であれば確定して次へ
            outputStr = this.extension.acceptAllSegments();
            JS_IM_Obj.GUI.buffer.hide();
            this.accept();
            if( keyStatus.inputChar != null ){
              this.romajiBuffer += keyStatus.inputChar.toLowerCase();
              this.inlineBuffer = roma2.hiragana(this.romajiBuffer).toString();
            }
            return outputStr;
          break;
        }
        return '';
      break;
      default :
      break;
    }
  },
  backspace : function(){
    switch( this.phase ){
      case 'input' :
        if( this.romajiBuffer.length == 0 ) return false;
        var lastInlineBufferLength = this.inlineBuffer.length;
        while( lastInlineBufferLength == this.inlineBuffer.length ){
          this.romajiBuffer = this.romajiBuffer.substring(0,this.romajiBuffer.length-1);
          this.inlineBuffer = roma2.hiragana(this.romajiBuffer).toString();
        }
        this.JS_IM_Obj.GUI.buffer.update( this.inlineBuffer );
        this.JS_IM_Obj.GUI.list.hide();
        return true;
      break;
      case 'wait' :
      case 'convert' :
        this.phase = 'input';
        this.JS_IM_Obj.GUI.buffer.update( this.inlineBuffer );
        this.JS_IM_Obj.GUI.list.hide();
        return true;
      break;
    }
  }
}


var temp_YahooAPI_VJE = {
  callbackObj : null,
  lastRequestElem : null,
  onload : function( data ){
    try{
      return this.callbackObj.callback( data );
    }
    catch( e ){
      JS_IM_YahooAPI.retryRequest();
//      alert( '申し訳ありません。通信に問題がありました。数秒待ってから変換をやり直してください。現在この問題の原因を特定中です。' );
    }
  }
}
var JS_IM_YahooAPI = {
  proxy : 'http://colspan.net/experiment/jsim/proxy/xml2json.cgi',
  lastQuery : null,
  requestCount : 0,
  request : function( query ){
    this.lastQuery = query;
    this.requestCount ++;
//    window.status = this.requestCount; // debug
    try{
      var script = document.createElement('script');
      script.charset = 'UTF-8';
      script.src = this.proxy + '?' + query;
      document.body.appendChild(script);
    }
    catch( e ){
      // error
      alert("取得できません");
    }
  },
  retryRequest : function(){
    setTimeout( 'JS_IM_YahooAPI.request( "' + this.lastQuery + '" )', 200 );
  },
  VJE : {
    convert : function( str, callbackObj ){
      var query = 'sentence=' + str;
      JS_IM_YahooAPI.request( query );
      temp_YahooAPI_VJE.callbackObj = callbackObj;
    }
  }
}
