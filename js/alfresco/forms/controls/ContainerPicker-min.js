define(["alfresco/forms/controls/Picker","dojo/_base/declare"],function(a,b){return b([a],{configForPicker:{generatePubSubScope:true,widgetsForPickedItems:[{name:"alfresco/pickers/PickedItems",assignTo:"pickedItemsWidget"}],widgetsForRootPicker:[{name:"alfresco/menus/AlfVerticalMenuBar",config:{widgets:[{name:"alfresco/menus/AlfMenuBarItem",config:{label:"picker.myFiles.label",publishTopic:"ALF_ADD_PICKER",publishOnRender:"true",publishPayload:{currentPickerDepth:0,picker:[{name:"alfresco/pickers/ContainerListPicker",config:{nodeRef:"alfresco://user/home",path:"/"}}]}}},{name:"alfresco/menus/AlfMenuBarItem",config:{label:"picker.sharedFiles.label",publishTopic:"ALF_ADD_PICKER",publishPayload:{currentPickerDepth:0,picker:[{name:"alfresco/pickers/ContainerListPicker",config:{nodeRef:"alfresco://company/shared",filter:{path:"/"}}}]}}},{name:"alfresco/menus/AlfMenuBarItem",config:{label:"picker.repository.label",publishTopic:"ALF_ADD_PICKER",publishPayload:{currentPickerDepth:0,picker:[{name:"alfresco/pickers/ContainerListPicker",config:{nodeRef:"alfresco://company/home",path:"/"}}]}}},{name:"alfresco/menus/AlfMenuBarItem",config:{label:"picker.recentSites.label",publishTopic:"ALF_ADD_PICKER",publishPayload:{currentPickerDepth:0,picker:[{name:"alfresco/pickers/SingleItemPicker",config:{currentPickerDepth:1,widgetsForSubPicker:[{name:"alfresco/pickers/ContainerListPicker",config:{siteMode:true,libraryRoot:"{siteNodeRef}",nodeRef:"{siteNodeRef}",path:"/"}}],requestItemsTopic:"ALF_GET_RECENT_SITES"}}]}}},{name:"alfresco/menus/AlfMenuBarItem",config:{label:"picker.favouriteSites.label",publishTopic:"ALF_ADD_PICKER",publishPayload:{currentPickerDepth:0,picker:[{name:"alfresco/pickers/SingleItemPicker",config:{currentPickerDepth:1,widgetsForSubPicker:[{name:"alfresco/pickers/ContainerListPicker",config:{siteMode:true,libraryRoot:"{siteNodeRef}",nodeRef:"{siteNodeRef}",path:"/"}}],requestItemsTopic:"ALF_GET_FAVOURITE_SITES"}}]}}}]}}]}})});