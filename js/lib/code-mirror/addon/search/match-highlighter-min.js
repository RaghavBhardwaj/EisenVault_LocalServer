(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){var i=2;var b="matchhighlight";var c=100;var k=false;function h(l){if(typeof l=="object"){this.minChars=l.minChars;this.style=l.style;this.showToken=l.showToken;this.delay=l.delay;this.wordsOnly=l.wordsOnly}if(this.style==null){this.style=b}if(this.minChars==null){this.minChars=i}if(this.delay==null){this.delay=c}if(this.wordsOnly==null){this.wordsOnly=k}this.overlay=this.timeout=null}a.defineOption("highlightSelectionMatches",false,function(l,o,m){if(m&&m!=a.Init){var n=l.state.matchHighlighter.overlay;if(n){l.removeOverlay(n)}clearTimeout(l.state.matchHighlighter.timeout);l.state.matchHighlighter=null;l.off("cursorActivity",g)}if(o){l.state.matchHighlighter=new h(o);e(l);l.on("cursorActivity",g)}});function g(l){var m=l.state.matchHighlighter;clearTimeout(m.timeout);m.timeout=setTimeout(function(){e(l)},m.delay)}function e(l){l.operation(function(){var m=l.state.matchHighlighter;if(m.overlay){l.removeOverlay(m.overlay);m.overlay=null}if(!l.somethingSelected()&&m.showToken){var t=m.showToken===true?/[\w$]/:m.showToken;var s=l.getCursor(),u=l.getLine(s.line),n=s.ch,o=n;while(n&&t.test(u.charAt(n-1))){--n}while(o<u.length&&t.test(u.charAt(o))){++o}if(n<o){l.addOverlay(m.overlay=d(u.slice(n,o),t,m.style))}return}var q=l.getCursor("from"),r=l.getCursor("to");if(q.line!=r.line){return}if(m.wordsOnly&&!f(l,q,r)){return}var p=l.getRange(q,r).replace(/^\s+|\s+$/g,"");if(p.length>=m.minChars){l.addOverlay(m.overlay=d(p,false,m.style))}})}function f(l,q,p){var n=l.getRange(q,p);if(n.match(/^\w+$/)!==null){if(q.ch>0){var o={line:q.line,ch:q.ch-1};var m=l.getRange(o,q);if(m.match(/\W/)===null){return false}}if(p.ch<l.getLine(q.line).length){var o={line:p.line,ch:p.ch+1};var m=l.getRange(p,o);if(m.match(/\W/)===null){return false}}return true}else{return false}}function j(m,l){return(!m.start||!l.test(m.string.charAt(m.start-1)))&&(m.pos==m.string.length||!l.test(m.string.charAt(m.pos)))}function d(n,m,l){return{token:function(o){if(o.match(n)&&(!m||j(o,m))){return l}o.next();o.skipTo(n.charAt(0))||o.skipToEnd()}}}});