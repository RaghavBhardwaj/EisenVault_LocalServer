define("tinymce/util/Class",["tinymce/util/Tools"],function(d){var e=d.each,f=d.extend;var c,b;function a(){}a.extend=c=function(g){var o=this,n=o.prototype,m,h,l;function i(){var s,p,r,q=this;if(!b){if(q.init){q.init.apply(q,arguments)}p=q.Mixins;if(p){s=p.length;while(s--){r=p[s];if(r.init){r.init.apply(q,arguments)}}}}}function j(){return this}function k(p,q){return function(){var r=this,t=r._super,s;r._super=n[p];s=q.apply(r,arguments);r._super=t;return s}}b=true;m=new o();b=false;if(g.Mixins){e(g.Mixins,function(p){p=p;for(var q in p){if(q!=="init"){g[q]=p[q]}}});if(n.Mixins){g.Mixins=n.Mixins.concat(g.Mixins)}}if(g.Methods){e(g.Methods.split(","),function(p){g[p]=j})}if(g.Properties){e(g.Properties.split(","),function(p){var q="_"+p;g[p]=function(t){var r=this,s;if(t!==s){r[q]=t;return r}return r[q]}})}if(g.Statics){e(g.Statics,function(q,p){i[p]=q})}if(g.Defaults&&n.Defaults){g.Defaults=f({},n.Defaults,g.Defaults)}for(h in g){l=g[h];if(typeof l=="function"&&n[h]){m[h]=k(h,l)}else{m[h]=l}}i.prototype=m;i.constructor=i;i.extend=c;return i};return a});