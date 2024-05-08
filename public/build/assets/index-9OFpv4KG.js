import{r as l,R as lr}from"./app-3pJHEf12.js";import{_ as S,a as T,b as ze,c as Me,P as f}from"./index-Y7xV2V3x.js";var fr=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function H(e,r){var n=pr(e);if(typeof n.path!="string"){var t=e.webkitRelativePath;Object.defineProperty(n,"path",{value:typeof r=="string"?r:typeof t=="string"&&t.length>0?t:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}function pr(e){var r=e.name,n=r&&r.lastIndexOf(".")!==-1;if(n&&!e.type){var t=r.split(".").pop().toLowerCase(),i=fr.get(t);i&&Object.defineProperty(e,"type",{value:i,writable:!1,configurable:!1,enumerable:!0})}return e}var dr=[".DS_Store","Thumbs.db"];function gr(e){return S(this,void 0,void 0,function(){return T(this,function(r){return V(e)&&mr(e.dataTransfer)?[2,hr(e.dataTransfer,e.type)]:vr(e)?[2,yr(e)]:Array.isArray(e)&&e.every(function(n){return"getFile"in n&&typeof n.getFile=="function"})?[2,br(e)]:[2,[]]})})}function mr(e){return V(e)}function vr(e){return V(e)&&V(e.target)}function V(e){return typeof e=="object"&&e!==null}function yr(e){return ge(e.target.files).map(function(r){return H(r)})}function br(e){return S(this,void 0,void 0,function(){var r;return T(this,function(n){switch(n.label){case 0:return[4,Promise.all(e.map(function(t){return t.getFile()}))];case 1:return r=n.sent(),[2,r.map(function(t){return H(t)})]}})})}function hr(e,r){return S(this,void 0,void 0,function(){var n,t;return T(this,function(i){switch(i.label){case 0:return e.items?(n=ge(e.items).filter(function(u){return u.kind==="file"}),r!=="drop"?[2,n]:[4,Promise.all(n.map(Dr))]):[3,2];case 1:return t=i.sent(),[2,Le(qe(t))];case 2:return[2,Le(ge(e.files).map(function(u){return H(u)}))]}})})}function Le(e){return e.filter(function(r){return dr.indexOf(r.name)===-1})}function ge(e){if(e===null)return[];for(var r=[],n=0;n<e.length;n++){var t=e[n];r.push(t)}return r}function Dr(e){if(typeof e.webkitGetAsEntry!="function")return Ke(e);var r=e.webkitGetAsEntry();return r&&r.isDirectory?Je(r):Ke(e)}function qe(e){return e.reduce(function(r,n){return ze(ze([],Me(r),!1),Me(Array.isArray(n)?qe(n):[n]),!1)},[])}function Ke(e){var r=e.getAsFile();if(!r)return Promise.reject("".concat(e," is not a File"));var n=H(r);return Promise.resolve(n)}function Ar(e){return S(this,void 0,void 0,function(){return T(this,function(r){return[2,e.isDirectory?Je(e):wr(e)]})})}function Je(e){var r=e.createReader();return new Promise(function(n,t){var i=[];function u(){var s=this;r.readEntries(function(c){return S(s,void 0,void 0,function(){var m,w,E;return T(this,function(h){switch(h.label){case 0:if(c.length)return[3,5];h.label=1;case 1:return h.trys.push([1,3,,4]),[4,Promise.all(i)];case 2:return m=h.sent(),n(m),[3,4];case 3:return w=h.sent(),t(w),[3,4];case 4:return[3,6];case 5:E=Promise.all(c.map(Ar)),i.push(E),u(),h.label=6;case 6:return[2]}})})},function(c){t(c)})}u()})}function wr(e){return S(this,void 0,void 0,function(){return T(this,function(r){return[2,new Promise(function(n,t){e.file(function(i){var u=H(i,e.fullPath);n(u)},function(i){t(i)})})]})})}var Er=function(e,r){if(e&&r){var n=Array.isArray(r)?r:r.split(","),t=e.name||"",i=(e.type||"").toLowerCase(),u=i.replace(/\/.*$/,"");return n.some(function(s){var c=s.trim().toLowerCase();return c.charAt(0)==="."?t.toLowerCase().endsWith(c):c.endsWith("/*")?u===c.replace(/\/.*$/,""):i===c})}return!0};function $e(e){return xr(e)||Fr(e)||Qe(e)||Or()}function Or(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Fr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xr(e){if(Array.isArray(e))return me(e)}function He(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,t)}return n}function We(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?He(Object(n),!0).forEach(function(t){Ve(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):He(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Ve(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function $(e,r){return Pr(e)||jr(e,r)||Qe(e,r)||_r()}function _r(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qe(e,r){if(e){if(typeof e=="string")return me(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return me(e,r)}}function me(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function jr(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var t=[],i=!0,u=!1,s,c;try{for(n=n.call(e);!(i=(s=n.next()).done)&&(t.push(s.value),!(r&&t.length===r));i=!0);}catch(m){u=!0,c=m}finally{try{!i&&n.return!=null&&n.return()}finally{if(u)throw c}}return t}}function Pr(e){if(Array.isArray(e))return e}var Cr="file-invalid-type",Sr="file-too-large",Tr="file-too-small",Ir="too-many-files",Rr=function(r){r=Array.isArray(r)&&r.length===1?r[0]:r;var n=Array.isArray(r)?"one of ".concat(r.join(", ")):r;return{code:Cr,message:"File type must be ".concat(n)}},Be=function(r){return{code:Sr,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},Ne=function(r){return{code:Tr,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},kr={code:Ir,message:"Too many files"};function Xe(e,r){var n=e.type==="application/x-moz-file"||Er(e,r);return[n,n?null:Rr(r)]}function Ze(e,r,n){if(x(e.size))if(x(r)&&x(n)){if(e.size>n)return[!1,Be(n)];if(e.size<r)return[!1,Ne(r)]}else{if(x(r)&&e.size<r)return[!1,Ne(r)];if(x(n)&&e.size>n)return[!1,Be(n)]}return[!0,null]}function x(e){return e!=null}function zr(e){var r=e.files,n=e.accept,t=e.minSize,i=e.maxSize,u=e.multiple,s=e.maxFiles,c=e.validator;return!u&&r.length>1||u&&s>=1&&r.length>s?!1:r.every(function(m){var w=Xe(m,n),E=$(w,1),h=E[0],I=Ze(m,t,i),R=$(I,1),k=R[0],z=c?c(m):null;return h&&k&&!z})}function Q(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function J(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function Ue(e){e.preventDefault()}function Mr(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function Lr(e){return e.indexOf("Edge/")!==-1}function Kr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return Mr(e)||Lr(e)}function A(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return function(t){for(var i=arguments.length,u=new Array(i>1?i-1:0),s=1;s<i;s++)u[s-1]=arguments[s];return r.some(function(c){return!Q(t)&&c&&c.apply(void 0,[t].concat(u)),Q(t)})}}function $r(){return"showOpenFilePicker"in window}function Hr(e){if(x(e)){var r=Object.entries(e).filter(function(n){var t=$(n,2),i=t[0],u=t[1],s=!0;return er(i)||(console.warn('Skipped "'.concat(i,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),s=!1),(!Array.isArray(u)||!u.every(rr))&&(console.warn('Skipped "'.concat(i,'" because an invalid file extension was provided.')),s=!1),s}).reduce(function(n,t){var i=$(t,2),u=i[0],s=i[1];return We(We({},n),{},Ve({},u,s))},{});return[{description:"Files",accept:r}]}return e}function Wr(e){if(x(e))return Object.entries(e).reduce(function(r,n){var t=$(n,2),i=t[0],u=t[1];return[].concat($e(r),[i],$e(u))},[]).filter(function(r){return er(r)||rr(r)}).join(",")}function Br(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function Nr(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function er(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function rr(e){return/^.*\.[\w]+$/.test(e)}var Ur=["children"],Yr=["open"],Gr=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],qr=["refKey","onChange","onClick"];function Jr(e){return Xr(e)||Qr(e)||nr(e)||Vr()}function Vr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Xr(e){if(Array.isArray(e))return ve(e)}function de(e,r){return rn(e)||en(e,r)||nr(e,r)||Zr()}function Zr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function nr(e,r){if(e){if(typeof e=="string")return ve(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ve(e,r)}}function ve(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function en(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var t=[],i=!0,u=!1,s,c;try{for(n=n.call(e);!(i=(s=n.next()).done)&&(t.push(s.value),!(r&&t.length===r));i=!0);}catch(m){u=!0,c=m}finally{try{!i&&n.return!=null&&n.return()}finally{if(u)throw c}}return t}}function rn(e){if(Array.isArray(e))return e}function Ye(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,t)}return n}function p(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?Ye(Object(n),!0).forEach(function(t){ye(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ye(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ye(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function X(e,r){if(e==null)return{};var n=nn(e,r),t,i;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(i=0;i<u.length;i++)t=u[i],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}function nn(e,r){if(e==null)return{};var n={},t=Object.keys(e),i,u;for(u=0;u<t.length;u++)i=t[u],!(r.indexOf(i)>=0)&&(n[i]=e[i]);return n}var he=l.forwardRef(function(e,r){var n=e.children,t=X(e,Ur),i=tn(t),u=i.open,s=X(i,Yr);return l.useImperativeHandle(r,function(){return{open:u}},[u]),lr.createElement(l.Fragment,null,n(p(p({},s),{},{open:u})))});he.displayName="Dropzone";var tr={disabled:!1,getFilesFromEvent:gr,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};he.defaultProps=tr;he.propTypes={children:f.func,accept:f.objectOf(f.arrayOf(f.string)),multiple:f.bool,preventDropOnDocument:f.bool,noClick:f.bool,noKeyboard:f.bool,noDrag:f.bool,noDragEventsBubbling:f.bool,minSize:f.number,maxSize:f.number,maxFiles:f.number,disabled:f.bool,getFilesFromEvent:f.func,onFileDialogCancel:f.func,onFileDialogOpen:f.func,useFsAccessApi:f.bool,autoFocus:f.bool,onDragEnter:f.func,onDragLeave:f.func,onDragOver:f.func,onDrop:f.func,onDropAccepted:f.func,onDropRejected:f.func,onError:f.func,validator:f.func};var be={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function tn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=p(p({},tr),e),n=r.accept,t=r.disabled,i=r.getFilesFromEvent,u=r.maxSize,s=r.minSize,c=r.multiple,m=r.maxFiles,w=r.onDragEnter,E=r.onDragLeave,h=r.onDragOver,I=r.onDrop,R=r.onDropAccepted,k=r.onDropRejected,z=r.onFileDialogCancel,Z=r.onFileDialogOpen,De=r.useFsAccessApi,Ae=r.autoFocus,ee=r.preventDropOnDocument,we=r.noClick,re=r.noKeyboard,Ee=r.noDrag,O=r.noDragEventsBubbling,ne=r.onError,M=r.validator,L=l.useMemo(function(){return Wr(n)},[n]),Oe=l.useMemo(function(){return Hr(n)},[n]),te=l.useMemo(function(){return typeof Z=="function"?Z:Ge},[Z]),W=l.useMemo(function(){return typeof z=="function"?z:Ge},[z]),v=l.useRef(null),D=l.useRef(null),or=l.useReducer(on,be),Fe=de(or,2),oe=Fe[0],y=Fe[1],ir=oe.isFocused,xe=oe.isFileDialogActive,B=l.useRef(typeof window<"u"&&window.isSecureContext&&De&&$r()),_e=function(){!B.current&&xe&&setTimeout(function(){if(D.current){var a=D.current.files;a.length||(y({type:"closeDialog"}),W())}},300)};l.useEffect(function(){return window.addEventListener("focus",_e,!1),function(){window.removeEventListener("focus",_e,!1)}},[D,xe,W,B]);var _=l.useRef([]),je=function(a){v.current&&v.current.contains(a.target)||(a.preventDefault(),_.current=[])};l.useEffect(function(){return ee&&(document.addEventListener("dragover",Ue,!1),document.addEventListener("drop",je,!1)),function(){ee&&(document.removeEventListener("dragover",Ue),document.removeEventListener("drop",je))}},[v,ee]),l.useEffect(function(){return!t&&Ae&&v.current&&v.current.focus(),function(){}},[v,Ae,t]);var F=l.useCallback(function(o){ne?ne(o):console.error(o)},[ne]),Pe=l.useCallback(function(o){o.preventDefault(),o.persist(),G(o),_.current=[].concat(Jr(_.current),[o.target]),J(o)&&Promise.resolve(i(o)).then(function(a){if(!(Q(o)&&!O)){var d=a.length,g=d>0&&zr({files:a,accept:L,minSize:s,maxSize:u,multiple:c,maxFiles:m,validator:M}),b=d>0&&!g;y({isDragAccept:g,isDragReject:b,isDragActive:!0,type:"setDraggedFiles"}),w&&w(o)}}).catch(function(a){return F(a)})},[i,w,F,O,L,s,u,c,m,M]),Ce=l.useCallback(function(o){o.preventDefault(),o.persist(),G(o);var a=J(o);if(a&&o.dataTransfer)try{o.dataTransfer.dropEffect="copy"}catch{}return a&&h&&h(o),!1},[h,O]),Se=l.useCallback(function(o){o.preventDefault(),o.persist(),G(o);var a=_.current.filter(function(g){return v.current&&v.current.contains(g)}),d=a.indexOf(o.target);d!==-1&&a.splice(d,1),_.current=a,!(a.length>0)&&(y({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),J(o)&&E&&E(o))},[v,E,O]),N=l.useCallback(function(o,a){var d=[],g=[];o.forEach(function(b){var K=Xe(b,L),C=de(K,2),ae=C[0],ue=C[1],ce=Ze(b,s,u),q=de(ce,2),se=q[0],le=q[1],fe=M?M(b):null;if(ae&&se&&!fe)d.push(b);else{var pe=[ue,le];fe&&(pe=pe.concat(fe)),g.push({file:b,errors:pe.filter(function(sr){return sr})})}}),(!c&&d.length>1||c&&m>=1&&d.length>m)&&(d.forEach(function(b){g.push({file:b,errors:[kr]})}),d.splice(0)),y({acceptedFiles:d,fileRejections:g,type:"setFiles"}),I&&I(d,g,a),g.length>0&&k&&k(g,a),d.length>0&&R&&R(d,a)},[y,c,L,s,u,m,I,R,k,M]),U=l.useCallback(function(o){o.preventDefault(),o.persist(),G(o),_.current=[],J(o)&&Promise.resolve(i(o)).then(function(a){Q(o)&&!O||N(a,o)}).catch(function(a){return F(a)}),y({type:"reset"})},[i,N,F,O]),j=l.useCallback(function(){if(B.current){y({type:"openDialog"}),te();var o={multiple:c,types:Oe};window.showOpenFilePicker(o).then(function(a){return i(a)}).then(function(a){N(a,null),y({type:"closeDialog"})}).catch(function(a){Br(a)?(W(a),y({type:"closeDialog"})):Nr(a)?(B.current=!1,D.current?(D.current.value=null,D.current.click()):F(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):F(a)});return}D.current&&(y({type:"openDialog"}),te(),D.current.value=null,D.current.click())},[y,te,W,De,N,F,Oe,c]),Te=l.useCallback(function(o){!v.current||!v.current.isEqualNode(o.target)||(o.key===" "||o.key==="Enter"||o.keyCode===32||o.keyCode===13)&&(o.preventDefault(),j())},[v,j]),Ie=l.useCallback(function(){y({type:"focus"})},[]),Re=l.useCallback(function(){y({type:"blur"})},[]),ke=l.useCallback(function(){we||(Kr()?setTimeout(j,0):j())},[we,j]),P=function(a){return t?null:a},ie=function(a){return re?null:P(a)},Y=function(a){return Ee?null:P(a)},G=function(a){O&&a.stopPropagation()},ar=l.useMemo(function(){return function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=o.refKey,d=a===void 0?"ref":a,g=o.role,b=o.onKeyDown,K=o.onFocus,C=o.onBlur,ae=o.onClick,ue=o.onDragEnter,ce=o.onDragOver,q=o.onDragLeave,se=o.onDrop,le=X(o,Gr);return p(p(ye({onKeyDown:ie(A(b,Te)),onFocus:ie(A(K,Ie)),onBlur:ie(A(C,Re)),onClick:P(A(ae,ke)),onDragEnter:Y(A(ue,Pe)),onDragOver:Y(A(ce,Ce)),onDragLeave:Y(A(q,Se)),onDrop:Y(A(se,U)),role:typeof g=="string"&&g!==""?g:"presentation"},d,v),!t&&!re?{tabIndex:0}:{}),le)}},[v,Te,Ie,Re,ke,Pe,Ce,Se,U,re,Ee,t]),ur=l.useCallback(function(o){o.stopPropagation()},[]),cr=l.useMemo(function(){return function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=o.refKey,d=a===void 0?"ref":a,g=o.onChange,b=o.onClick,K=X(o,qr),C=ye({accept:L,multiple:c,type:"file",style:{display:"none"},onChange:P(A(g,U)),onClick:P(A(b,ur)),tabIndex:-1},d,D);return p(p({},C),K)}},[D,n,c,U,t]);return p(p({},oe),{},{isFocused:ir&&!t,getRootProps:ar,getInputProps:cr,rootRef:v,inputRef:D,open:P(j)})}function on(e,r){switch(r.type){case"focus":return p(p({},e),{},{isFocused:!0});case"blur":return p(p({},e),{},{isFocused:!1});case"openDialog":return p(p({},be),{},{isFileDialogActive:!0});case"closeDialog":return p(p({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return p(p({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return p(p({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections});case"reset":return p({},be);default:return e}}function Ge(){}export{tn as u};
