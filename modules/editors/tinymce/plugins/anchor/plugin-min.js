tinymce.PluginManager.add("anchor",function(b){function a(){var c=b.selection.getNode();b.windowManager.open({title:"Anchor",body:{type:"textbox",name:"name",size:40,label:"Name",value:c.name||c.id},onsubmit:function(d){b.execCommand("mceInsertContent",false,b.dom.createHTML("a",{id:d.data.name}))}})}b.addButton("anchor",{icon:"anchor",tooltip:"Anchor",onclick:a,stateSelector:"a:not([href])"});b.addMenuItem("anchor",{icon:"anchor",text:"Anchor",context:"insert",onclick:a})});