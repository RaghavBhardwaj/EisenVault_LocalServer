(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.registerHelper("lint","css",function(h){var k=[];if(!window.CSSLint){return k}var e=CSSLint.verify(h),d=e.messages,l=null;for(var f=0;f<d.length;f++){l=d[f];var j=l.line-1,c=l.line-1,b=l.col-1,g=l.col;k.push({from:a.Pos(j,b),to:a.Pos(c,g),message:l.message,severity:l.type})}return k})});