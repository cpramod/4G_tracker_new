import{r as m,j as r,a as y,q,R as U}from"./app-MJI2P0uu.js";import{q as Z}from"./transition-MKz1PCtb.js";import{r as u}from"./index-Dia_wP9H.js";const S=m.createContext(),O=({children:e})=>{const[t,s]=m.useState(!1),o=()=>{s(i=>!i)};return r.jsx(S.Provider,{value:{open:t,setOpen:s,toggleOpen:o},children:r.jsx("div",{className:"relative",children:e})})},B=({children:e})=>{const{open:t,setOpen:s,toggleOpen:o}=m.useContext(S);return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:o,children:e}),t&&r.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>s(!1)})]})},J=({align:e="right",width:t="48",contentClasses:s="py-1 bg-white dark:bg-gray-700",children:o})=>{const{open:i,setOpen:a}=m.useContext(S);let l="origin-top";e==="left"?l="ltr:origin-top-left rtl:origin-top-right start-0":e==="right"&&(l="ltr:origin-top-right rtl:origin-top-left end-0");let n="";return t==="48"&&(n="w-48"),r.jsx(r.Fragment,{children:r.jsx(Z,{as:m.Fragment,show:i,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:r.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${l} ${n}`,onClick:()=>a(!1),children:r.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+s,children:o})})})})},Q=({className:e="",children:t,...s})=>r.jsx(y,{...s,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+e,children:t});O.Trigger=B;O.Content=J;O.Link=Q;const C=O;/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),G=(...e)=>e.filter((t,s,o)=>!!t&&o.indexOf(t)===s).join(" ");/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var K={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=m.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:i="",children:a,iconNode:l,...n},c)=>m.createElement("svg",{ref:c,...K,width:t,height:t,stroke:e,strokeWidth:o?Number(s)*24/Number(t):s,className:G("lucide",i),...n},[...l.map(([d,p])=>m.createElement(d,p)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(e,t)=>{const s=m.forwardRef(({className:o,...i},a)=>m.createElement(X,{ref:a,iconNode:t,className:G(`lucide-${Y(e)}`,o),...i}));return s.displayName=`${e}`,s};/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=b("AlignJustify",[["line",{x1:"3",x2:"21",y1:"6",y2:"6",key:"4m8b97"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12",key:"10d38w"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18",key:"kwyyxn"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=b("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=b("CircleGauge",[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7",key:"1e0p6d"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M13.4 10.6 19 5",key:"1kr7tw"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=b("DatabaseZap",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84",key:"14ibmq"}],["path",{d:"M21 5V8",key:"1marbg"}],["path",{d:"M21 12L18 17H22L19 22",key:"zafso"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87",key:"1y4wr8"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=b("FileCog",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2",key:"17k7jt"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"6",cy:"14",r:"3",key:"a1xfv6"}],["path",{d:"M6 10v1",key:"xs0f9j"}],["path",{d:"M6 17v1",key:"idyhc0"}],["path",{d:"M10 14H9",key:"m5fm2q"}],["path",{d:"M3 14H2",key:"19ot09"}],["path",{d:"m9 11-.88.88",key:"lhul2b"}],["path",{d:"M3.88 16.12 3 17",key:"169z9n"}],["path",{d:"m9 17-.88-.88",key:"5io96w"}],["path",{d:"M3.88 11.88 3 11",key:"1ynhy1"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=b("GitCommitVertical",[["path",{d:"M12 3v6",key:"1holv5"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M12 15v6",key:"a9ows0"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=b("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=b("Nfc",[["path",{d:"M6 8.32a7.43 7.43 0 0 1 0 7.36",key:"9iaqei"}],["path",{d:"M9.46 6.21a11.76 11.76 0 0 1 0 11.58",key:"1yha7l"}],["path",{d:"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8",key:"4iu2gk"}],["path",{d:"M16.37 2a20.16 20.16 0 0 1 0 20",key:"sap9u2"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=b("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=b("UserRoundCog",[["path",{d:"M2 21a8 8 0 0 1 10.434-7.62",key:"1yezr2"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"m19.5 14.3-.4.9",key:"1eb35c"}],["path",{d:"m16.9 20.8-.4.9",key:"dfjc4z"}],["path",{d:"m21.7 19.5-.9-.4",key:"q4dx6b"}],["path",{d:"m15.2 16.9-.9-.4",key:"1r0w5f"}],["path",{d:"m21.7 16.5-.9.4",key:"1knoei"}],["path",{d:"m15.2 19.1-.9.4",key:"j188fs"}],["path",{d:"m19.5 21.7-.4-.9",key:"1tonu5"}],["path",{d:"m16.9 15.2-.4-.9",key:"699xu"}]]);let de={data:""},me=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||de,pe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ue=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,k=(e,t)=>{let s="",o="",i="";for(let a in e){let l=e[a];a[0]=="@"?a[1]=="i"?s=a+" "+l+";":o+=a[1]=="f"?k(l,a):a+"{"+k(l,a[1]=="k"?"":t)+"}":typeof l=="object"?o+=k(l,t?t.replace(/([^,])+/g,n=>a.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):a):l!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=k.p?k.p(a,l):a+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+o},v={},V=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+V(e[s]);return t}return e},he=(e,t,s,o,i)=>{let a=V(e),l=v[a]||(v[a]=(c=>{let d=0,p=11;for(;d<c.length;)p=101*p+c.charCodeAt(d++)>>>0;return"go"+p})(a));if(!v[l]){let c=a!==e?e:(d=>{let p,f,x=[{}];for(;p=pe.exec(d.replace(ue,""));)p[4]?x.shift():p[3]?(f=p[3].replace(H," ").trim(),x.unshift(x[0][f]=x[0][f]||{})):x[0][p[1]]=p[2].replace(H," ").trim();return x[0]})(e);v[l]=k(i?{["@keyframes "+l]:c}:c,s?"":"."+l)}let n=s&&v.g?v.g:null;return s&&(v.g=v[l]),((c,d,p,f)=>{f?d.data=d.data.replace(f,c):d.data.indexOf(c)===-1&&(d.data=p?c+d.data:d.data+c)})(v[l],t,o,n),l},xe=(e,t,s)=>e.reduce((o,i,a)=>{let l=t[a];if(l&&l.call){let n=l(s),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;l=c?"."+c:n&&typeof n=="object"?n.props?"":k(n,""):n===!1?"":n}return o+i+(l??"")},"");function A(e){let t=this||{},s=e.call?e(t.p):e;return he(s.unshift?s.raw?xe(s,[].slice.call(arguments,1),t.p):s.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):s,me(t.target),t.g,t.o,t.k)}let W,P,F;A.bind({g:1});let j=A.bind({k:1});function fe(e,t,s,o){k.p=t,W=e,P=s,F=o}function w(e,t){let s=this||{};return function(){let o=arguments;function i(a,l){let n=Object.assign({},a),c=n.className||i.className;s.p=Object.assign({theme:P&&P()},n),s.o=/ *go\d+/.test(c),n.className=A.apply(s,o)+(c?" "+c:"");let d=e;return e[0]&&(d=n.as||e,delete n.as),F&&d[0]&&F(n),W(d,n)}return i}}var ge=e=>typeof e=="function",I=(e,t)=>ge(e)?e(t):e,ye=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),be=20,z=new Map,ve=1e3,R=e=>{if(z.has(e))return;let t=setTimeout(()=>{z.delete(e),N({type:4,toastId:e})},ve);z.set(e,t)},je=e=>{let t=z.get(e);t&&clearTimeout(t)},T=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,be)};case 1:return t.toast.id&&je(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return e.toasts.find(a=>a.id===s.id)?T(e,{type:1,toast:s}):T(e,{type:0,toast:s});case 3:let{toastId:o}=t;return o?R(o):e.toasts.forEach(a=>{R(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+i}))}}},L=[],E={toasts:[],pausedAt:void 0},N=e=>{E=T(E,e),L.forEach(t=>{t(E)})},ke={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},we=(e={})=>{let[t,s]=m.useState(E);m.useEffect(()=>(L.push(s),()=>{let i=L.indexOf(s);i>-1&&L.splice(i,1)}),[t]);let o=t.toasts.map(i=>{var a,l;return{...e,...e[i.type],...i,duration:i.duration||((a=e[i.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||ke[i.type],style:{...e.style,...(l=e[i.type])==null?void 0:l.style,...i.style}}});return{...t,toasts:o}},Ne=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||ye()}),$=e=>(t,s)=>{let o=Ne(t,e,s);return N({type:2,toast:o}),o.id},h=(e,t)=>$("blank")(e,t);h.error=$("error");h.success=$("success");h.loading=$("loading");h.custom=$("custom");h.dismiss=e=>{N({type:3,toastId:e})};h.remove=e=>N({type:4,toastId:e});h.promise=(e,t,s)=>{let o=h.loading(t.loading,{...s,...s==null?void 0:s.loading});return e.then(i=>(h.success(I(t.success,i),{id:o,...s,...s==null?void 0:s.success}),i)).catch(i=>{h.error(I(t.error,i),{id:o,...s,...s==null?void 0:s.error})}),e};var Ce=(e,t)=>{N({type:1,toast:{id:e,height:t}})},$e=()=>{N({type:5,time:Date.now()})},Me=e=>{let{toasts:t,pausedAt:s}=we(e);m.useEffect(()=>{if(s)return;let a=Date.now(),l=t.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(a-n.createdAt);if(c<0){n.visible&&h.dismiss(n.id);return}return setTimeout(()=>h.dismiss(n.id),c)});return()=>{l.forEach(n=>n&&clearTimeout(n))}},[t,s]);let o=m.useCallback(()=>{s&&N({type:6,time:Date.now()})},[s]),i=m.useCallback((a,l)=>{let{reverseOrder:n=!1,gutter:c=8,defaultPosition:d}=l||{},p=t.filter(g=>(g.position||d)===(a.position||d)&&g.height),f=p.findIndex(g=>g.id===a.id),x=p.filter((g,D)=>D<f&&g.visible).length;return p.filter(g=>g.visible).slice(...n?[x+1]:[0,x]).reduce((g,D)=>g+(D.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:Ce,startPause:$e,endPause:o,calculateOffset:i}}},ze=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Le=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ie=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ze} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Le} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Oe=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ae=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Oe} 1s linear infinite;
`,De=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Pe=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Fe=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${De} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Pe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Te=w("div")`
  position: absolute;
`,Se=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,qe=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,He=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${qe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Re=({toast:e})=>{let{icon:t,type:s,iconTheme:o}=e;return t!==void 0?typeof t=="string"?m.createElement(He,null,t):t:s==="blank"?null:m.createElement(Se,null,m.createElement(Ae,{...o}),s!=="loading"&&m.createElement(Te,null,s==="error"?m.createElement(Ie,{...o}):m.createElement(Fe,{...o})))},Ge=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ve=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,We="0%{opacity:0;} 100%{opacity:1;}",_e="0%{opacity:1;} 100%{opacity:0;}",Ue=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ze=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Be=(e,t)=>{let s=e.includes("top")?1:-1,[o,i]=_()?[We,_e]:[Ge(s),Ve(s)];return{animation:t?`${j(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Je=m.memo(({toast:e,position:t,style:s,children:o})=>{let i=e.height?Be(e.position||t||"top-center",e.visible):{opacity:0},a=m.createElement(Re,{toast:e}),l=m.createElement(Ze,{...e.ariaProps},I(e.message,e));return m.createElement(Ue,{className:e.className,style:{...i,...s,...e.style}},typeof o=="function"?o({icon:a,message:l}):m.createElement(m.Fragment,null,a,l))});fe(m.createElement);var Qe=({id:e,className:t,style:s,onHeightUpdate:o,children:i})=>{let a=m.useCallback(l=>{if(l){let n=()=>{let c=l.getBoundingClientRect().height;o(e,c)};n(),new MutationObserver(n).observe(l,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return m.createElement("div",{ref:a,className:t,style:s},i)},Ye=(e,t)=>{let s=e.includes("top"),o=s?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...o,...i}},Ke=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,Xe=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:o,children:i,containerStyle:a,containerClassName:l})=>{let{toasts:n,handlers:c}=Me(s);return m.createElement("div",{style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...a},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},n.map(d=>{let p=d.position||t,f=c.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}),x=Ye(p,f);return m.createElement(Qe,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?Ke:"",style:x},d.type==="custom"?I(d.message,d):i?i(d):m.createElement(Je,{toast:d,position:p}))}))},rt=h;function at({user:e,children:t}){var c;const{role:s}=(c=q().props)==null?void 0:c.auth,{entities:o}=q().props,i=route().current(),[a,l]=m.useState(!1),n=()=>{l(!a)};return r.jsxs("div",{className:"admin-layout",children:[r.jsx("div",{className:"header w-full py-4 bg-white border-b-2 sticky top-0 z-50",children:r.jsxs("div",{className:"full flex items-center justify-between px-6",children:[r.jsx("div",{className:"left",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("div",{className:"ham flex items-center",children:r.jsx("button",{onClick:n,children:r.jsx(ee,{size:24,color:"gray",strokeWidth:1.5})})}),r.jsx(u.Typography,{variant:"h5",color:"blue-gray",className:"text-center",children:"FWP Tracker"})]})}),r.jsx("div",{className:"right",children:r.jsxs("div",{className:"flex items-center gap-4",children:[i!=="table.wizard.index"&&r.jsx(y,{href:route("table.wizard.index"),children:r.jsx(u.Button,{variant:"gradient",size:"sm",className:"capitalize rounded-md",children:"Create Table"})}),r.jsxs(C,{children:[r.jsx(C.Trigger,{children:r.jsx("span",{className:"inline-flex rounded-md",children:r.jsxs("button",{type:"button",className:"flex items-center gap-2 text-gray-600 font-semibold",children:[e.name,r.jsx(te,{})]})})}),r.jsxs(C.Content,{children:[r.jsx(C.Link,{href:route("profile.edit"),children:"Profile"}),r.jsx(C.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})]})})]})}),r.jsxs("div",{className:"page-content",children:[r.jsx("aside",{className:`fixed w-full max-w-[15rem] transition-all ease-in-out duration-300 z-50 ${a?"left-0":"-left-full"}`,children:r.jsx(u.Card,{className:"h-screen bg-gradient-to-tr from-gray-900 to-gray-800 rounded-none",children:r.jsxs(u.List,{className:"text-white",children:[r.jsx(y,{href:"/dashboard",className:`${i==="dashboard"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(se,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Dashboard"})]})}),r.jsx(y,{href:route("wireless.sites.index"),className:`${i==="wireless.sites.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(oe,{size:20})}),r.jsx("span",{className:"font-semibold text-base",children:"WNTD"})]})}),r.jsx(y,{href:route("site.field.name.index"),className:`${i==="site.field.name.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ne,{size:20})}),r.jsx("span",{className:"font-semibold text-base",children:"FW Site"})]})}),(o==null?void 0:o.length)>0&&(o==null?void 0:o.map((d,p)=>r.jsx(U.Fragment,{children:r.jsx(y,{href:route("view.table.item",d==null?void 0:d.slug),children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ie,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:d==null?void 0:d.title})]})})},p))),s==="super-admin"&&r.jsxs(r.Fragment,{children:[r.jsx(y,{href:route("sql.import"),className:`${i==="sql.import"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(re,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"SQL Import"})]})}),r.jsx(y,{href:route("mo.file.generator"),className:`${i==="mo.file.generator"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ae,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"MO File Generator"})]})}),r.jsx(y,{href:route("roles.index"),className:`${i==="roles.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ce,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Roles Management"})]})}),r.jsx(y,{href:route("settings.index"),className:`${i==="settings.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(le,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Settings"})]})})]})]})})}),r.jsx("main",{className:"main-content lg:w-full lg:max-w-[calc(100%)]",children:t})]}),r.jsx(Xe,{position:"top-right"})]})}export{at as A,te as C,rt as _,b as c};
