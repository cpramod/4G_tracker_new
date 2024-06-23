import{r as d,j as r,a as j,q as U}from"./app-BdOlReHc.js";import{q as Z}from"./transition-Di5Gmdpv.js";import{r as u}from"./index-D-Ll7bUc.js";const T=d.createContext(),O=({children:e})=>{const[t,s]=d.useState(!1),o=()=>{s(i=>!i)};return r.jsx(T.Provider,{value:{open:t,setOpen:s,toggleOpen:o},children:r.jsx("div",{className:"relative",children:e})})},V=({children:e})=>{const{open:t,setOpen:s,toggleOpen:o}=d.useContext(T);return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:o,children:e}),t&&r.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>s(!1)})]})},B=({align:e="right",width:t="48",contentClasses:s="py-1 bg-white dark:bg-gray-700",children:o})=>{const{open:i,setOpen:a}=d.useContext(T);let l="origin-top";e==="left"?l="ltr:origin-top-left rtl:origin-top-right start-0":e==="right"&&(l="ltr:origin-top-right rtl:origin-top-left end-0");let n="";return t==="48"&&(n="w-48"),r.jsx(r.Fragment,{children:r.jsx(Z,{as:d.Fragment,show:i,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:r.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${l} ${n}`,onClick:()=>a(!1),children:r.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+s,children:o})})})})},J=({className:e="",children:t,...s})=>r.jsx(j,{...s,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+e,children:t});O.Trigger=V;O.Content=B;O.Link=J;const C=O;/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),R=(...e)=>e.filter((t,s,o)=>!!t&&o.indexOf(t)===s).join(" ");/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=d.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:i="",children:a,iconNode:l,...n},c)=>d.createElement("svg",{ref:c,...Y,width:t,height:t,stroke:e,strokeWidth:o?Number(s)*24/Number(t):s,className:R("lucide",i),...n},[...l.map(([m,p])=>d.createElement(m,p)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const s=d.forwardRef(({className:o,...i},a)=>d.createElement(K,{ref:a,iconNode:t,className:R(`lucide-${Q(e)}`,o),...i}));return s.displayName=`${e}`,s};/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=v("AlignJustify",[["line",{x1:"3",x2:"21",y1:"6",y2:"6",key:"4m8b97"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12",key:"10d38w"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18",key:"kwyyxn"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=v("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=v("CircleGauge",[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7",key:"1e0p6d"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M13.4 10.6 19 5",key:"1kr7tw"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=v("DatabaseZap",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84",key:"14ibmq"}],["path",{d:"M21 5V8",key:"1marbg"}],["path",{d:"M21 12L18 17H22L19 22",key:"zafso"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87",key:"1y4wr8"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=v("FileCog",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2",key:"17k7jt"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"6",cy:"14",r:"3",key:"a1xfv6"}],["path",{d:"M6 10v1",key:"xs0f9j"}],["path",{d:"M6 17v1",key:"idyhc0"}],["path",{d:"M10 14H9",key:"m5fm2q"}],["path",{d:"M3 14H2",key:"19ot09"}],["path",{d:"m9 11-.88.88",key:"lhul2b"}],["path",{d:"M3.88 16.12 3 17",key:"169z9n"}],["path",{d:"m9 17-.88-.88",key:"5io96w"}],["path",{d:"M3.88 11.88 3 11",key:"1ynhy1"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=v("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=v("Nfc",[["path",{d:"M6 8.32a7.43 7.43 0 0 1 0 7.36",key:"9iaqei"}],["path",{d:"M9.46 6.21a11.76 11.76 0 0 1 0 11.58",key:"1yha7l"}],["path",{d:"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8",key:"4iu2gk"}],["path",{d:"M16.37 2a20.16 20.16 0 0 1 0 20",key:"sap9u2"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=v("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=v("UserRoundCog",[["path",{d:"M2 21a8 8 0 0 1 10.434-7.62",key:"1yezr2"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["path",{d:"m19.5 14.3-.4.9",key:"1eb35c"}],["path",{d:"m16.9 20.8-.4.9",key:"dfjc4z"}],["path",{d:"m21.7 19.5-.9-.4",key:"q4dx6b"}],["path",{d:"m15.2 16.9-.9-.4",key:"1r0w5f"}],["path",{d:"m21.7 16.5-.9.4",key:"1knoei"}],["path",{d:"m15.2 19.1-.9.4",key:"j188fs"}],["path",{d:"m19.5 21.7-.4-.9",key:"1tonu5"}],["path",{d:"m16.9 15.2-.4-.9",key:"699xu"}]]);let le={data:""},ce=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||le,de=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,me=/\/\*[^]*?\*\/|  +/g,q=/\n+/g,k=(e,t)=>{let s="",o="",i="";for(let a in e){let l=e[a];a[0]=="@"?a[1]=="i"?s=a+" "+l+";":o+=a[1]=="f"?k(l,a):a+"{"+k(l,a[1]=="k"?"":t)+"}":typeof l=="object"?o+=k(l,t?t.replace(/([^,])+/g,n=>a.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):a):l!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=k.p?k.p(a,l):a+":"+l+";")}return s+(t&&i?t+"{"+i+"}":i)+o},y={},G=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+G(e[s]);return t}return e},pe=(e,t,s,o,i)=>{let a=G(e),l=y[a]||(y[a]=(c=>{let m=0,p=11;for(;m<c.length;)p=101*p+c.charCodeAt(m++)>>>0;return"go"+p})(a));if(!y[l]){let c=a!==e?e:(m=>{let p,g,f=[{}];for(;p=de.exec(m.replace(me,""));)p[4]?f.shift():p[3]?(g=p[3].replace(q," ").trim(),f.unshift(f[0][g]=f[0][g]||{})):f[0][p[1]]=p[2].replace(q," ").trim();return f[0]})(e);y[l]=k(i?{["@keyframes "+l]:c}:c,s?"":"."+l)}let n=s&&y.g?y.g:null;return s&&(y.g=y[l]),((c,m,p,g)=>{g?m.data=m.data.replace(g,c):m.data.indexOf(c)===-1&&(m.data=p?c+m.data:m.data+c)})(y[l],t,o,n),l},ue=(e,t,s)=>e.reduce((o,i,a)=>{let l=t[a];if(l&&l.call){let n=l(s),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;l=c?"."+c:n&&typeof n=="object"?n.props?"":k(n,""):n===!1?"":n}return o+i+(l??"")},"");function A(e){let t=this||{},s=e.call?e(t.p):e;return pe(s.unshift?s.raw?ue(s,[].slice.call(arguments,1),t.p):s.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):s,ce(t.target),t.g,t.o,t.k)}let W,P,F;A.bind({g:1});let b=A.bind({k:1});function he(e,t,s,o){k.p=t,W=e,P=s,F=o}function w(e,t){let s=this||{};return function(){let o=arguments;function i(a,l){let n=Object.assign({},a),c=n.className||i.className;s.p=Object.assign({theme:P&&P()},n),s.o=/ *go\d+/.test(c),n.className=A.apply(s,o)+(c?" "+c:"");let m=e;return e[0]&&(m=n.as||e,delete n.as),F&&m[0]&&F(n),W(m,n)}return i}}var fe=e=>typeof e=="function",z=(e,t)=>fe(e)?e(t):e,ge=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),xe=20,E=new Map,ye=1e3,H=e=>{if(E.has(e))return;let t=setTimeout(()=>{E.delete(e),N({type:4,toastId:e})},ye);E.set(e,t)},be=e=>{let t=E.get(e);t&&clearTimeout(t)},S=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,xe)};case 1:return t.toast.id&&be(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return e.toasts.find(a=>a.id===s.id)?S(e,{type:1,toast:s}):S(e,{type:0,toast:s});case 3:let{toastId:o}=t;return o?H(o):e.toasts.forEach(a=>{H(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+i}))}}},L=[],I={toasts:[],pausedAt:void 0},N=e=>{I=S(I,e),L.forEach(t=>{t(I)})},ve={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},je=(e={})=>{let[t,s]=d.useState(I);d.useEffect(()=>(L.push(s),()=>{let i=L.indexOf(s);i>-1&&L.splice(i,1)}),[t]);let o=t.toasts.map(i=>{var a,l;return{...e,...e[i.type],...i,duration:i.duration||((a=e[i.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||ve[i.type],style:{...e.style,...(l=e[i.type])==null?void 0:l.style,...i.style}}});return{...t,toasts:o}},ke=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||ge()}),$=e=>(t,s)=>{let o=ke(t,e,s);return N({type:2,toast:o}),o.id},h=(e,t)=>$("blank")(e,t);h.error=$("error");h.success=$("success");h.loading=$("loading");h.custom=$("custom");h.dismiss=e=>{N({type:3,toastId:e})};h.remove=e=>N({type:4,toastId:e});h.promise=(e,t,s)=>{let o=h.loading(t.loading,{...s,...s==null?void 0:s.loading});return e.then(i=>(h.success(z(t.success,i),{id:o,...s,...s==null?void 0:s.success}),i)).catch(i=>{h.error(z(t.error,i),{id:o,...s,...s==null?void 0:s.error})}),e};var we=(e,t)=>{N({type:1,toast:{id:e,height:t}})},Ne=()=>{N({type:5,time:Date.now()})},Ce=e=>{let{toasts:t,pausedAt:s}=je(e);d.useEffect(()=>{if(s)return;let a=Date.now(),l=t.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(a-n.createdAt);if(c<0){n.visible&&h.dismiss(n.id);return}return setTimeout(()=>h.dismiss(n.id),c)});return()=>{l.forEach(n=>n&&clearTimeout(n))}},[t,s]);let o=d.useCallback(()=>{s&&N({type:6,time:Date.now()})},[s]),i=d.useCallback((a,l)=>{let{reverseOrder:n=!1,gutter:c=8,defaultPosition:m}=l||{},p=t.filter(x=>(x.position||m)===(a.position||m)&&x.height),g=p.findIndex(x=>x.id===a.id),f=p.filter((x,D)=>D<g&&x.visible).length;return p.filter(x=>x.visible).slice(...n?[f+1]:[0,f]).reduce((x,D)=>x+(D.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:we,startPause:Ne,endPause:o,calculateOffset:i}}},$e=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Me=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Le=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Me} 0.15s ease-out forwards;
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
`,Ie=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ze=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ie} 1s linear infinite;
`,Oe=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ae=b`
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
}`,De=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ae} 0.2s ease-out forwards;
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
`,Pe=w("div")`
  position: absolute;
`,Fe=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Se=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Te=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Se} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,qe=({toast:e})=>{let{icon:t,type:s,iconTheme:o}=e;return t!==void 0?typeof t=="string"?d.createElement(Te,null,t):t:s==="blank"?null:d.createElement(Fe,null,d.createElement(ze,{...o}),s!=="loading"&&d.createElement(Pe,null,s==="error"?d.createElement(Le,{...o}):d.createElement(De,{...o})))},He=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Re=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ge="0%{opacity:0;} 100%{opacity:1;}",We="0%{opacity:1;} 100%{opacity:0;}",_e=w("div")`
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
`,Ue=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ze=(e,t)=>{let s=e.includes("top")?1:-1,[o,i]=_()?[Ge,We]:[He(s),Re(s)];return{animation:t?`${b(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ve=d.memo(({toast:e,position:t,style:s,children:o})=>{let i=e.height?Ze(e.position||t||"top-center",e.visible):{opacity:0},a=d.createElement(qe,{toast:e}),l=d.createElement(Ue,{...e.ariaProps},z(e.message,e));return d.createElement(_e,{className:e.className,style:{...i,...s,...e.style}},typeof o=="function"?o({icon:a,message:l}):d.createElement(d.Fragment,null,a,l))});he(d.createElement);var Be=({id:e,className:t,style:s,onHeightUpdate:o,children:i})=>{let a=d.useCallback(l=>{if(l){let n=()=>{let c=l.getBoundingClientRect().height;o(e,c)};n(),new MutationObserver(n).observe(l,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return d.createElement("div",{ref:a,className:t,style:s},i)},Je=(e,t)=>{let s=e.includes("top"),o=s?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...o,...i}},Qe=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,Ye=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:o,children:i,containerStyle:a,containerClassName:l})=>{let{toasts:n,handlers:c}=Ce(s);return d.createElement("div",{style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...a},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},n.map(m=>{let p=m.position||t,g=c.calculateOffset(m,{reverseOrder:e,gutter:o,defaultPosition:t}),f=Je(p,g);return d.createElement(Be,{id:m.id,key:m.id,onHeightUpdate:c.updateHeight,className:m.visible?Qe:"",style:f},m.type==="custom"?z(m.message,m):i?i(m):d.createElement(Ve,{toast:m,position:p}))}))},tt=h;function st({user:e,header:t,children:s}){var c;const{role:o}=(c=U().props)==null?void 0:c.auth,i=route().current(),[a,l]=d.useState(!1),n=()=>{l(!a)};return r.jsxs("div",{className:"admin-layout",children:[r.jsx("div",{className:"header w-full py-4 bg-white border-b-2 sticky top-0 z-50",children:r.jsxs("div",{className:"full flex items-center justify-between px-6",children:[r.jsx("div",{className:"left",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("div",{className:"ham flex items-center",children:r.jsx("button",{onClick:n,children:r.jsx(X,{size:24,color:"gray",strokeWidth:1.5})})}),r.jsx(u.Typography,{variant:"h5",color:"blue-gray",className:"text-center",children:"FWP Tracker"})]})}),r.jsx("div",{className:"right",children:r.jsxs(C,{children:[r.jsx(C.Trigger,{children:r.jsx("span",{className:"inline-flex rounded-md",children:r.jsxs("button",{type:"button",className:"flex items-center gap-2 text-gray-600 font-semibold",children:[e.name,r.jsx(ee,{})]})})}),r.jsxs(C.Content,{children:[r.jsx(C.Link,{href:route("profile.edit"),children:"Profile"}),r.jsx(C.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})})]})}),r.jsxs("div",{className:"page-content",children:[r.jsx("aside",{className:`fixed w-full max-w-[15rem] transition-all ease-in-out duration-300 z-50 ${a?"left-0":"-left-full"}`,children:r.jsx(u.Card,{className:"h-screen bg-gradient-to-tr from-gray-900 to-gray-800 rounded-none",children:r.jsxs(u.List,{className:"text-white",children:[r.jsx(j,{href:"/dashboard",className:`${i==="dashboard"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(te,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Dashboard"})]})}),r.jsx(j,{href:route("wireless.sites.index"),className:`${i==="wireless.sites.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ae,{size:20})}),r.jsx("span",{className:"font-semibold text-base",children:"WNTD"})]})}),r.jsx(j,{href:route("site.field.name.index"),className:`${i==="site.field.name.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ie,{size:20})}),r.jsx("span",{className:"font-semibold text-base",children:"FW Site"})]})}),o==="super-admin"&&r.jsxs(r.Fragment,{children:[r.jsx(j,{href:route("sql.import"),className:`${i==="sql.import"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(se,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"SQL Import"})]})}),r.jsx(j,{href:route("mo.file.generator"),className:`${i==="mo.file.generator"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(re,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"MO File Generator"})]})}),r.jsx(j,{href:route("roles.index"),className:`${i==="roles.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(ne,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Roles Management"})]})}),r.jsx(j,{href:route("settings.index"),className:`${i==="settings.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:r.jsxs(u.ListItem,{children:[r.jsx(u.ListItemPrefix,{className:"mr-3",children:r.jsx(oe,{size:20})}),r.jsx("span",{className:"font-semibold text-sm",children:"Settings"})]})})]})]})})}),r.jsx("main",{className:"main-content lg:w-full lg:max-w-[calc(100%)]",children:s})]}),r.jsx(Ye,{position:"top-right"})]})}export{st as A,ee as C,tt as _,v as c};
