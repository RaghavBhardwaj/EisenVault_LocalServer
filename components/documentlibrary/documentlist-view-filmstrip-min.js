(function(){var F=YAHOO.util.Dom,D=YAHOO.util.Event,s=YAHOO.util.Anim;var A=Alfresco.util.encodeHTML;var t="ygddfdiv",C="377px",o=[-42,25],N=120,b=4,k=52,r=112,H=50,O=315,g=50,B=200,l=372;MIMETYPE_PREFIX_IMAGE="image/";Alfresco.DocumentListFilmstripViewRenderer=function(P,Q){Alfresco.DocumentListFilmstripViewRenderer.superclass.constructor.call(this,P,Q);this.parentElementIdSuffix="-filmstrip";this.windowResizeCheckTime=g;this.windowResizeMinTime=B;return this};YAHOO.extend(Alfresco.DocumentListFilmstripViewRenderer,Alfresco.DocumentListGalleryViewRenderer);Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavItemId=function q(P){if(this.documentList!=null&&P!=null){return this.documentList.id+"-filmstrip-nav-item-"+P.getId()}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavItem=function m(S,T){if(this.documentList!=null&&S!=null){var U=this.getFilmstripNavItemId(S);var Q=F.get(U);if(Q===null&&T!=null){var R=F.getAncestorByTagName(T,"tr");var P=this.documentList.id+"-filmstrip-nav-item-"+R.id;Q=document.getElementById(P);if(Q!==null){Q.setAttribute("id",U)}}return Q}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavItemThumbnailElement=function I(P){if(P!=null){return F.getFirstChild(P)}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavItemLabelElement=function y(Q){if(Q!=null){var P=this.getFilmstripNavItemThumbnailElement(Q);return F.getChildren(P)[0]}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripCarouselContainerId=function E(P){if(P!=null){return P.id+"-filmstrip-carousel"}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavElement=function e(P){if(P!=null){return F.get(P.id+"-filmstrip-nav")}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getFilmstripNavCarouselContainerId=function G(P){if(P!=null){return P.id+"-filmstrip-nav-carousel"}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getRowItemLabelElement=function L(Q){if(Q!=null){var P=this.getRowItemHeaderElement(Q);return F.getChildren(P)[2]}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getRowItemActionsElement=function v(P){if(P){var Q=this.getRowItemDetailElement(P);return F.getChildren(F.getFirstChild(Q))[1]}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getRowItemStatusElement=function x(P){if(P!=null){var Q=this.getRowItemDetailElement(P);return F.getChildren(F.getFirstChild(Q))[0]}};Alfresco.DocumentListFilmstripViewRenderer.prototype.getRowItemInfoButtonElement=function c(Q){if(Q!=null){var P=this.getRowItemHeaderElement(Q);return F.getChildren(P)[1]}};Alfresco.DocumentListFilmstripViewRenderer.prototype.onClickFilmstripContentNavItem=function u(Q,P){if(Q!=null&&P!=null){Q.widgets.filmstripCarousel.scrollTo(P,false)}};Alfresco.DocumentListFilmstripViewRenderer.prototype.onFilmstripMainContentChanged=function z(R,P){if(R!=null){this.destroyWebPreview(R,P);this.renderWebPreview(R,P);var S=R.widgets.filmstripNavCarousel.getPageForItem(P)-1;var Q=R.widgets.filmstripNavCarousel.get("currentPage");if(S!=Q){var T=R.widgets.filmstripNavCarousel.getFirstVisibleOnPage(S+1);R.widgets.filmstripNavCarousel.scrollTo(T,true)}}};Alfresco.DocumentListFilmstripViewRenderer.prototype.onToggleHeaderAndNav=function J(X){if(X!=null){var R=this;var Q=F.get(X.id+this.parentElementIdSuffix);var U=X.widgets.filmstripCarousel.get("currentPage");var P=F.getFirstChild(X.widgets.filmstripCarousel.getElementForItem(U));var T=this.getRowItemHeaderElement(P);var S=this.getFilmstripNavElement(X);var W,V;if(!F.hasClass(Q,"alf-filmstrip-content-only")){V=new s(S,{bottom:{to:-r}},0.2);W=new s(T,{top:{to:-H}},0.2);W.onComplete.subscribe(function(){F.addClass(Q,"alf-filmstrip-content-only")})}else{F.setStyle(T,"top","-"+H+"px");F.removeClass(Q,"alf-filmstrip-content-only");V=new s(S,{bottom:{to:0}},0.2);W=new s(T,{top:{to:0}},0.2);W.onComplete.subscribe(function(){var aa,Z,Y,ab=X.widgets.filmstripCarousel.getElementForItems();for(aa=0,Z=ab.length;aa<Z;aa++){Y=R.getRowItemHeaderElement(F.getFirstChild(ab[aa]));F.setStyle(Y,"top","0px")}})}W.animate();V.animate()}};Alfresco.DocumentListFilmstripViewRenderer.prototype.setupRenderer=function a(T){F.addClass(T.id+this.buttonElementIdSuffix,this.buttonCssClass);this.documentList=T;var R=F.get(T.id+this.parentElementIdSuffix);var S=this;D.delegate(R,"mouseover",function U(X,W,V){S.onEventHighlightRow(T,X,W)},"div."+this.rowClassName,this);D.delegate(R,"click",function Q(X,W,V){S.onShowGalleryItemDetail(T,S,X,W,V)},".alf-show-detail",this);D.addListener(F.get(T.id+"-filmstrip-nav-handle"),"click",function(V){S.onToggleHeaderAndNav(T)});D.delegate(R,"click",function P(X,W,V){var Y=D.getTarget(X);T.selectedFiles[Y.value]=Y.checked;YAHOO.Bubbling.fire("selectedFilesChanged")},".alf-select input",this);YAHOO.Bubbling.on("selectedFilesChanged",function(W,V){this.onSelectedFilesChanged(T)},this);YAHOO.Bubbling.on("webPreviewSetupComplete",function(Z,X){var W=F.getElementsByClassName("alf-gallery-item","div");if(W!=null&&W.length>0){var ab=F.getElementsByClassName("WebPreviewer","div");if(ab!=null&&ab.length>0){var V=parseInt(W[0].style.height)-46;ab[0].style.height=V+"px"}}var Y=F.getElementsByClassName("real","div"),aa=F.get(T.id+"-item-header-yui-rec50").offsetHeight,ac;if(Y.length!==0){ac=Y[0].offsetHeight;l=ac+aa}},this)};Alfresco.DocumentListFilmstripViewRenderer.prototype.destroyView=function K(S,Q,R,U){this.restoreDataTable(S);var T=F.get(this.getFilmstripCarouselContainerId(S));if(T!=null){F.get(this.getFilmstripCarouselContainerId(S)).innerHTML="";F.get(this.getFilmstripNavCarouselContainerId(S)).innerHTML=""}this.destroyWebPreview(S);F.addClass(F.get(S.id+this.parentElementIdSuffix),"hidden");F.addClass(F.get(S.id+this.parentElementEmptytIdSuffix),"hidden");var P=F.get(t);F.removeClass(P,"alf-filmstrip-dragging");if(this.windowResizeCallback){D.removeListener(window,"resize",this.windowResizeCallback)}};Alfresco.DocumentListFilmstripViewRenderer.prototype.renderView=function d(au,aH,aC,an){this.overrideDataTable(au);var aa=this;au.widgets.dataTable.onDataReturnInitializeTable.call(au.widgets.dataTable,aH,aC,an);var aq=F.get(au.id+this.parentElementIdSuffix);var ah=au.widgets.dataTable.getRecordSet();var V=F.get(au.id+this.parentElementEmptytIdSuffix);if(ah.getLength()==0){F.removeClass(V,"hidden");F.setStyle(V,"height","auto");return}F.addClass(V,"hidden");F.setStyle(aq,"opacity",0);var X=F.get(au.id+"-filmstrip-main-content");var al=this.getFilmstripCarouselContainerId(au);var ag=F.get(al);ag.innerHTML="";var aF=document.createElement("ol");ag.appendChild(aF);var R=F.get(au.id+"-filmstrip-nav");var ab=this.getFilmstripNavCarouselContainerId(au);var ar=F.get(ab);ar.innerHTML="";var af=document.createElement("ol");ar.appendChild(af);F.addClass(aq,"alf-gallery");F.addClass(aq,"alf-filmstrip");F.removeClass(aq,"hidden");var W=parseInt(F.getComputedStyle(aq,"width"));var aE=Math.floor((2/3)*W);var Z=F.getViewportHeight()-O;if(F.hasClass(F.get(au.id),"alf-fullscreen")){Z=F.getViewportHeight()}if(aE>Z){aE=Z}var ae=F.get(au.id+"-filmstrip-item-template"),P=F.get(au.id+"-filmstrip-nav-item-template"),T=null,am=null,aj=null,ay=null;var ai,ax,aB,aA;for(aB=0,aA=ah.getLength();aB<aA;aB++){ai=ah.getRecord(aB);ax=ai.getData();aj=document.createElement("li");aF.appendChild(aj);ay=document.createElement("li");af.appendChild(ay);var at=this.getRowItemId(ai);T=ae.cloneNode(true);F.removeClass(T,"hidden");T.setAttribute("id",at);T.style.width=W+"px";T.style.height=aE+"px";aj.appendChild(T);var ap=this.getFilmstripNavItemId(ai);am=P.cloneNode(true);F.removeClass(am,"hidden");am.setAttribute("id",ap);am.style.width=N+"px";D.addListener(am,"click",function(aI){return function(aJ){YAHOO.Bubbling.fire("filmstripNavItemClicked",{index:aI})}}(aB),this,true);ay.appendChild(am);var aD=this.getRowItemThumbnailElement(T);var ao=this.getRowItemHeaderElement(T);var az=this.getRowItemDetailElement(T);var Y=this.getRowItemActionsElement(T);ao.setAttribute("id",au.id+"-item-header-"+ai.getId());Y.setAttribute("id",au.id+"-actions-"+at);if(aB==0||(ax.node.mimetype!=null&&ax.node.mimetype.substring(0,MIMETYPE_PREFIX_IMAGE.length)==MIMETYPE_PREFIX_IMAGE)){this.destroyWebPreview(au,aB);this.renderWebPreview(au,aB)}var aG=this.getFilmstripNavItemThumbnailElement(am);this.renderCellThumbnail(au,aG,ai,T,null,"","doclib");var U=ax.jsNode.nodeRef.nodeRef;var ad=new Alfresco.DnD(U,au);var aw=this.getRowItemInfoButtonElement(T);az.panel=new YAHOO.widget.Panel(az,{visible:false,draggable:false,close:false,constraintoviewport:true,underlay:"none",width:C,context:[T,"tr","tr",null,o]})}au.widgets.filmstripCarousel=new YAHOO.widget.Carousel(this.getFilmstripCarouselContainerId(au),{animation:{speed:0.2},numVisible:1,navigation:{prev:au.id+"-filmstrip-nav-main-previous",next:au.id+"-filmstrip-nav-main-next"}});au.widgets.filmstripCarousel.render();au.widgets.filmstripCarousel.show();au.widgets.filmstripCarousel.focus();var Q=Math.floor((W-(k*2))/(N+b));au.widgets.filmstripNavCarousel=new YAHOO.widget.Carousel(this.getFilmstripNavCarouselContainerId(au),{animation:{speed:0.5},numVisible:Q,navigation:{prev:au.id+"-filmstrip-nav-previous",next:au.id+"-filmstrip-nav-next"}});au.widgets.filmstripNavCarousel.render();au.widgets.filmstripNavCarousel.show();YAHOO.Bubbling.on("filmstripNavItemClicked",function(aJ,aI){this.onClickFilmstripContentNavItem(au,aI[1].index)},this);au.widgets.filmstripCarousel.on("pageChange",function(aI){aa.onFilmstripMainContentChanged(au,aI)});var av=F.get(t);F.addClass(av,"alf-filmstrip-dragging");this.currentResizeCallback=function(aI){aa.resizeView(au,aH,aC,an)};this.setupWindowResizeListener();var S=F.getElementsByClassName("yui-carousel-element");carouselContentDivsHeight=S[0].style.minHeight=l+"px";var ak=F.get(au.id+"-filmstrip");ak.style.overflow="hidden";var ac=new YAHOO.util.Anim(aq,{opacity:{from:0,to:1}},0.4,YAHOO.util.Easing.easeOut);ac.animate()};Alfresco.DocumentListFilmstripViewRenderer.prototype.renderWebPreview=function p(Y,U){var X;var W=Y.widgets.dataTable.getRecordSet();if(W.getLength()>0){var Z=W.getRecord(U);var T=Z.getData();var R=this.getRowItemId(Z);var Q=document.getElementById(R);var S=this.getRowItemThumbnailElement(Q);var P=this.getThumbnail(Y,S,Z,null,null,"-filmstrip-main-content");if(P.isContainer){if(!document.getElementById(P.id)){S.innerHTML+='<span class="folder">'+(P.isLink?'<span class="link"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(Y,T)+P.html+"</a>"}}else{var V=F.getElementsByClassName("web-preview","div",S);if(V==null||V.length==0){Alfresco.util.loadWebscript({url:Alfresco.constants.URL_SERVICECONTEXT+"/components/preview/web-preview",properties:{nodeRef:T.nodeRef},target:S})}}}};Alfresco.DocumentListFilmstripViewRenderer.prototype.destroyWebPreview=function w(R,Q){var S=F.getElementsByClassName("real","div");if(S!=null){for(i=0,j=S.length;i<j;i++){if(F.hasClass(S[i],"web-preview")){S[i].parentNode.removeChild(S[i])}}}var P=F.getElementsByClassName("WebPreviewer","div");if(P!=null){for(i=0,j=P.length;i<j;i++){if(F.hasClass(P[i],"previewer")){P[i].parentNode.parentNode.parentNode.removeChild(P[i].parentNode.parentNode)}}}};Alfresco.DocumentListFilmstripViewRenderer.prototype.resizeView=function M(T,Q,S,U){var P=F.get(T.id+this.parentElementIdSuffix);if(!F.hasClass(P,"alf-true-fullscreen")){var R=T.widgets.filmstripCarousel.get("currentPage");this.renderView(T,Q,S,U);setTimeout(function(){T.widgets.filmstripCarousel.scrollTo(R,false)},50)}};Alfresco.DocumentListFilmstripViewRenderer.prototype.onSelectedFilesChanged=function n(Z){var X=Z.widgets.dataTable.getRecordSet(),aa,W,Q,Y,R,V,U;var T=false;for(V=0,U=X.getLength();V<U;V++){aa=X.getRecord(V);Q=aa.getData("jsNode");Y=Q.nodeRef;R=this.getFilmstripNavItem(aa);var S=Z.selectedFiles[Y];if(S){F.addClass(R,"alf-selected");T=true}else{F.removeClass(R,"alf-selected")}}var P=F.get(Z.id+this.parentElementIdSuffix);if(T){if(!F.hasClass(P,"alf-selected")){F.addClass(P,"alf-selected")}}else{F.removeClass(P,"alf-selected")}};Alfresco.DocumentListFilmstripViewRenderer.prototype.renderCellThumbnail=function f(Z,Y,aa,U,Q,R,T){var W;var P=this.getThumbnail(Z,Y,aa,U,Q,R,T);var S=aa.getData();if(!document.getElementById(P.id)){if(P.isContainer){Y.innerHTML+='<span class="folder">'+(P.isLink?'<span class="link"></span>':"")+(Z.dragAndDropEnabled?'<span class="droppable"></span>':"")+P.html;W=new YAHOO.util.DDTarget(P.id)}else{Y.innerHTML+=(P.isLink?'<span class="link"></span>':"")+P.html}var V=document.getElementById(P.id);if(V){var X=new Image();X.onload=function(){if(X.width>X.height){F.addClass(V,"alf-landscape")}};X.src=V.src}}};Alfresco.DocumentListFilmstripViewRenderer.prototype.renderCellDescription=function h(R,U,T,V,W){Alfresco.DocumentListGalleryViewRenderer.superclass.renderCellDescription.call(this,R,U,T,V,W);var S=this.getRowItem(T,U);if(S!==null){var P=this.getRowItemDetailDescriptionElement(S).innerHTML=U.innerHTML;U.innerHTML="";this.getRowItemLabelElement(S).innerHTML=A(T.getData().displayName)}var Q=this.getFilmstripNavItem(T,U);if(Q!==null){this.getFilmstripNavItemLabelElement(Q).innerHTML=A(T.getData().displayName)}}})();