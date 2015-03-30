define("tinymce/dom/TridentSelection",[],function(){function a(c){var b=this,g=c.dom,e=false;function d(h,i){var j,s=0,p,m,l,k,n,q,o=-1,r;j=h.duplicate();j.collapse(i);r=j.parentElement();if(r.ownerDocument!==c.dom.doc){return}while(r.contentEditable==="false"){r=r.parentNode}if(!r.hasChildNodes()){return{node:r,inside:1}}l=r.children;p=l.length-1;while(s<=p){q=Math.floor((s+p)/2);k=l[q];j.moveToElementText(k);o=j.compareEndPoints(i?"StartToStart":"EndToEnd",h);if(o>0){p=q-1}else{if(o<0){s=q+1}else{return{node:k}}}}if(o<0){if(!k){j.moveToElementText(r);j.collapse(true);k=r;m=true}else{j.collapse(false)}n=0;while(j.compareEndPoints(i?"StartToStart":"StartToEnd",h)!==0){if(j.move("character",1)===0||r!=j.parentElement()){break}n++}}else{j.collapse(true);n=0;while(j.compareEndPoints(i?"StartToStart":"StartToEnd",h)!==0){if(j.move("character",-1)===0||r!=j.parentElement()){break}n++}}return{node:k,position:o,offset:n,inside:m}}function f(){var h=c.getRng(),p=g.createRng(),j,i,n,o,k;j=h.item?h.item(0):h.parentElement();if(j.ownerDocument!=g.doc){return p}i=c.isCollapsed();if(h.item){p.setStart(j.parentNode,g.nodeIndex(j));p.setEnd(p.startContainer,p.startOffset+1);return p}function m(x){var s=d(h,x),q,v,w=0,u,t,r;q=s.node;v=s.offset;if(s.inside&&!q.hasChildNodes()){p[x?"setStart":"setEnd"](q,0);return}if(v===t){p[x?"setStartBefore":"setEndAfter"](q);return}if(s.position<0){u=s.inside?q.firstChild:q.nextSibling;if(!u){p[x?"setStartAfter":"setEndAfter"](q);return}if(!v){if(u.nodeType==3){p[x?"setStart":"setEnd"](u,0)}else{p[x?"setStartBefore":"setEndBefore"](u)}return}while(u){r=u.nodeValue;w+=r.length;if(w>=v){q=u;w-=v;w=r.length-w;break}u=u.nextSibling}}else{u=q.previousSibling;if(!u){return p[x?"setStartBefore":"setEndBefore"](q)}if(!v){if(q.nodeType==3){p[x?"setStart":"setEnd"](u,q.nodeValue.length)}else{p[x?"setStartAfter":"setEndAfter"](u)}return}while(u){w+=u.nodeValue.length;if(w>=v){q=u;w-=v;break}u=u.previousSibling}}p[x?"setStart":"setEnd"](q,w)}try{m(true);if(!i){m()}}catch(l){if(l.number==-2147024809){k=b.getBookmark(2);n=h.duplicate();n.collapse(true);j=n.parentElement();if(!i){n=h.duplicate();n.collapse(false);o=n.parentElement();o.innerHTML=o.innerHTML}j.innerHTML=j.innerHTML;b.moveToBookmark(k);h=c.getRng();m(true);if(!i){m()}}else{throw l}}return p}this.getBookmark=function(k){var h=c.getRng(),j={};function l(r){var q,m,p,o,n=[];q=r.parentNode;m=g.getRoot().parentNode;while(q!=m&&q.nodeType!==9){p=q.children;o=p.length;while(o--){if(r===p[o]){n.push(o);break}}r=q;q=q.parentNode}return n}function i(n){var m;m=d(h,n);if(m){return{position:m.position,offset:m.offset,indexes:l(m.node),inside:m.inside}}}if(k===2){if(!h.item){j.start=i(true);if(!c.isCollapsed()){j.end=i()}}else{j.start={ctrl:true,indexes:l(h.item(0))}}}return j};this.moveToBookmark=function(j){var i,h=g.doc.body;function l(n){var q,p,m,o;q=g.getRoot();for(p=n.length-1;p>=0;p--){o=q.children;m=n[p];if(m<=o.length-1){q=o[m]}}return q}function k(r){var m=j[r?"start":"end"],p,o,n,q;if(m){p=m.position>0;o=h.createTextRange();o.moveToElementText(l(m.indexes));q=m.offset;if(q!==n){o.collapse(m.inside||p);o.moveStart("character",p?-q:q)}else{o.collapse(r)}i.setEndPoint(r?"StartToStart":"EndToStart",o);if(r){i.collapse(true)}}}if(j.start){if(j.start.ctrl){i=h.createControlRange();i.addElement(l(j.start.indexes));i.select()}else{i=h.createTextRange();k(true);k();i.select()}}};this.addRange=function(h){var m,k,j,o,u,p,s,r=c.dom.doc,l=r.body,q,t;function i(A){var w,z,v,y,x;v=g.create("a");w=A?j:u;z=A?o:p;y=m.duplicate();if(w==r||w==r.documentElement){w=l;z=0}if(w.nodeType==3){w.parentNode.insertBefore(v,w);y.moveToElementText(v);y.moveStart("character",z);g.remove(v);m.setEndPoint(A?"StartToStart":"EndToEnd",y)}else{x=w.childNodes;if(x.length){if(z>=x.length){g.insertAfter(v,x[x.length-1])}else{w.insertBefore(v,x[z])}y.moveToElementText(v)}else{if(w.canHaveHTML){w.innerHTML="<span>&#xFEFF;</span>";v=w.firstChild;y.moveToElementText(v);y.collapse(e)}}m.setEndPoint(A?"StartToStart":"EndToEnd",y);g.remove(v)}}j=h.startContainer;o=h.startOffset;u=h.endContainer;p=h.endOffset;m=l.createTextRange();if(j==u&&j.nodeType==1){if(o==p&&!j.hasChildNodes()){if(j.canHaveHTML){s=j.previousSibling;if(s&&!s.hasChildNodes()&&g.isBlock(s)){s.innerHTML="&#xFEFF;"}else{s=null}j.innerHTML="<span>&#xFEFF;</span><span>&#xFEFF;</span>";m.moveToElementText(j.lastChild);m.select();g.doc.selection.clear();j.innerHTML="";if(s){s.innerHTML=""}return}else{o=g.nodeIndex(j);j=j.parentNode}}if(o==p-1){try{t=j.childNodes[o];k=l.createControlRange();k.addElement(t);k.select();q=c.getRng();if(q.item&&t===q.item(0)){return}}catch(n){}}}i(true);i();m.select()};this.getRangeAt=f}return a});