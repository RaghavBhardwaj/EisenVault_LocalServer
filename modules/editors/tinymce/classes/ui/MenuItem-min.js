define("tinymce/ui/MenuItem",["tinymce/ui/Widget","tinymce/ui/Factory","tinymce/Env"],function(c,a,b){return c.extend({Defaults:{border:0,role:"menuitem"},init:function(e){var d=this;d.hasPopup=true;d._super(e);e=d.settings;d.addClass("menu-item");if(e.menu){d.addClass("menu-item-expand")}if(e.preview){d.addClass("menu-item-preview")}if(d._text==="-"||d._text==="|"){d.addClass("menu-item-sep");d.aria("role","separator");d._text="-"}if(e.selectable){d.aria("role","menuitemcheckbox");d.addClass("menu-item-checkbox");e.icon="selected"}if(!e.preview&&!e.selectable){d.addClass("menu-item-normal")}d.on("mousedown",function(f){f.preventDefault()});if(e.menu&&!e.ariaHideMenu){d.aria("haspopup",true)}},hasMenus:function(){return !!this.settings.menu},showMenu:function(){var e=this,g=e.settings,h,f=e.parent();f.items().each(function(i){if(i!==e){i.hideMenu()}});if(g.menu){h=e.menu;if(!h){h=g.menu;if(h.length){h={type:"menu",items:h}}else{h.type=h.type||"menu"}if(f.settings.itemDefaults){h.itemDefaults=f.settings.itemDefaults}h=e.menu=a.create(h).parent(e).renderTo();h.reflow();h.fire("show");h.on("cancel",function(i){i.stopPropagation();e.focus();h.hide()});h.on("hide",function(i){if(i.control===h){e.removeClass("selected")}});h.submenu=true}else{h.show()}h._parentMenu=f;h.addClass("menu-sub");var d=h.testMoveRel(e.getEl(),e.isRtl()?["tl-tr","bl-br","tr-tl","br-bl"]:["tr-tl","br-bl","tl-tr","bl-br"]);h.moveRel(e.getEl(),d);h.rel=d;d="menu-sub-"+d;h.removeClass(h._lastRel);h.addClass(d);h._lastRel=d;e.addClass("selected");e.aria("expanded",true)}},hideMenu:function(){var d=this;if(d.menu){d.menu.items().each(function(e){if(e.hideMenu){e.hideMenu()}});d.menu.hide();d.aria("expanded",false)}return d},renderHtml:function(){var e=this,k=e._id,g=e.settings,h=e.classPrefix,j=e.encode(e._text);var f=e.settings.icon,i="",d=g.shortcut;if(f){e.parent().addClass("menu-has-icons")}if(g.image){f="none";i=" style=\"background-image: url('"+g.image+"')\""}if(d&&b.mac){d=d.replace(/ctrl\+alt\+/i,"&#x2325;&#x2318;");d=d.replace(/ctrl\+/i,"&#x2318;");d=d.replace(/alt\+/i,"&#x2325;");d=d.replace(/shift\+/i,"&#x21E7;")}f=h+"ico "+h+"i-"+(e.settings.icon||"none");return('<div id="'+k+'" class="'+e.classes()+'" tabindex="-1">'+(j!=="-"?'<i class="'+f+'"'+i+"></i>\u00a0":"")+(j!=="-"?'<span id="'+k+'-text" class="'+h+'text">'+j+"</span>":"")+(d?'<div id="'+k+'-shortcut" class="'+h+'menu-shortcut">'+d+"</div>":"")+(g.menu?'<div class="'+h+'caret"></div>':"")+"</div>")},postRender:function(){var e=this,f=e.settings;var g=f.textStyle;if(typeof(g)=="function"){g=g.call(this)}if(g){var d=e.getEl("text");if(d){d.setAttribute("style",g)}}e.on("mouseenter click",function(h){if(h.control===e){if(!f.menu&&h.type==="click"){e.fire("select");e.parent().hideAll()}else{e.showMenu();if(h.aria){e.menu.focus(true)}}}});e._super();return e},active:function(d){if(typeof(d)!="undefined"){this.aria("checked",d)}return this._super(d)},remove:function(){this._super();if(this.menu){this.menu.remove()}}})});