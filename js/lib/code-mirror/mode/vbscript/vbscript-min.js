(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("vbscript",function(H,n){var t="error";function f(S){return new RegExp("^(("+S.join(")|(")+"))\\b","i")}var P=new RegExp("^[\\+\\-\\*/&\\\\\\^<>=]");var o=new RegExp("^((<>)|(<=)|(>=))");var l=new RegExp("^[\\.,]");var D=new RegExp("^[\\(\\)]");var I=new RegExp("^[A-Za-z][_A-Za-z0-9]*");var G=["class","sub","select","while","if","function","property","with","for"];var v=["else","elseif","case"];var d=["next","loop","wend"];var e=f(["and","or","not","xor","is","mod","eqv","imp"]);var j=["dim","redim","then","until","randomize","byval","byref","new","property","exit","in","const","private","public","get","set","let","stop","on error resume next","on error goto 0","option explicit","call","me"];var x=["true","false","nothing","empty","null"];var M=["abs","array","asc","atn","cbool","cbyte","ccur","cdate","cdbl","chr","cint","clng","cos","csng","cstr","date","dateadd","datediff","datepart","dateserial","datevalue","day","escape","eval","execute","exp","filter","formatcurrency","formatdatetime","formatnumber","formatpercent","getlocale","getobject","getref","hex","hour","inputbox","instr","instrrev","int","fix","isarray","isdate","isempty","isnull","isnumeric","isobject","join","lbound","lcase","left","len","loadpicture","log","ltrim","rtrim","trim","maths","mid","minute","month","monthname","msgbox","now","oct","replace","rgb","right","rnd","round","scriptengine","scriptenginebuildversion","scriptenginemajorversion","scriptengineminorversion","second","setlocale","sgn","sin","space","split","sqr","strcomp","string","strreverse","tan","time","timer","timeserial","timevalue","typename","ubound","ucase","unescape","vartype","weekday","weekdayname","year"];var L=["vbBlack","vbRed","vbGreen","vbYellow","vbBlue","vbMagenta","vbCyan","vbWhite","vbBinaryCompare","vbTextCompare","vbSunday","vbMonday","vbTuesday","vbWednesday","vbThursday","vbFriday","vbSaturday","vbUseSystemDayOfWeek","vbFirstJan1","vbFirstFourDays","vbFirstFullWeek","vbGeneralDate","vbLongDate","vbShortDate","vbLongTime","vbShortTime","vbObjectError","vbOKOnly","vbOKCancel","vbAbortRetryIgnore","vbYesNoCancel","vbYesNo","vbRetryCancel","vbCritical","vbQuestion","vbExclamation","vbInformation","vbDefaultButton1","vbDefaultButton2","vbDefaultButton3","vbDefaultButton4","vbApplicationModal","vbSystemModal","vbOK","vbCancel","vbAbort","vbRetry","vbIgnore","vbYes","vbNo","vbCr","VbCrLf","vbFormFeed","vbLf","vbNewLine","vbNullChar","vbNullString","vbTab","vbVerticalTab","vbUseDefault","vbTrue","vbFalse","vbEmpty","vbNull","vbInteger","vbLong","vbSingle","vbDouble","vbCurrency","vbDate","vbString","vbObject","vbError","vbBoolean","vbVariant","vbDataObject","vbDecimal","vbByte","vbArray"];var J=["WScript","err","debug","RegExp"];var R=["description","firstindex","global","helpcontext","helpfile","ignorecase","length","number","pattern","source","value","count"];var u=["clear","execute","raise","replace","test","write","writeline","close","open","state","eof","update","addnew","end","createobject","quit"];var F=["server","response","request","session","application"];var i=["buffer","cachecontrol","charset","contenttype","expires","expiresabsolute","isclientconnected","pics","status","clientcertificate","cookies","form","querystring","servervariables","totalbytes","contents","staticobjects","codepage","lcid","sessionid","timeout","scripttimeout"];var g=["addheader","appendtolog","binarywrite","end","flush","redirect","binaryread","remove","removeall","lock","unlock","abandon","getlasterror","htmlencode","mappath","transfer","urlencode"];var s=u.concat(R);J=J.concat(L);if(H.isASP){J=J.concat(F);s=s.concat(g,i)}var c=f(j);var p=f(x);var q=f(M);var N=f(J);var b=f(s);var O='"';var r=f(G);var z=f(v);var A=f(d);var K=f(["end"]);var B=f(["do"]);var Q=f(["on error resume next","exit"]);var w=f(["rem"]);function k(S,T){T.currentIndent++}function h(S,T){T.currentIndent--}function y(W,V){if(W.eatSpace()){return"space"}var U=W.peek();if(U==="'"){W.skipToEnd();return"comment"}if(W.match(w)){W.skipToEnd();return"comment"}if(W.match(/^((&H)|(&O))?[0-9\.]/i,false)&&!W.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i,false)){var T=false;if(W.match(/^\d*\.\d+/i)){T=true}else{if(W.match(/^\d+\.\d*/)){T=true}else{if(W.match(/^\.\d+/)){T=true}}}if(T){W.eat(/J/i);return"number"}var S=false;if(W.match(/^&H[0-9a-f]+/i)){S=true}else{if(W.match(/^&O[0-7]+/i)){S=true}else{if(W.match(/^[1-9]\d*F?/)){W.eat(/J/i);S=true}else{if(W.match(/^0(?![\dx])/i)){S=true}}}}if(S){W.eat(/L/i);return"number"}}if(W.match(O)){V.tokenize=E(W.current());return V.tokenize(W,V)}if(W.match(o)||W.match(P)||W.match(e)){return"operator"}if(W.match(l)){return null}if(W.match(D)){return"bracket"}if(W.match(Q)){V.doInCurrentLine=true;return"keyword"}if(W.match(B)){k(W,V);V.doInCurrentLine=true;return"keyword"}if(W.match(r)){if(!V.doInCurrentLine){k(W,V)}else{V.doInCurrentLine=false}return"keyword"}if(W.match(z)){return"keyword"}if(W.match(K)){h(W,V);h(W,V);return"keyword"}if(W.match(A)){if(!V.doInCurrentLine){h(W,V)}else{V.doInCurrentLine=false}return"keyword"}if(W.match(c)){return"keyword"}if(W.match(p)){return"atom"}if(W.match(b)){return"variable-2"}if(W.match(q)){return"builtin"}if(W.match(N)){return"variable-2"}if(W.match(I)){return"variable"}W.next();return t}function E(S){var U=S.length==1;var T="string";return function(W,V){while(!W.eol()){W.eatWhile(/[^'"]/);if(W.match(S)){V.tokenize=y;return T}else{W.eat(/['"]/)}}if(U){if(n.singleLineStringErrors){return t}else{V.tokenize=y}}return T}}function m(V,T){var S=T.tokenize(V,T);var U=V.current();if(U==="."){S=T.tokenize(V,T);U=V.current();if(S&&(S.substr(0,8)==="variable"||S==="builtin"||S==="keyword")){if(S==="builtin"||S==="keyword"){S="variable"}if(s.indexOf(U.substr(1))>-1){S="variable-2"}return S}else{return t}}return S}var C={electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:y,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:false,ignoreKeyword:false}},token:function(U,T){if(U.sol()){T.currentIndent+=T.nextLineIndent;T.nextLineIndent=0;T.doInCurrentLine=0}var S=m(U,T);T.lastToken={style:S,content:U.current()};if(S==="space"){S=null}return S},indent:function(U,S){var T=S.replace(/^\s+|\s+$/g,"");if(T.match(A)||T.match(K)||T.match(z)){return H.indentUnit*(U.currentIndent-1)}if(U.currentIndent<0){return 0}return U.currentIndent*H.indentUnit}};return C});a.defineMIME("text/vbscript","vbscript")});