!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("app")):"function"==typeof define&&define.amd?define(["app"],t):"object"==typeof exports?exports.inventoryApp=t(require("app")):e.inventoryApp=t(e.app)}(window,function(n){return function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(4),i=n(5),u=n(6),a=n(7),c=n(8);var s=function(e){return function(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")}(this,void 0),r.createElement(o.Switch,null,r.createElement(o.Route,{exact:!0,path:"".concat(e.match.path,"/"),component:c.Dashboard}),r.createElement(o.Redirect,{to:"".concat(e.match.path,"/")}))}.bind(void 0),p=Object(o.withRouter)(Object(a.default)()(s));u.default.registerApplication({name:"inventoryApp",icon:i.faShoppingBag,rootComponent:p,menuEntry:"Inventory App"})},function(e,t,n){e.exports=n(3)("../../node_modules/react/index.js")},function(e,t){e.exports=n},function(e,t,n){e.exports=n(3)("../../node_modules/react-router-dom/es/index.js")},function(e,t,n){e.exports=n(3)("../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js")},function(e,t,n){e.exports=n(3)("./services/applicationManager.ts")},function(e,t,n){e.exports=n(3)("./flux/connect.ts")},function(e,t,n){"use strict";n.r(t),n.d(t,"Dashboard",function(){return a});n(9),n(10);var r=n(2),o=n(11);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")}var i=function(i,u,a,c){return new(a||(a=Promise))(function(e,t){function n(e){try{o(c.next(e))}catch(e){t(e)}}function r(e){try{o(c.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new a(function(e){e(t.value)}).then(n,r)}o((c=c.apply(i,u||[])).next())})},h="".concat(window.location.origin,"/database/sdnevents/inventoryequipment/_search"),u=function(c,s,p,f,d){return m(this,void 0),i(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t,n,r,o,i,u,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=s&&null!=c&&!isNaN(+c)?+c*s:null,n=d&&Object.keys(d)||[],r=Object.assign({},0<n.length?{query:{bool:{must:n.reduce(function(e,t){return m(this,a),e&&d&&d[t]&&e.push(l({},-1<d[t].indexOf("*")||-1<d[t].indexOf("?")?"wildcard":"prefix",l({},t,d[t]))),e}.bind(this),[])}}}:{query:{match_all:{}}},s?{size:s}:{},t?{from:t}:{},p&&f?{sort:[l({},p,f)]}:{}),e.next=5,fetch(h,{method:"POST",mode:"no-cors",cache:"no-cache",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(r)});case 5:if((o=e.sent).ok)return e.next=11,o.json();e.next=15;break;case 11:return i=e.sent,u={page:Math.min(c||0,i.hits.total||0/(s||1)),rowCount:i.hits.total,rows:i&&i.hits&&i.hits.hits&&i.hits.hits.map(function(e){return m(this,a),Object.assign({},e._source,{_id:e._id})}.bind(this))||[]},e.abrupt("return",u);case 15:return e.abrupt("return",{page:0,rowCount:0,rows:[]});case 16:case"end":return e.stop()}},e,this)}))}.bind(void 0),a=function(e){return m(this,void 0),r.createElement("div",null,r.createElement(o.MaterialTable,{columns:[{property:"mountpoint",title:"Mountpoint",numeric:!1},{property:"uuid",title:"Name",numeric:!1},{property:"parentUuid",title:"Parent",numeric:!1},{property:"manufacturerIdentifier",title:"Manufacturer",numeric:!1},{property:"serial",title:"Serial",numeric:!1},{property:"typeName",title:"Type",numeric:!1},{property:"description",title:"Description",numeric:!1}],title:"Inventory",idProperty:"_id",rows:[],onRequestData:u}))}.bind(void 0);t.default=a},function(e,t,n){e.exports=n(3)("../../node_modules/core-js/modules/web.dom.iterable.js")},function(e,t,n){e.exports=n(3)("../../node_modules/regenerator-runtime/runtime.js")},function(e,t,n){e.exports=n(3)("./components/material-table/index.tsx")}])});