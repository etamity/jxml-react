/*! For license information please see remoteEntry.js.LICENSE.txt */
var sampleapp;(()=>{"use strict";var e,r,t,n,o,u,a,i,l,f,c,s,p,d,h,y,v={347:e=>{var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,u){for(var a,i,l=o(e),f=1;f<arguments.length;f++){for(var c in a=Object(arguments[f]))t.call(a,c)&&(l[c]=a[c]);if(r){i=r(a);for(var s=0;s<i.length;s++)n.call(a,i[s])&&(l[i[s]]=a[i[s]])}}return l}},751:(e,r,t)=>{var n=t(347),o=60103,u=60106;r.Fragment=60107,r.StrictMode=60108,r.Profiler=60114;var a=60109,i=60110,l=60112;r.Suspense=60113;var f=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;o=s("react.element"),u=s("react.portal"),r.Fragment=s("react.fragment"),r.StrictMode=s("react.strict_mode"),r.Profiler=s("react.profiler"),a=s("react.provider"),i=s("react.context"),l=s("react.forward_ref"),r.Suspense=s("react.suspense"),f=s("react.memo"),c=s("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function v(e,r,t){this.props=e,this.context=r,this.refs=y,this.updater=t||h}function m(){}function g(e,r,t){this.props=e,this.context=r,this.refs=y,this.updater=t||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,r,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},m.prototype=v.prototype;var b=g.prototype=new m;b.constructor=g,n(b,v.prototype),b.isPureReactComponent=!0;var w={current:null},_=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function j(e,r,t){var n,u={},a=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(a=""+r.key),r)_.call(r,n)&&!S.hasOwnProperty(n)&&(u[n]=r[n]);var l=arguments.length-2;if(1===l)u.children=t;else if(1<l){for(var f=Array(l),c=0;c<l;c++)f[c]=arguments[c+2];u.children=f}if(e&&e.defaultProps)for(n in l=e.defaultProps)void 0===u[n]&&(u[n]=l[n]);return{$$typeof:o,type:e,key:a,ref:i,props:u,_owner:w.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var E=/\/+/g;function C(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function O(e,r,t,n,a){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var l=!1;if(null===e)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case o:case u:l=!0}}if(l)return a=a(l=e),e=""===n?"."+C(l,0):n,Array.isArray(a)?(t="",null!=e&&(t=e.replace(E,"$&/")+"/"),O(a,r,t,"",(function(e){return e}))):null!=a&&(k(a)&&(a=function(e,r){return{$$typeof:o,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(a,t+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(E,"$&/")+"/")+e)),r.push(a)),1;if(l=0,n=""===n?".":n+":",Array.isArray(e))for(var f=0;f<e.length;f++){var c=n+C(i=e[f],f);l+=O(i,r,t,c,a)}else if("function"==typeof(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e)))for(e=c.call(e),f=0;!(i=e.next()).done;)l+=O(i=i.value,r,t,c=n+C(i,f++),a);else if("object"===i)throw r=""+e,Error(d(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return l}function $(e,r,t){if(null==e)return e;var n=[],o=0;return O(e,n,"","",(function(e){return r.call(t,e,o++)})),n}function P(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var x={current:null};function R(){var e=x.current;if(null===e)throw Error(d(321));return e}var A={ReactCurrentDispatcher:x,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:w,IsSomeRendererActing:{current:!1},assign:n};r.Children={map:$,forEach:function(e,r,t){$(e,(function(){r.apply(this,arguments)}),t)},count:function(e){var r=0;return $(e,(function(){r++})),r},toArray:function(e){return $(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error(d(143));return e}},r.Component=v,r.PureComponent=g,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A,r.cloneElement=function(e,r,t){if(null==e)throw Error(d(267,e));var u=n({},e.props),a=e.key,i=e.ref,l=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,l=w.current),void 0!==r.key&&(a=""+r.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(c in r)_.call(r,c)&&!S.hasOwnProperty(c)&&(u[c]=void 0===r[c]&&void 0!==f?f[c]:r[c])}var c=arguments.length-2;if(1===c)u.children=t;else if(1<c){f=Array(c);for(var s=0;s<c;s++)f[s]=arguments[s+2];u.children=f}return{$$typeof:o,type:e.type,key:a,ref:i,props:u,_owner:l}},r.createContext=function(e,r){return void 0===r&&(r=null),(e={$$typeof:i,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},r.createElement=j,r.createFactory=function(e){var r=j.bind(null,e);return r.type=e,r},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:l,render:e}},r.isValidElement=k,r.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:P}},r.memo=function(e,r){return{$$typeof:f,type:e,compare:void 0===r?null:r}},r.useCallback=function(e,r){return R().useCallback(e,r)},r.useContext=function(e,r){return R().useContext(e,r)},r.useDebugValue=function(){},r.useEffect=function(e,r){return R().useEffect(e,r)},r.useImperativeHandle=function(e,r,t){return R().useImperativeHandle(e,r,t)},r.useLayoutEffect=function(e,r){return R().useLayoutEffect(e,r)},r.useMemo=function(e,r){return R().useMemo(e,r)},r.useReducer=function(e,r,t){return R().useReducer(e,r,t)},r.useRef=function(e){return R().useRef(e)},r.useState=function(e){return R().useState(e)},r.version="17.0.2"},466:(e,r,t)=>{e.exports=t(751)},713:(e,r,t)=>{var n={"./default":()=>Promise.all([t.e(942),t.e(956)]).then((()=>()=>t(956)))},o=(e,r)=>(t.R=r,r=t.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,r),u=(e,r)=>{if(t.S){var n=t.S.default,o="default";if(n&&n!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[o]=e,t.I(o,r)}};t.d(r,{get:()=>o,init:()=>u})}},m={};function g(e){var r=m[e];if(void 0!==r)return r.exports;var t=m[e]={exports:{}};return v[e](t,t.exports,g),t.exports}g.m=v,g.c=m,g.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return g.d(r,{a:r}),r},g.d=(e,r)=>{for(var t in r)g.o(r,t)&&!g.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},g.f={},g.e=e=>Promise.all(Object.keys(g.f).reduce(((r,t)=>(g.f[t](e,r),r)),[])),g.u=e=>e+".js",g.miniCssF=e=>e+".css",g.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),g.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="jxml-react:",g.l=(t,n,o,u)=>{if(e[t])e[t].push(n);else{var a,i;if(void 0!==o)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var c=l[f];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")==r+o){a=c;break}}a||(i=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,g.nc&&a.setAttribute("nonce",g.nc),a.setAttribute("data-webpack",r+o),a.src=t),e[t]=[n];var s=(r,n)=>{a.onerror=a.onload=null,clearTimeout(p);var o=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(n))),r)return r(n)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=s.bind(null,a.onerror),a.onload=s.bind(null,a.onload),i&&document.head.appendChild(a)}},g.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{g.S={};var e={},r={};g.I=(t,n)=>{n||(n=[]);var o,u,a,i=r[t];if(i||(i=r[t]={}),!(n.indexOf(i)>=0)){if(n.push(i),e[t])return e[t];g.o(g.S,t)||(g.S[t]={});var l=g.S[t],f="jxml-react",c=[];switch(t){case"default":o="17.0.2",u=l.react=l.react||{},(!(a=u[o])||!a.loaded&&(0!=!a.eager||f>a.from))&&(u[o]={get:()=>()=>g(466),from:f,eager:!0})}return e[t]=c.length?Promise.all(c).then((()=>e[t]=1)):1}}})(),(()=>{var e;g.g.importScripts&&(e=g.g.location+"");var r=g.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),g.p=e})(),t=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=t[1]?r(t[1]):[];return t[2]&&(n.length++,n.push.apply(n,r(t[2]))),t[3]&&(n.push([]),n.push.apply(n,r(t[3]))),n},n=(e,r)=>{e=t(e),r=t(r);for(var n=0;;){if(n>=e.length)return n<r.length&&"u"!=(typeof r[n])[0];var o=e[n],u=(typeof o)[0];if(n>=r.length)return"u"==u;var a=r[n],i=(typeof a)[0];if(u!=i)return"o"==u&&"n"==i||"s"==i||"u"==u;if("o"!=u&&"u"!=u&&o!=a)return o<a;n++}},o=e=>{var r=e[0],t="";if(1===e.length)return"*";if(r+.5){t+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var n=1,u=1;u<e.length;u++)n--,t+="u"==(typeof(i=e[u]))[0]?"-":(n>0?".":"")+(n=2,i);return t}var a=[];for(u=1;u<e.length;u++){var i=e[u];a.push(0===i?"not("+l()+")":1===i?"("+l()+" || "+l()+")":2===i?a.pop()+" "+a.pop():o(i))}return l();function l(){return a.pop().replace(/^\((.+)\)$/,"$1")}},u=(e,r)=>{if(0 in e){r=t(r);var n=e[0],o=n<0;o&&(n=-n-1);for(var a=0,i=1,l=!0;;i++,a++){var f,c,s=i<e.length?(typeof e[i])[0]:"";if(a>=r.length||"o"==(c=(typeof(f=r[a]))[0]))return!l||("u"==s?i>n&&!o:""==s!=o);if("u"==c){if(!l||"u"!=s)return!1}else if(l)if(s==c)if(i<=n){if(f!=e[i])return!1}else{if(o?f>e[i]:f<e[i])return!1;f!=e[i]&&(l=!1)}else if("s"!=s&&"n"!=s){if(o||i<=n)return!1;l=!1,i--}else{if(i<=n||c<s!=o)return!1;l=!1}else"s"!=s&&"n"!=s&&(l=!1,i--)}}var p=[],d=p.pop.bind(p);for(a=1;a<e.length;a++){var h=e[a];p.push(1==h?d()|d():2==h?d()&d():h?u(h,r):!d())}return!!d()},a=(e,r)=>{var t=e[r];return Object.keys(t).reduce(((e,r)=>!e||!t[e].loaded&&n(e,r)?r:e),0)},i=(e,r,t)=>"Unsatisfied version "+r+" of shared singleton module "+e+" (required "+o(t)+")",l=(e,r,t,n)=>{var o=a(e,t);return u(n,o)||"undefined"!=typeof console&&console.warn&&console.warn(i(t,o,n)),f(e[t][o])},f=e=>(e.loaded=1,e.get()),c=(e=>function(r,t,n,o){var u=g.I(r);return u&&u.then?u.then(e.bind(e,r,g.S[r],t,n,o)):e(0,g.S[r],t,n,o)})(((e,r,t,n,o)=>r&&g.o(r,t)?l(r,0,t,n):o())),s={},p={985:()=>c("default","react",[1,17,0,2],(()=>()=>g(466)))},d={956:[985]},g.f.consumes=(e,r)=>{g.o(d,e)&&d[e].forEach((e=>{if(g.o(s,e))return r.push(s[e]);var t=r=>{s[e]=0,g.m[e]=t=>{delete g.c[e],t.exports=r()}},n=r=>{delete s[e],g.m[e]=t=>{throw delete g.c[e],r}};try{var o=p[e]();o.then?r.push(s[e]=o.then(t).catch(n)):t(o)}catch(e){n(e)}}))},h=e=>new Promise(((r,t)=>{var n=g.miniCssF(e),o=g.p+n;if(((e,r)=>{for(var t=document.getElementsByTagName("link"),n=0;n<t.length;n++){var o=(a=t[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===r))return a}var u=document.getElementsByTagName("style");for(n=0;n<u.length;n++){var a;if((o=(a=u[n]).getAttribute("data-href"))===e||o===r)return a}})(n,o))return r();((e,r,t,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=u=>{if(o.onerror=o.onload=null,"load"===u.type)t();else{var a=u&&("load"===u.type?"missing":u.type),i=u&&u.target&&u.target.href||r,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=i,o.parentNode.removeChild(o),n(l)}},o.href=r,document.head.appendChild(o)})(e,o,r,t)})),y={8:0},g.f.miniCss=(e,r)=>{y[e]?r.push(y[e]):0!==y[e]&&{956:1}[e]&&r.push(y[e]=h(e).then((()=>{y[e]=0}),(r=>{throw delete y[e],r})))},(()=>{var e={8:0};g.f.j=(r,t)=>{var n=g.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(((t,o)=>n=e[r]=[t,o]));t.push(n[2]=o);var u=g.p+g.u(r),a=new Error;g.l(u,(t=>{if(g.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var o=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;a.message="Loading chunk "+r+" failed.\n("+o+": "+u+")",a.name="ChunkLoadError",a.type=o,a.request=u,n[1](a)}}),"chunk-"+r,r)}};var r=(r,t)=>{var n,o,[u,a,i]=t,l=0;for(n in a)g.o(a,n)&&(g.m[n]=a[n]);for(i&&i(g),r&&r(t);l<u.length;l++)o=u[l],g.o(e,o)&&e[o]&&e[o][0](),e[u[l]]=0},t=self.webpackChunkjxml_react=self.webpackChunkjxml_react||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var b=g(713);sampleapp=b})();