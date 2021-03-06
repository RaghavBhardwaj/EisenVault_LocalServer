/**
 * Copyright (C) 2005-2014 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @module alfresco/header/SearchBox
 * @extends dijit/_WidgetBase
 * @mixes dijit/_TemplatedMixin
 * @author Dave Draper
 * @author Kevin Roast
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/SearchBox.html",
        "dojo/text!./templates/LiveSearch.html",
        "dojo/text!./templates/LiveSearchItem.html",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "alfresco/header/AlfMenuBar",
        "service/constants/Default",
        "dojo/json",
        "dojo/dom-attr",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojo/date/stamp",
        "dojo/on"], 
        function(declare, lang, array, _Widget, _Templated, SearchBoxTemplate, LiveSearchTemplate, LiveSearchItemTemplate, AlfCore, AlfXhr, AlfMenuBar, AlfConstants, JSON, DomAttr, DomStyle, DomClass, DomConstruct, Stamp, on) {

   /**
    * LiveSearch widget
    */
   var LiveSearch = declare([_Widget, _Templated, AlfCore], {
      
      /**
       * The scope to use for i18n messages.
       * 
       * @instance
       * @type {string}
       */
      i18nScope: "org.alfresco.SearchBox",
      
      searchBox: null,
      
      /**
       * DOM element container for Documents
       * 
       * @instance
       * @type {object}
       */
      containerNodeDocs: null,
      
      /**
       * DOM element container for Sites
       * 
       * @instance
       * @type {object}
       */
      containerNodeSites: null,
      
      /**
       * DOM element container for People
       * 
       * @instance
       * @type {object}
       */
      containerNodePeople: null,
      
      label: null,
      
      /**
       * @instance
       * @type {string}
       */
      templateString: LiveSearchTemplate,
      
      postMixInProperties: function alfresco_header_LiveSearch_postMixInProperties() {
         // construct our I18N labels ready for template
         this.label = {};
         array.forEach(["documents", "sites", "people", "more"], lang.hitch(this, function(msg) {
            this.label[msg] = this.message("search." + msg);
         }));
      },
      
      onSearchDocsMoreClick: function alfresco_header_LiveSearch_onSearchDocsMoreClick(evt) {
         this.searchBox.liveSearchDocuments(this.searchBox.lastSearchText, this.searchBox.resultsCounts["docs"]);
         evt.preventDefault();
      }
   });
   
   /**
    * LiveSearchItem widget
    */
   var LiveSearchItem = declare([_Widget, _Templated, AlfCore], {

      searchBox: null,
      
      /**
       * @instance
       * @type {string}
       */
      templateString: LiveSearchItemTemplate,
      
      /**
       * Handle storing of a "last" user search in local storage list
       */
      onResultClick: function alfresco_header_LiveSearchItem_onResultClick(evt) {
         this.searchBox.onSaveLastUserSearch();
      }
   });

   /**
    * alfresco/header/SearchBox widget
    */ 
   return declare([_Widget, _Templated, AlfCore, AlfXhr], {

      /**
       * Declare the dependencies on "legacy" JS files that this is wrapping.
       *
       * @instance
       * @type {string[]}
       * @default ["/js/alfresco.js"]
       */
      nonAmdDependencies: ["/js/alfresco.js"],

      /**
       * The scope to use for i18n messages.
       * 
       * @instance
       * @type {string}
       */
      i18nScope: "org.alfresco.SearchBox",

      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/SearchBox.css"}]
       */
      cssRequirements: [{cssFile: "./css/SearchBox.css"}],

      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{i18nFile: "./i18n/SearchBox.properties"}]
       */
      i18nRequirements: [{i18nFile: "./i18n/SearchBox.properties"}],

      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {String}
       */
      templateString: SearchBoxTemplate,

      /**
       * @instance
       * @type {object}
       * @default null
       */
      _searchMenu: null,

      /**
       * @instance
       * @type {integer}
       * @default 180
       */
      _width: "180",

      /**
       * @instance
       * @type {string}
       * @default null
       */
      site: null,

      /**
       * @instance
       * @type {boolean}
       * @default true
       */
      advancedSearch: true,
      
      /**
       * @instance
       * @type {boolean}
       * @default false
       */
      allsites: false,
      
      /**
       * @instance
       * @type {boolean}
       * @default true
       */
      liveSearch: true,
      
      /**
       * @instance
       * @type {string}
       * @default null
       */
      lastSearchText: null,
      
      _keyRepeatWait: 250,
      
      _minimumSearchLength: 2,
      
      _resultPageSize: 5,
      
      _LiveSearch: null,
      
      _requests: null,
      
      _lastSearchIndex: 0,
      
      /**
       * @instance
       * @type {string}
       * @default null
       */
      resultsCounts: null,

      /**
       * @instance
       */
      postMixInProperties: function alfresco_header_SearchBox_postMixInProperties() {
         // construct our I18N labels ready for template
         this.label = {};
         array.forEach(["clear"], lang.hitch(this, function(msg) {
            this.label[msg] = this.message("search." + msg);
         }));
      },

      /**
       * @instance
       */
      postCreate: function alfresco_header_SearchBox__postCreate() {

         this._requests = [];
         this.resultsCounts = {};
         
         DomAttr.set(this._searchTextNode, "id", "HEADER_SEARCHBOX_FORM_FIELD");
         DomAttr.set(this._searchTextNode, "placeholder", this.message("search.instruction"));
         
         on(this._searchTextNode, "keyup", lang.hitch(this, function(evt) {
            this.onSearchBoxKeyUp(evt);
         }));
         on(this._searchTextNode, "keydown", lang.hitch(this, function(evt) {
            this.onSearchBoxKeyDown(evt);
         }));
         
         // construct the optional advanced search menu
         if (this.advancedSearch)
         {
            var currSite = lang.getObject("Alfresco.constants.SITE");

            this._searchMenu = new AlfMenuBar({
               widgets: [
                  {
                     name: "alfresco/header/AlfMenuBarPopup",
                     config: {
                        id: this.id + "_DROPDOWN_MENU",
                        showArrow: false,
                        label: "",
                        iconSrc: "js/alfresco/header/css/images/search-16-gray.png",
                        iconClass: "alf-search-icon",
                        widgets: [
                           {
                              name: "alfresco/menus/AlfMenuItem",
                              config: {
                                 id: this.id + "_ADVANCED_SEARCH",
                                 i18nScope: "org.alfresco.SearchBox",
                                 label: "search.advanced",
                                 targetUrl: (currSite ? "site/" + currSite + "/" : "") + "advsearch"
                              }
                           }
                        ]
                     }
                  }
               ]
            });
            this._searchMenu.placeAt(this._searchMenuNode);
            this._searchMenu.startup();
         }

         if (this.liveSearch)
         {
            // construct the live search panel
            this._LiveSearch = new LiveSearch({
               searchBox: this
            });
            this._LiveSearch.placeAt(this._searchLiveNode);

            // event handlers to hide/show the panel
            on(window, "click", lang.hitch(this, function(evt) {
               DomStyle.set(this._LiveSearch.containerNode, "display", "none");
            }));
            on(this._searchTextNode, "click", lang.hitch(this, function(evt) {
               this.updateResults();
               evt.stopPropagation();
            }));
            on(this._LiveSearch, "click", function(evt) {
               evt.stopPropagation();
            });
         }
         
         this.addAccessibilityLabel();
      },

      /**
       * This indicated whether or not the search box should link to the faceted search page or not. It is used by the
       * [generateSearchPageLink fuction]{@link module:alfresco/header/SearchBox#generateSearchPageLink} to determine
       * the URL to generate for displaying search results. By default it will be the faceted search page.
       *
       * @instance
       * @type {boolean}
       * @default true
       */
      linkToFacetedSearch: true,

      /**
       * This function is called from the [onSearchBoxKeyUp function]{@link module:alfresco/header/SearchBox#onSearchBoxKeyUp}
       * when the enter key is pressed and will generate a link to either the faceted search page or the old search page
       * based on the value of [linkToFacetedSearch]{@link module:alfresco/header/SearchBox#linkToFacetedSearch}. This function
       * can also be overridden by extending modules to link to an entirely new search page.
       *
       * @instance
       * @param {string} terms The search terms to use
       * @returns {string} The URL for the search page.
       */
      generateSearchPageLink: function alfresco_header_SearchBox__generateSearchPageLink(terms) {
         var url;
         if (this.linkToFacetedSearch === true)
         {
            // Generate faceted search page link...
            url = "dp/ws/faceted-search#searchTerm=" + encodeURIComponent(terms) + "&scope=repo&sortField=Relevance";
            if (this.site != null)
            {
               url = "site/" + this.site + "/" + url;
            }
         }
         else
         {
            // Generate old search page link...
            url = "search?t=" + encodeURIComponent(terms) + (this.allsites ? "&a=true&r=false" : "&a=false&r=true");
            if (this.site != null)
            {
               url = "site/" + this.site + "/" + url;
            }
         }
         this.alfLog("log", "Generated search page link", url, this);
         return url;
      },
      
      /**
       * Check if the web browser supports HTML5 local storage
       * 
       * @returns {boolean} true if local storage is available, false otherwise
       */
      _supportsLocalStorage : function alfresco_header_SearchBox__supportsLocalStorage() {
         try {
            return 'localStorage' in window && window['localStorage'] !== null;
         }
         catch (e) {
            return false;
         }
      },
      
      onSaveLastUserSearch: function alfresco_header_SearchBox__onSaveLastUserSearch() {
         var terms = lang.trim(this._searchTextNode.value);
         if (terms.length !== 0)
         {
            if (this._supportsLocalStorage())
            {
               var searches = JSON.parse(localStorage.getItem("ALF_SEARCHBOX_HISTORY")) || [];
               if (searches.length === 0 || searches[searches.length - 1] !== terms)
               {
                  searches.push(terms);
                  if (searches.length > 16)
                  {
                     searches = searches.slice(searches.length - 16);
                  }
                  localStorage.setItem("ALF_SEARCHBOX_HISTORY", JSON.stringify(searches));
               }
            }
         }
      },
      
      /**
       * Handles keydown events that occur on the <input> element. Used to page through last user searches
       * and ensure no other components handle the cursor key events.
       * @instance
       * @param {object} evt The keydown event
       */
      onSearchBoxKeyDown: function alfresco_header_SearchBox__onSearchBoxKeyDown(evt) {
         switch (evt.keyCode)
         {
            // Ensure left/right arrow key events are handled only by this component
            case 37:
            case 39:
            {
               evt.stopPropagation();
               break;
            }
            
            // Up Arrow press
            case 38:
            {
               evt.stopPropagation();
               if (this._supportsLocalStorage())
               {
                  var searches = JSON.parse(localStorage.getItem("ALF_SEARCHBOX_HISTORY"));
                  if (searches)
                  {
                     if (this._lastSearchIndex === 0)
                     {
                        this._lastSearchIndex = searches.length - 1;
                     }
                     else
                     {
                        this._lastSearchIndex--;
                     }
                     this._searchTextNode.value = searches[this._lastSearchIndex];
                     this.onSearchBoxKeyUp(evt);
                  }
               }
               break;
            }
            
            // Down Arrow press
            case 40:
            {
               evt.stopPropagation();
               if (this._supportsLocalStorage())
               {
                  var searches = JSON.parse(localStorage.getItem("ALF_SEARCHBOX_HISTORY"));
                  if (searches)
                  {
                     if (this._lastSearchIndex === searches.length - 1)
                     {
                        this._lastSearchIndex = 0;
                     }
                     else
                     {
                        this._lastSearchIndex++;
                     }
                     this._searchTextNode.value = searches[this._lastSearchIndex];
                     this.onSearchBoxKeyUp(evt);
                  }
               }
               break;
            }
         }
      },

      /**
       * Handles keyup events that occur on the <input> element used for capturing search terms.
       * @instance
       * @param {object} evt The keyup event
       */
      onSearchBoxKeyUp: function alfresco_header_SearchBox__onSearchBoxKeyUp(evt) {
         var terms = lang.trim(this._searchTextNode.value);
         switch (evt.keyCode)
         {
            // Enter key press
            case 13:
            {
               if (terms.length !== 0)
               {
                  this.onSaveLastUserSearch();
                  // ACE-1798 - always close the live search drop-down on enter keypress..
                  this.clearResults();
                  this.alfLog("log", "Search request for: ", terms);
                  var url = this.generateSearchPageLink(terms);
                  this.alfPublish("ALF_NAVIGATE_TO_PAGE", { 
                     url: url,
                     type: "SHARE_PAGE_RELATIVE",
                     target: "CURRENT"
                  });
               }
               break;
            }
            
            // Other key press
            default:
            {
               if (this.liveSearch)
               {
                  if (terms.length >= this._minimumSearchLength && terms !== this.lastSearchText)
                  {
                     this.lastSearchText = terms;

                     // abort previous XHR requests to ensure we don't display results from a previous potentially slower query
                     for (var i=0; i<this._requests.length; i++)
                     {
                        this._requests[i].cancel();
                     }
                     this._requests = [];

                     // execute our live search queries in a few ms if user has not continued typing
                     if (this._timeoutHandle)
                     {
                        clearTimeout(this._timeoutHandle);
                     }
                     var _this = this;
                     this._timeoutHandle = setTimeout(function() {
                        _this.liveSearchDocuments(terms, 0);
                        _this.liveSearchSites(terms, 0);
                        _this.liveSearchPeople(terms, 0);
                     }, this._keyRepeatWait);
                  }
               }
               if (terms.length === 0)
               {
                  this.clearResults();
               }
            }
         }
      },
      
      liveSearchDocuments: function alfresco_header_SearchBox_liveSearchDocuments(terms, startIndex) {
         this._requests.push(
            this.serviceXhr({
               url: AlfConstants.PROXY_URI + "slingshot/live-search-docs?t=" + encodeURIComponent(terms) + "&maxResults=" + this._resultPageSize + "&startIndex=" + startIndex,
               method: "GET",
               successCallback: function(response) {
                  if (startIndex === 0)
                  {
                     this._LiveSearch.containerNodeDocs.innerHTML = "";
                  }
                  
                  // construct each Document item as a LiveSearchItem widget
                  array.forEach(response.items, function(item) {
                     // construct the meta-data - site information, modified by and title description as tooltip
                     var site = (item.site ? "site/" + item.site.shortName + "/" : "");
                     var info = "";
                     if (item.site)
                     {
                        info += "<a href='" + AlfConstants.URL_PAGECONTEXT + site + "documentlibrary'>" + this.encodeHTML(item.site.title) + "</a> | ";
                     }
                     info += "<a href='" + AlfConstants.URL_PAGECONTEXT + "user/" + this.encodeHTML(item.modifiedBy) + "/profile'>" + this.encodeHTML(item.modifiedBy) + "</a> | ";
                     info += Alfresco.util.relativeTime(item.modifiedOn) + " | ";
                     info += Alfresco.util.formatFileSize(item.size)

                     var desc = this.encodeHTML(item.title);
                     if (item.description) desc += (desc.length !== 0 ? "\r\n" : "") + this.encodeHTML(item.description);
                     // build the widget for the item - including the thumbnail url for the document
                     var link;
                     switch (item.container)
                     {
                        case "wiki":
                           link = "wiki-page?title=" + encodeURIComponent(item.name);
                           break;
                        case "blog":
                           link = "blog-postview?postId=" + encodeURIComponent(item.name);
                           item.name = item.title;
                           break;
                        default:
                           link = "document-details?nodeRef=" + item.nodeRef;
                           break;
                     }
                     var itemLink = new LiveSearchItem({
                        searchBox: this,
                        cssClass: "alf-livesearch-thumbnail",
                        title: desc,
                        label: this.encodeHTML(item.name),
                        link: AlfConstants.URL_PAGECONTEXT + site + link,
                        icon: AlfConstants.PROXY_URI + "api/node/" + item.nodeRef.replace(":/", "") + "/content/thumbnails/doclib?c=queue&ph=true&lastModified=" + (item.lastThumbnailModification || 1),
                        alt: this.encodeHTML(item.name),
                        meta: info
                     });
                     itemLink.placeAt(this._LiveSearch.containerNodeDocs);
                  }, this);
                  // the more action is added if more results are potentially available
                  DomStyle.set(this._LiveSearch.nodeDocsMore, "display", response.hasMoreRecords ? "block" : "none");
                  // record the count of results
                  if (startIndex === 0)
                  {
                     this.resultsCounts["docs"] = 0;
                  }
                  this.resultsCounts["docs"] += response.items.length;
                  this.updateResults();
               },
               failureCallback: function(response) {
                  DomStyle.set(this._LiveSearch.nodeDocsMore, "display", "none");
                  if (startIndex === 0)
                  {
                     this._LiveSearch.containerNodeDocs.innerHTML = "";
                     this.resultsCounts["docs"] = 0;
                  }
                  this.updateResults();
               },
               callbackScope: this
            }));
      },

      liveSearchSites: function alfresco_header_SearchBox_liveSearchSites(terms, startIndex) {
         this._requests.push(
            this.serviceXhr({
               url: AlfConstants.PROXY_URI + "slingshot/live-search-sites?t=" + encodeURIComponent(terms) + "&maxResults=" + this._resultPageSize,
               method: "GET",
               successCallback: function(response) {
                  this._LiveSearch.containerNodeSites.innerHTML = "";
                  
                  // construct each Site item as a LiveSearchItem widget
                  array.forEach(response.items, function(item) {
                     var itemLink = new LiveSearchItem({
                        searchBox: this,
                        cssClass: "alf-livesearch-icon",
                        title: this.encodeHTML(item.description),
                        label: this.encodeHTML(item.title),
                        link: AlfConstants.URL_PAGECONTEXT + "site/" + item.shortName + "/dashboard",
                        icon: AlfConstants.URL_RESCONTEXT + "components/images/filetypes/generic-site-32.png",
                        alt: this.encodeHTML(item.title),
                        meta: item.description ? this.encodeHTML(item.description) : "&nbsp;"
                     });
                     itemLink.placeAt(this._LiveSearch.containerNodeSites);
                  }, this);
                  this.resultsCounts["sites"] = response.items.length;
                  this.updateResults();
               },
               failureCallback: function(response) {
                  this._LiveSearch.containerNodeSites.innerHTML = "";
                  this.resultsCounts["sites"] = 0;
                  this.updateResults();
               },
               callbackScope: this
            }));
      },
      
      liveSearchPeople: function alfresco_header_SearchBox_liveSearchPeople(terms, startIndex) {
         this._requests.push(
            this.serviceXhr({
               url: AlfConstants.PROXY_URI + "slingshot/live-search-people?t=" + encodeURIComponent(terms) + "&maxResults=" + this._resultPageSize,
               method: "GET",
               successCallback: function(response) {
                  this._LiveSearch.containerNodePeople.innerHTML = "";
                  
                  // construct each Person item as a LiveSearchItem widget
                  array.forEach(response.items, function(item) {
                     var fullName = item.firstName + " " + item.lastName;
                     var meta = this.encodeHTML(item.jobtitle || "") + (item.location ? (", "+this.encodeHTML(item.location)) : "");
                     var itemLink = new LiveSearchItem({
                        searchBox: this,
                        cssClass: "alf-livesearch-icon",
                        title: this.encodeHTML(item.jobtitle || ""),
                        label: this.encodeHTML(fullName + " (" + item.userName + ")"),
                        link: AlfConstants.URL_PAGECONTEXT + "user/" + encodeURIComponent(item.userName) + "/profile",
                        icon: AlfConstants.PROXY_URI + "slingshot/profile/avatar/" + encodeURIComponent(item.userName) + "/thumbnail/avatar32",
                        alt: this.encodeHTML(fullName),
                        meta: meta ? meta : "&nbsp;"
                     });
                     itemLink.placeAt(this._LiveSearch.containerNodePeople);
                  }, this);
                  this.resultsCounts["people"] = response.items.length;
                  this.updateResults();
               },
               failureCallback: function(response) {
                  this._LiveSearch.containerNodePeople.innerHTML = "";
                  this.resultsCounts["people"] = 0;
                  this.updateResults();
               },
               callbackScope: this
            }));
      },

      updateResults: function alfresco_header_SearchBox_showResults()
      {
         var anyResults = false;

         // Documents
         if (this.resultsCounts["docs"] > 0)
         {
            anyResults = true;
            DomStyle.set(this._LiveSearch.titleNodeDocs, "display", "block");
            DomStyle.set(this._LiveSearch.containerNodeDocs, "display", "block");
         }
         else
         {
            DomStyle.set(this._LiveSearch.titleNodeDocs, "display", "none");
            DomStyle.set(this._LiveSearch.containerNodeDocs, "display", "none");
         }

         // Sites
         if (this.resultsCounts["sites"] > 0)
         {
            anyResults = true;
            DomStyle.set(this._LiveSearch.titleNodeSites, "display", "block");
            DomStyle.set(this._LiveSearch.containerNodeSites, "display", "block");
         }
         else
         {
            DomStyle.set(this._LiveSearch.titleNodeSites, "display", "none");
            DomStyle.set(this._LiveSearch.containerNodeSites, "display", "none");
         }

         // People
         if (this.resultsCounts["people"] > 0)
         {
            anyResults = true;
            DomStyle.set(this._LiveSearch.titleNodePeople, "display", "block");
            DomStyle.set(this._LiveSearch.containerNodePeople, "display", "block");
         }
         else
         {
            DomStyle.set(this._LiveSearch.titleNodePeople, "display", "none");
            DomStyle.set(this._LiveSearch.containerNodePeople, "display", "none");
         }

         // Results pane
         if (anyResults)
         {
            DomStyle.set(this._LiveSearch.containerNode, "display", "block");
         }
         else
         {
            DomStyle.set(this._LiveSearch.containerNode, "display", "none");
         }
      },

      clearResults: function alfresco_header_SearchBox_clearResults()
      {
         this._searchTextNode.value = "";
         if (this.liveSearch)
         {
            this.lastSearchText = "";

            for (var i=0; i<this._requests.length; i++)
            {
               this._requests[i].cancel();
            }
            this._requests = [];

            this.resultsCounts = {};
            this._LiveSearch.containerNodeDocs.innerHTML = "";
            this._LiveSearch.containerNodePeople.innerHTML = "";
            this._LiveSearch.containerNodeSites.innerHTML = "";

            DomStyle.set(this._LiveSearch.nodeDocsMore, "display", "none");

            this.updateResults();
         }
         this._searchTextNode.focus();
      },

      /**
       * When the search box loads, add a label to support accessibility
       * @instance
       */
      addAccessibilityLabel: function alfresco_header_SearchBox__addAccessibilityLabel() {
         DomConstruct.create("label", {
            "for": "HEADER_SEARCHBOX_FORM_FIELD",
            innerHTML: this.message("search.label"),
            "class": "hidden"
         }, this._searchTextNode, "before");
      },

      onSearchClearClick: function alfresco_header_LiveSearch_onSearchClearClick(evt) {
         this.clearResults();
         evt.preventDefault();
      }

   });
});
