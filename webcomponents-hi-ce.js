(function(){
/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';(function(a){function b(a,b){if("function"===typeof window.CustomEvent)return new CustomEvent(a,b);var l=document.createEvent("CustomEvent");l.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return l}function f(a){if(u)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;if("function"===typeof b.closest)b=b.closest("link[rel=import]");else for(;!n(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=document.querySelectorAll("link[rel=import]:not(import-dependency)"),
c=b.length;if(c)for(var l=0,e=b.length,f;l<e&&(f=b[l]);l++)r(f,function(){0===--c&&a()});else a()}function c(a){if("loading"!==document.readyState)a();else{var b=function(){"loading"!==document.readyState&&(document.removeEventListener("readystatechange",b),a())};document.addEventListener("readystatechange",b)}}function e(a){c(function(){return d(function(){return a&&a()})})}function r(a,b){if(a.__loaded)b&&b();else if("script"!==a.localName||a.src){var c=function(e){a.removeEventListener(e.type,
c);a.__loaded=!0;b&&b()};a.addEventListener("load",c);A&&"style"===a.localName||a.addEventListener("error",c)}else a.__loaded=!0,b&&b()}function n(a){return a.nodeType===Node.ELEMENT_NODE&&"link"===a.localName&&"import"===a.rel}function k(){var a=this;this.documents={};this.inflight=0;this.dynamicImportsMO=new MutationObserver(function(b){return a.handleMutations(b)});c(function(){a.dynamicImportsMO.observe(document.head,{childList:!0,subtree:!0});a.loadImports(document)})}var u="import"in document.createElement("link"),
x=null;!1==="currentScript"in document&&Object.defineProperty(document,"currentScript",{get:function(){return x||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var P=/(^\/)|(^#)|(^[\w-\d]*:)/,Q=/(url\()([^)]*)(\))/g,R=/(@import[\s]+(?!url\())([^;]*)(;)/g,S=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,m={fixUrls:function(a,b){a.href&&a.setAttribute("href",m.replaceAttrUrl(a.getAttribute("href"),b));a.src&&a.setAttribute("src",m.replaceAttrUrl(a.getAttribute("src"),
b));"style"===a.localName&&m.resolveUrlsInStyle(a,b)},fixUrlAttributes:function(a,b){for(var c=["action","src","href","url","style"],e=0,f;e<c.length&&(f=c[e]);e++){var d=a.attributes[f],l=d&&d.value;l&&0>l.search(/({{|\[\[)/)&&(d.value="style"===f?m.resolveUrlsInCssText(l,b):m.replaceAttrUrl(l,b))}},fixUrlsInTemplates:function(a,b){a=a.querySelectorAll("template");for(var c=0;c<a.length;c++)m.fixUrlsInTemplate(a[c],b)},fixUrlsInTemplate:function(a,b){a=a.content||a;for(var c=a.querySelectorAll("style, form[action], [src], [href], [url], [style]"),
e=0;e<c.length;e++){var f=c[e];"style"==f.localName?m.resolveUrlsInStyle(f,b):m.fixUrlAttributes(f,b)}m.fixUrlsInTemplates(a,b)},resolveUrlsInStyle:function(a,b){a.textContent=m.resolveUrlsInCssText(a.textContent,b)},resolveUrlsInCssText:function(a,b){a=m.replaceUrls(a,b,Q);return a=m.replaceUrls(a,b,R)},replaceUrls:function(a,b,c){return a.replace(c,function(a,c,e,f){a=e.replace(/["']/g,"");b&&(a=m.resolveUrl(a,b));return c+"'"+a+"'"+f})},replaceAttrUrl:function(a,b){return a&&P.test(a)?a:m.resolveUrl(a,
b)},resolveUrl:function(a,b){if(void 0===m.__workingURL){m.__workingURL=!1;try{var c=new URL("b","http://a");c.pathname="c%20d";m.__workingURL="http://a/c%20d"===c.href}catch(da){}}if(m.__workingURL)return(new URL(a,b)).href;c=m.__tempDoc;c||(c=document.implementation.createHTMLDocument("temp"),m.__tempDoc=c,c.__base=c.createElement("base"),c.head.appendChild(c.__base),c.__anchor=c.createElement("a"));c.__base.href=b;c.__anchor.href=a;return c.__anchor.href||a}},H={async:!0,load:function(a,b,c){if(a)if(a.match(/^data:/)){a=
a.split(",");var e=a[1],e=-1<a[0].indexOf(";base64")?atob(e):decodeURIComponent(e);b(e)}else{var f=new XMLHttpRequest;f.open("GET",a,H.async);f.onload=function(){var a=f.getResponseHeader("Location");a&&0===a.indexOf("/")&&(a=(location.origin||location.protocol+"//"+location.host)+a);var e=f.response||f.responseText;304===f.status||0===f.status||200<=f.status&&300>f.status?b(e,a):c(e)};f.send()}else c("error: href must be specified")}},A=/Trident/.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent);
k.prototype.loadImports=function(a){a=a.querySelectorAll("link[rel=import]");for(var b=0,c=a.length;b<c;b++)this.loadImport(a[b])};k.prototype.loadImport=function(a){var b=this,c=a.href;if(void 0!==this.documents[c]){var e=this.documents[c];e&&e.__loaded&&(a.import=e,this.fireEventIfNeeded(a))}else this.inflight++,this.documents[c]="pending",H.load(c,function(a,e){a=b.makeDocument(a,e||c);b.documents[c]=a;b.inflight--;b.loadImports(a);b.processImportsIfLoadingDone()},function(){b.documents[c]=null;
b.inflight--;b.processImportsIfLoadingDone()})};k.prototype.makeDocument=function(a,b){if(!a)return document.createDocumentFragment();A&&(a=a.replace(S,function(a,b,c){return-1===a.indexOf("type=")?b+" type=import-disable "+c:a}));var c=document.createElement("template");c.innerHTML=a;if(c.content)a=c.content;else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);if(c=a.querySelector("base"))b=m.replaceAttrUrl(c.getAttribute("href"),b),c.removeAttribute("href");for(var c=
a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]'),e=0,f=0,d=c.length,l;f<d&&(l=c[f]);f++)r(l),m.fixUrls(l,b),l.setAttribute("import-dependency",""),"script"===l.localName&&!l.src&&l.textContent&&(l.setAttribute("src","data:text/javascript;charset=utf-8,"+encodeURIComponent(l.textContent+("\n//# sourceURL="+
b+(e?"-"+e:"")+".js\n"))),l.textContent="",e++);m.fixUrlsInTemplates(a,b);return a};k.prototype.processImportsIfLoadingDone=function(){var a=this;if(!this.inflight){this.dynamicImportsMO.disconnect();this.flatten(document);var b=!1,c=!1,e=function(){c&&b&&(a.dynamicImportsMO.observe(document.head,{childList:!0,subtree:!0}),a.fireEvents())};this.waitForStyles(function(){c=!0;e()});this.runScripts(function(){b=!0;e()})}};k.prototype.flatten=function(a){a=a.querySelectorAll("link[rel=import]");for(var b=
{},c=0,e=a.length;c<e&&(b.n=a[c]);b={n:b.n},c++){var f=this.documents[b.n.href];(b.n.import=f)&&f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(this.documents[b.n.href]=b.n,b.n.readyState="loading",b.n.import=b.n,Object.defineProperty(b.n,"baseURI",{get:function(a){return function(){return a.n.href}}(b),configurable:!0,enumerable:!0}),this.flatten(f),b.n.appendChild(f))}};k.prototype.runScripts=function(a){function b(f){if(f<e){var d=c[f],l=document.createElement("script");d.removeAttribute("import-dependency");
for(var n=0,k=d.attributes.length;n<k;n++)l.setAttribute(d.attributes[n].name,d.attributes[n].value);x=l;d.parentNode.replaceChild(l,d);r(l,function(){x=null;b(f+1)})}else a()}var c=document.querySelectorAll("script[import-dependency]"),e=c.length;b(0)};k.prototype.waitForStyles=function(a){var b=document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),c=b.length;if(c)for(var e=A&&!!document.querySelector("link[rel=stylesheet][href][type=import-disable]"),
d={},l=0,n=b.length;l<n&&(d.s=b[l]);d={s:d.s},l++){if(r(d.s,function(b){return function(){b.s.removeAttribute("import-dependency");0===--c&&a()}}(d)),e&&d.s.parentNode!==document.head){var k=document.createElement(d.s.localName);k.__appliedElement=d.s;k.setAttribute("type","import-placeholder");d.s.parentNode.insertBefore(k,d.s.nextSibling);for(k=f(d.s);k&&f(k);)k=f(k);k.parentNode!==document.head&&(k=null);document.head.insertBefore(d.s,k);d.s.removeAttribute("type")}}else a()};k.prototype.fireEvents=
function(){for(var a=document.querySelectorAll("link[rel=import]"),b=a.length-1,c;0<=b&&(c=a[b]);b--)this.fireEventIfNeeded(c)};k.prototype.fireEventIfNeeded=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState="complete"),a.dispatchEvent(b(a.import?"load":"error",{bubbles:!1,cancelable:!1,detail:void 0})))};k.prototype.handleMutations=function(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.addedNodes)for(var e=0;e<c.addedNodes.length;e++){var f=c.addedNodes[e];f&&f.nodeType===Node.ELEMENT_NODE&&
(n(f)?this.loadImport(f):this.loadImports(f))}}};if(u){for(var v=document.querySelectorAll("link[rel=import]"),B=0,T=v.length,y;B<T&&(y=v[B]);B++)y.import&&"loading"===y.import.readyState||(y.__loaded=!0);v=function(a){a=a.target;n(a)&&(a.__loaded=!0)};document.addEventListener("load",v,!0);document.addEventListener("error",v,!0)}else new k;e(function(){return document.dispatchEvent(b("HTMLImportsLoaded",{cancelable:!0,bubbles:!0,detail:void 0}))});a.useNative=u;a.whenReady=e;a.importForElement=f})(window.HTMLImports=
window.HTMLImports||{});var g={},h=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function p(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
function q(a,b,f){f=void 0===f?new Set:f;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var c=d;b(c);var e=c.localName;if("link"===e&&"import"===c.getAttribute("rel")){d=c.import;if(d instanceof Node&&!f.has(d))for(f.add(d),d=d.firstChild;d;d=d.nextSibling)q(d,b,f);d=p(a,c);continue}else if("template"===e){d=p(a,c);continue}if(c=c.__CE_shadowRoot)for(c=c.firstChild;c;c=c.nextSibling)q(c,b,f)}d=d.firstChild?d.firstChild:p(a,d)}}
g.isValidCustomElementName=function(a){var b=h.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a};g.isConnected=function(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))};g.walkDeepDescendantElements=q;g.setPropertyUnchecked=function(a,b,f){a[b]=f};var t={default:{custom:1,failed:2}};var w={};function z(){this._localNameToDefinition=new Map;this._constructorToDefinition=new Map;this._patches=[];this._hasPatches=!1}z.prototype.setDefinition=function(a,b){this._localNameToDefinition.set(a,b);this._constructorToDefinition.set(b.constructor,b)};z.prototype.localNameToDefinition=function(a){return this._localNameToDefinition.get(a)};z.prototype.constructorToDefinition=function(a){return this._constructorToDefinition.get(a)};z.prototype.addPatch=function(a){this._hasPatches=!0;this._patches.push(a)};
z.prototype.patchTree=function(a){var b=this;this._hasPatches&&g.walkDeepDescendantElements(a,function(a){return b.patch(a)})};z.prototype.patch=function(a){if(this._hasPatches&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this._patches.length;b++)this._patches[b](a)}};z.prototype.connectTree=function(a){var b=[];g.walkDeepDescendantElements(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var f=b[a];f.__CE_state===t.default.custom?this.connectedCallback(f):this.upgradeElement(f)}};
z.prototype.disconnectTree=function(a){var b=[];g.walkDeepDescendantElements(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var f=b[a];f.__CE_state===t.default.custom&&this.disconnectedCallback(f)}};
z.prototype.patchAndUpgradeTree=function(a,b){b=void 0===b?new Set:b;var f=this,d=[];g.walkDeepDescendantElements(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var c=a.import;c instanceof Node&&"complete"===c.readyState?(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0):a.addEventListener("load",function(){var c=a.import;c.__CE_documentLoadHandled||(c.__CE_documentLoadHandled=!0,c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0,new Set(b),b.delete(c),f.patchAndUpgradeTree(c,
b))})}else d.push(a)},b);if(this._hasPatches)for(a=0;a<d.length;a++)this.patch(d[a]);for(a=0;a<d.length;a++)this.upgradeElement(d[a])};
z.prototype.upgradeElement=function(a){if(void 0===a.__CE_state){var b=this.localNameToDefinition(a.localName);if(b){b.constructionStack.push(a);var f=b.constructor;try{try{if(new f!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{b.constructionStack.pop()}}catch(e){throw a.__CE_state=t.default.failed,e;}a.__CE_state=t.default.custom;a.__CE_definition=b;if(b.attributeChangedCallback)for(b=b.observedAttributes,f=0;f<b.length;f++){var d=b[f],c=a.getAttribute(d);
null!==c&&this.attributeChangedCallback(a,d,null,c,null)}g.isConnected(a)&&this.connectedCallback(a)}}};z.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};z.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
z.prototype.attributeChangedCallback=function(a,b,f,d,c){var e=a.__CE_definition;e.attributeChangedCallback&&-1<e.observedAttributes.indexOf(b)&&e.attributeChangedCallback.call(a,b,f,d,c)};w.default=z;var C={};function D(a,b){this._internals=a;this._document=b;this._observer=void 0;this._internals.patchAndUpgradeTree(this._document);"loading"===this._document.readyState&&(this._observer=new MutationObserver(this._handleMutations.bind(this)),this._observer.observe(this._document,{childList:!0,subtree:!0}))}D.prototype.disconnect=function(){this._observer&&this._observer.disconnect()};
D.prototype._handleMutations=function(a){var b=this._document.readyState;"interactive"!==b&&"complete"!==b||this.disconnect();for(b=0;b<a.length;b++)for(var f=a[b].addedNodes,d=0;d<f.length;d++)this._internals.patchAndUpgradeTree(f[d])};C.default=D;var E={};function F(){var a=this;this._resolve=this._value=void 0;this._promise=new Promise(function(b){a._resolve=b;a._value&&b(a._value)})}F.prototype.resolve=function(a){if(this._value)throw Error("Already resolved.");this._value=a;this._resolve&&this._resolve(a)};F.prototype.toPromise=function(){return this._promise};E.default=F;var G={};function I(a){this._elementDefinitionIsRunning=!1;this._internals=a;this._whenDefinedDeferred=new Map;this._flushCallback=function(a){return a()};this._flushPending=!1;this._unflushedLocalNames=[];this._documentConstructionObserver=new C.default(a,document)}
I.prototype.define=function(a,b){var f=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!g.isValidCustomElementName(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this._internals.localNameToDefinition(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this._elementDefinitionIsRunning)throw Error("A custom element is already being defined.");this._elementDefinitionIsRunning=!0;var d,c,e,r,
n;try{var k=function(a){var b=u[a];if(void 0!==b&&!(b instanceof Function))throw Error("The '"+a+"' callback must be a function.");return b},u=b.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");d=k("connectedCallback");c=k("disconnectedCallback");e=k("adoptedCallback");r=k("attributeChangedCallback");n=b.observedAttributes||[]}catch(x){return}finally{this._elementDefinitionIsRunning=!1}this._internals.setDefinition(a,{localName:a,
constructor:b,connectedCallback:d,disconnectedCallback:c,adoptedCallback:e,attributeChangedCallback:r,observedAttributes:n,constructionStack:[]});this._unflushedLocalNames.push(a);this._flushPending||(this._flushPending=!0,this._flushCallback(function(){return f._flush()}))};
I.prototype._flush=function(){if(!1!==this._flushPending)for(this._flushPending=!1,this._internals.patchAndUpgradeTree(document);0<this._unflushedLocalNames.length;){var a=this._unflushedLocalNames.shift();(a=this._whenDefinedDeferred.get(a))&&a.resolve(void 0)}};I.prototype.get=function(a){if(a=this._internals.localNameToDefinition(a))return a.constructor};
I.prototype.whenDefined=function(a){if(!g.isValidCustomElementName(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this._whenDefinedDeferred.get(a);if(b)return b.toPromise();b=new E.default;this._whenDefinedDeferred.set(a,b);this._internals.localNameToDefinition(a)&&-1===this._unflushedLocalNames.indexOf(a)&&b.resolve(void 0);return b.toPromise()};
I.prototype.polyfillWrapFlushCallback=function(a){this._documentConstructionObserver.disconnect();var b=this._flushCallback;this._flushCallback=function(f){return a(function(){return b(f)})}};window.CustomElementRegistry=I;I.prototype.define=I.prototype.define;I.prototype.get=I.prototype.get;I.prototype.whenDefined=I.prototype.whenDefined;I.prototype.polyfillWrapFlushCallback=I.prototype.polyfillWrapFlushCallback;G.default=I;var J={},K={Document_createElement:window.Document.prototype.createElement,Document_createElementNS:window.Document.prototype.createElementNS,Document_importNode:window.Document.prototype.importNode,Document_prepend:window.Document.prototype.prepend,Document_append:window.Document.prototype.append,Node_cloneNode:window.Node.prototype.cloneNode,Node_appendChild:window.Node.prototype.appendChild,Node_insertBefore:window.Node.prototype.insertBefore,Node_removeChild:window.Node.prototype.removeChild,
Node_replaceChild:window.Node.prototype.replaceChild,Node_textContent:Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),Element_attachShadow:window.Element.prototype.attachShadow,Element_innerHTML:Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Element_getAttribute:window.Element.prototype.getAttribute,Element_setAttribute:window.Element.prototype.setAttribute,Element_removeAttribute:window.Element.prototype.removeAttribute,Element_getAttributeNS:window.Element.prototype.getAttributeNS,
Element_setAttributeNS:window.Element.prototype.setAttributeNS,Element_removeAttributeNS:window.Element.prototype.removeAttributeNS,Element_insertAdjacentElement:window.Element.prototype.insertAdjacentElement,Element_prepend:window.Element.prototype.prepend,Element_append:window.Element.prototype.append,Element_before:window.Element.prototype.before,Element_after:window.Element.prototype.after,Element_replaceWith:window.Element.prototype.replaceWith,Element_remove:window.Element.prototype.remove,
HTMLElement:window.HTMLElement,HTMLElement_innerHTML:Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),HTMLElement_insertAdjacentElement:window.HTMLElement.prototype.insertAdjacentElement};J.default=K;var L={},M=new function(){};L.default=M;var N={default:function(a){window.HTMLElement=function(){function b(){var b=this.constructor,d=a.constructorToDefinition(b);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var c=d.constructionStack;if(0===c.length)return c=J.default.Document_createElement.call(document,d.localName),Object.setPrototypeOf(c,b.prototype),c.__CE_state=t.default.custom,c.__CE_definition=d,a.patch(c),c;var d=c.length-1,e=c[d];if(e===L.default)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
c[d]=L.default;Object.setPrototypeOf(e,b.prototype);a.patch(e);return e}b.prototype=J.default.HTMLElement.prototype;return b}()}};var O={default:function(a,b,f){b.prepend=function(b){for(var c=[],e=0;e<arguments.length;++e)c[e-0]=arguments[e];e=c.filter(function(a){return a instanceof Node&&g.isConnected(a)});f.prepend.apply(this,c);for(var d=0;d<e.length;d++)a.disconnectTree(e[d]);if(g.isConnected(this))for(e=0;e<c.length;e++)d=c[e],d instanceof Element&&a.connectTree(d)};b.append=function(b){for(var c=[],e=0;e<arguments.length;++e)c[e-0]=arguments[e];e=c.filter(function(a){return a instanceof Node&&g.isConnected(a)});f.append.apply(this,
c);for(var d=0;d<e.length;d++)a.disconnectTree(e[d]);if(g.isConnected(this))for(e=0;e<c.length;e++)d=c[e],d instanceof Element&&a.connectTree(d)}}};var U={default:function(a){g.setPropertyUnchecked(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var f=a.localNameToDefinition(b);if(f)return new f.constructor}b=J.default.Document_createElement.call(this,b);a.patch(b);return b});g.setPropertyUnchecked(Document.prototype,"importNode",function(b,f){b=J.default.Document_importNode.call(this,b,f);this.__CE_hasRegistry?a.patchAndUpgradeTree(b):a.patchTree(b);return b});g.setPropertyUnchecked(Document.prototype,"createElementNS",
function(b,f){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var d=a.localNameToDefinition(f);if(d)return new d.constructor}b=J.default.Document_createElementNS.call(this,b,f);a.patch(b);return b});O.default(a,Document.prototype,{prepend:J.default.Document_prepend,append:J.default.Document_append})}};var V={default:function(a){function b(b,d){Object.defineProperty(b,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var f=this.childNodes,n=f.length;if(0<n&&g.isConnected(this))for(var c=Array(n),k=0;k<n;k++)c[k]=f[k]}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)a.disconnectTree(c[b])}}})}g.setPropertyUnchecked(Node.prototype,"insertBefore",function(b,d){if(b instanceof DocumentFragment){var c=
Array.prototype.slice.apply(b.childNodes);b=J.default.Node_insertBefore.call(this,b,d);if(g.isConnected(this))for(d=0;d<c.length;d++)a.connectTree(c[d]);return b}c=g.isConnected(b);d=J.default.Node_insertBefore.call(this,b,d);c&&a.disconnectTree(b);g.isConnected(this)&&a.connectTree(b);return d});g.setPropertyUnchecked(Node.prototype,"appendChild",function(b){if(b instanceof DocumentFragment){var d=Array.prototype.slice.apply(b.childNodes);b=J.default.Node_appendChild.call(this,b);if(g.isConnected(this))for(var c=
0;c<d.length;c++)a.connectTree(d[c]);return b}d=g.isConnected(b);c=J.default.Node_appendChild.call(this,b);d&&a.disconnectTree(b);g.isConnected(this)&&a.connectTree(b);return c});g.setPropertyUnchecked(Node.prototype,"cloneNode",function(b){b=J.default.Node_cloneNode.call(this,b);this.ownerDocument.__CE_hasRegistry?a.patchAndUpgradeTree(b):a.patchTree(b);return b});g.setPropertyUnchecked(Node.prototype,"removeChild",function(b){var d=g.isConnected(b),c=J.default.Node_removeChild.call(this,b);d&&a.disconnectTree(b);
return c});g.setPropertyUnchecked(Node.prototype,"replaceChild",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=J.default.Node_replaceChild.call(this,b,d);if(g.isConnected(this))for(a.disconnectTree(d),d=0;d<c.length;d++)a.connectTree(c[d]);return b}var c=g.isConnected(b),e=J.default.Node_replaceChild.call(this,b,d),f=g.isConnected(this);f&&a.disconnectTree(d);c&&a.disconnectTree(b);f&&a.connectTree(b);return e});J.default.Node_textContent&&J.default.Node_textContent.get?
b(Node.prototype,J.default.Node_textContent):a.addPatch(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)J.default.Node_removeChild.call(this,this.firstChild);J.default.Node_appendChild.call(this,document.createTextNode(a))}})})}};var aa={default:function(a,b,f){b.before=function(b){for(var c=[],e=0;e<arguments.length;++e)c[e-0]=arguments[e];e=c.filter(function(a){return a instanceof Node&&g.isConnected(a)});f.before.apply(this,c);for(var d=0;d<e.length;d++)a.disconnectTree(e[d]);if(g.isConnected(this))for(e=0;e<c.length;e++)d=c[e],d instanceof Element&&a.connectTree(d)};b.after=function(b){for(var c=[],e=0;e<arguments.length;++e)c[e-0]=arguments[e];e=c.filter(function(a){return a instanceof Node&&g.isConnected(a)});f.after.apply(this,
c);for(var d=0;d<e.length;d++)a.disconnectTree(e[d]);if(g.isConnected(this))for(e=0;e<c.length;e++)d=c[e],d instanceof Element&&a.connectTree(d)};b.replaceWith=function(b){for(var c=[],e=0;e<arguments.length;++e)c[e-0]=arguments[e];var e=c.filter(function(a){return a instanceof Node&&g.isConnected(a)}),d=g.isConnected(this);f.replaceWith.apply(this,c);for(var n=0;n<e.length;n++)a.disconnectTree(e[n]);if(d)for(a.disconnectTree(this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&a.connectTree(d)};
b.remove=function(){var b=g.isConnected(this);f.remove.call(this);b&&a.disconnectTree(this)}}};var ba={default:function(a){function b(b,e){Object.defineProperty(b,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(b){var c=this,d=void 0;g.isConnected(this)&&(d=[],g.walkDeepDescendantElements(this,function(a){a!==c&&d.push(a)}));e.set.call(this,b);if(d)for(var f=0;f<d.length;f++){var r=d[f];r.__CE_state===t.default.custom&&a.disconnectedCallback(r)}this.ownerDocument.__CE_hasRegistry?a.patchAndUpgradeTree(this):a.patchTree(this);return b}})}function f(b,d){g.setPropertyUnchecked(b,
"insertAdjacentElement",function(b,c){var e=g.isConnected(c);b=d.call(this,b,c);e&&a.disconnectTree(c);g.isConnected(b)&&a.connectTree(c);return b})}J.default.Element_attachShadow?g.setPropertyUnchecked(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=J.default.Element_attachShadow.call(this,a)}):console.warn("Custom Elements: `Element#attachShadow` was not patched.");if(J.default.Element_innerHTML&&J.default.Element_innerHTML.get)b(Element.prototype,J.default.Element_innerHTML);
else if(J.default.HTMLElement_innerHTML&&J.default.HTMLElement_innerHTML.get)b(HTMLElement.prototype,J.default.HTMLElement_innerHTML);else{var d=J.default.Document_createElement.call(document,"div");a.addPatch(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return J.default.Node_cloneNode.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?this.content:this;for(d.innerHTML=a;0<b.childNodes.length;)J.default.Node_removeChild.call(b,b.childNodes[0]);for(;0<d.childNodes.length;)J.default.Node_appendChild.call(b,
d.childNodes[0])}})})}g.setPropertyUnchecked(Element.prototype,"setAttribute",function(b,d){if(this.__CE_state!==t.default.custom)return J.default.Element_setAttribute.call(this,b,d);var c=J.default.Element_getAttribute.call(this,b);J.default.Element_setAttribute.call(this,b,d);d=J.default.Element_getAttribute.call(this,b);c!==d&&a.attributeChangedCallback(this,b,c,d,null)});g.setPropertyUnchecked(Element.prototype,"setAttributeNS",function(b,d,f){if(this.__CE_state!==t.default.custom)return J.default.Element_setAttributeNS.call(this,
b,d,f);var c=J.default.Element_getAttributeNS.call(this,b,d);J.default.Element_setAttributeNS.call(this,b,d,f);f=J.default.Element_getAttributeNS.call(this,b,d);c!==f&&a.attributeChangedCallback(this,d,c,f,b)});g.setPropertyUnchecked(Element.prototype,"removeAttribute",function(b){if(this.__CE_state!==t.default.custom)return J.default.Element_removeAttribute.call(this,b);var c=J.default.Element_getAttribute.call(this,b);J.default.Element_removeAttribute.call(this,b);null!==c&&a.attributeChangedCallback(this,
b,c,null,null)});g.setPropertyUnchecked(Element.prototype,"removeAttributeNS",function(b,d){if(this.__CE_state!==t.default.custom)return J.default.Element_removeAttributeNS.call(this,b,d);var c=J.default.Element_getAttributeNS.call(this,b,d);J.default.Element_removeAttributeNS.call(this,b,d);var e=J.default.Element_getAttributeNS.call(this,b,d);c!==e&&a.attributeChangedCallback(this,d,c,e,b)});J.default.HTMLElement_insertAdjacentElement?f(HTMLElement.prototype,J.default.HTMLElement_insertAdjacentElement):
J.default.Element_insertAdjacentElement?f(Element.prototype,J.default.Element_insertAdjacentElement):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");O.default(a,Element.prototype,{prepend:J.default.Element_prepend,append:J.default.Element_append});aa.default(a,Element.prototype,{before:J.default.Element_before,after:J.default.Element_after,replaceWith:J.default.Element_replaceWith,remove:J.default.Element_remove})}};var W=window.customElements;if(!W||W.forcePolyfill||"function"!=typeof W.define||"function"!=typeof W.get){var X=new w.default;N.default(X);U.default(X);V.default(X);ba.default(X);document.__CE_hasRegistry=!0;var ca=new G.default(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:ca})};/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){if(customElements&&customElements.polyfillWrapFlushCallback){var a=function(){if(b){var a=b;b=null;a();return!0}},b,f=HTMLImports.whenReady;customElements.polyfillWrapFlushCallback(function(d){b=d;f(a)});HTMLImports.whenReady=function(b){f(function(){a()?HTMLImports.whenReady(b):b()})}}HTMLImports.whenReady(function(){requestAnimationFrame(function(){window.dispatchEvent(new CustomEvent("WebComponentsReady"))})})})(window.WebComponents);var Y=document.createElement("style");Y.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var Z=document.querySelector("head");Z.insertBefore(Y,Z.firstChild);/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

}).call(self)

//# sourceMappingURL=webcomponents-hi-ce.js.map
