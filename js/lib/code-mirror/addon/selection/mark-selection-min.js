(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(b){b.defineOption("styleSelectedText",false,function(k,n,l){var m=l&&l!=b.Init;if(n&&!m){k.state.markedSelection=[];k.state.markedSelectionStyle=typeof n=="string"?n:"CodeMirror-selectedtext";f(k);k.on("cursorActivity",g);k.on("change",h)}else{if(!n&&m){k.off("cursorActivity",g);k.off("change",h);d(k);k.state.markedSelection=k.state.markedSelectionStyle=null}}});function g(k){k.operation(function(){c(k)})}function h(k){if(k.state.markedSelection.length){k.operation(function(){d(k)})}}var a=8;var j=b.Pos;var i=b.cmpPos;function e(t,r,s,o){if(i(r,s)==0){return}var p=t.state.markedSelection;var u=t.state.markedSelectionStyle;for(var v=r.line;;){var k=v==r.line?r:j(v,0);var l=v+a,q=l>=s.line;var n=q?s:j(l,0);var m=t.markText(k,n,{className:u});if(o==null){p.push(m)}else{p.splice(o++,0,m)}if(q){break}v=l}}function d(k){var m=k.state.markedSelection;for(var l=0;l<m.length;++l){m[l].clear()}m.length=0}function f(k){d(k);var l=k.listSelections();for(var m=0;m<l.length;m++){e(k,l[m].from(),l[m].to())}}function c(k){if(!k.somethingSelected()){return d(k)}if(k.listSelections().length>1){return f(k)}var p=k.getCursor("start"),o=k.getCursor("end");var n=k.state.markedSelection;if(!n.length){return e(k,p,o)}var m=n[0].find(),l=n[n.length-1].find();if(!m||!l||o.line-p.line<a||i(p,l.to)>=0||i(o,m.from)<=0){return f(k)}while(i(p,m.from)>0){n.shift().clear();m=n[0].find()}if(i(p,m.from)<0){if(m.to.line-p.line<a){n.shift().clear();e(k,p,m.to,0)}else{e(k,p,m.from,0)}}while(i(o,l.to)<0){n.pop().clear();l=n[n.length-1].find()}if(i(o,l.to)>0){if(o.line-l.from.line<a){n.pop().clear();e(k,l.from,o)}else{e(k,l.to,o)}}}});