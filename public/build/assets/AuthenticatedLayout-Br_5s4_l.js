import{r as u,j as a,a as $}from"./app-DpBueJB1.js";import{q as W}from"./transition-G7j2GaqH.js";import{r as g}from"./index-Cmmr3BKV.js";import{c as k}from"./createLucideIcon-ChE6QTV6.js";const F=u.createContext(),O=({children:e})=>{const[t,s]=u.useState(!1),i=()=>{s(o=>!o)};return a.jsx(F.Provider,{value:{open:t,setOpen:s,toggleOpen:i},children:a.jsx("div",{className:"relative",children:e})})},Z=({children:e})=>{const{open:t,setOpen:s,toggleOpen:i}=u.useContext(F);return a.jsxs(a.Fragment,{children:[a.jsx("div",{onClick:i,children:e}),t&&a.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>s(!1)})]})},J=({align:e="right",width:t="48",contentClasses:s="py-1 bg-white dark:bg-gray-700",children:i})=>{const{open:o,setOpen:r}=u.useContext(F);let n="origin-top";e==="left"?n="ltr:origin-top-left rtl:origin-top-right start-0":e==="right"&&(n="ltr:origin-top-right rtl:origin-top-left end-0");let l="";return t==="48"&&(l="w-48"),a.jsx(a.Fragment,{children:a.jsx(W,{as:u.Fragment,show:o,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:a.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${n} ${l}`,onClick:()=>r(!1),children:a.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+s,children:i})})})})},U=({className:e="",children:t,...s})=>a.jsx($,{...s,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+e,children:t});O.Trigger=Z;O.Content=J;O.Link=U;const N=O;/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=k("AlignJustify",[["line",{x1:"3",x2:"21",y1:"6",y2:"6",key:"4m8b97"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12",key:"10d38w"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18",key:"kwyyxn"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=k("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=k("CircleGauge",[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7",key:"1e0p6d"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M13.4 10.6 19 5",key:"1kr7tw"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=k("DatabaseZap",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84",key:"14ibmq"}],["path",{d:"M21 5V8",key:"1marbg"}],["path",{d:"M21 12L18 17H22L19 22",key:"zafso"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87",key:"1y4wr8"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=k("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=k("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);let ee={data:""},te=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ee,se=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,re=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,v=(e,t)=>{let s="",i="",o="";for(let r in e){let n=e[r];r[0]=="@"?r[1]=="i"?s=r+" "+n+";":i+=r[1]=="f"?v(n,r):r+"{"+v(n,r[1]=="k"?"":t)+"}":typeof n=="object"?i+=v(n,t?t.replace(/([^,])+/g,l=>r.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=v.p?v.p(r,n):r+":"+n+";")}return s+(t&&o?t+"{"+o+"}":o)+i},y={},_=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+_(e[s]);return t}return e},ae=(e,t,s,i,o)=>{let r=_(e),n=y[r]||(y[r]=(c=>{let d=0,p=11;for(;d<c.length;)p=101*p+c.charCodeAt(d++)>>>0;return"go"+p})(r));if(!y[n]){let c=r!==e?e:(d=>{let p,h,f=[{}];for(;p=se.exec(d.replace(re,""));)p[4]?f.shift():p[3]?(h=p[3].replace(H," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][p[1]]=p[2].replace(H," ").trim();return f[0]})(e);y[n]=v(o?{["@keyframes "+n]:c}:c,s?"":"."+n)}let l=s&&y.g?y.g:null;return s&&(y.g=y[n]),((c,d,p,h)=>{h?d.data=d.data.replace(h,c):d.data.indexOf(c)===-1&&(d.data=p?c+d.data:d.data+c)})(y[n],t,i,l),n},ie=(e,t,s)=>e.reduce((i,o,r)=>{let n=t[r];if(n&&n.call){let l=n(s),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;n=c?"."+c:l&&typeof l=="object"?l.props?"":v(l,""):l===!1?"":l}return i+o+(n??"")},"");function A(e){let t=this||{},s=e.call?e(t.p):e;return ae(s.unshift?s.raw?ie(s,[].slice.call(arguments,1),t.p):s.reduce((i,o)=>Object.assign(i,o&&o.call?o(t.p):o),{}):s,te(t.target),t.g,t.o,t.k)}let G,P,S;A.bind({g:1});let b=A.bind({k:1});function oe(e,t,s,i){v.p=t,G=e,P=s,S=i}function j(e,t){let s=this||{};return function(){let i=arguments;function o(r,n){let l=Object.assign({},r),c=l.className||o.className;s.p=Object.assign({theme:P&&P()},l),s.o=/ *go\d+/.test(c),l.className=A.apply(s,i)+(c?" "+c:"");let d=e;return e[0]&&(d=l.as||e,delete l.as),S&&d[0]&&S(l),G(d,l)}return o}}var ne=e=>typeof e=="function",I=(e,t)=>ne(e)?e(t):e,le=(()=>{let e=0;return()=>(++e).toString()})(),R=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ce=20,L=new Map,de=1e3,q=e=>{if(L.has(e))return;let t=setTimeout(()=>{L.delete(e),w({type:4,toastId:e})},de);L.set(e,t)},ue=e=>{let t=L.get(e);t&&clearTimeout(t)},T=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,ce)};case 1:return t.toast.id&&ue(t.toast.id),{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return e.toasts.find(r=>r.id===s.id)?T(e,{type:1,toast:s}):T(e,{type:0,toast:s});case 3:let{toastId:i}=t;return i?q(i):e.toasts.forEach(r=>{q(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},z=[],D={toasts:[],pausedAt:void 0},w=e=>{D=T(D,e),z.forEach(t=>{t(D)})},pe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},me=(e={})=>{let[t,s]=u.useState(D);u.useEffect(()=>(z.push(s),()=>{let o=z.indexOf(s);o>-1&&z.splice(o,1)}),[t]);let i=t.toasts.map(o=>{var r,n;return{...e,...e[o.type],...o,duration:o.duration||((r=e[o.type])==null?void 0:r.duration)||(e==null?void 0:e.duration)||pe[o.type],style:{...e.style,...(n=e[o.type])==null?void 0:n.style,...o.style}}});return{...t,toasts:i}},fe=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||le()}),C=e=>(t,s)=>{let i=fe(t,e,s);return w({type:2,toast:i}),i.id},m=(e,t)=>C("blank")(e,t);m.error=C("error");m.success=C("success");m.loading=C("loading");m.custom=C("custom");m.dismiss=e=>{w({type:3,toastId:e})};m.remove=e=>w({type:4,toastId:e});m.promise=(e,t,s)=>{let i=m.loading(t.loading,{...s,...s==null?void 0:s.loading});return e.then(o=>(m.success(I(t.success,o),{id:i,...s,...s==null?void 0:s.success}),o)).catch(o=>{m.error(I(t.error,o),{id:i,...s,...s==null?void 0:s.error})}),e};var ge=(e,t)=>{w({type:1,toast:{id:e,height:t}})},he=()=>{w({type:5,time:Date.now()})},xe=e=>{let{toasts:t,pausedAt:s}=me(e);u.useEffect(()=>{if(s)return;let r=Date.now(),n=t.map(l=>{if(l.duration===1/0)return;let c=(l.duration||0)+l.pauseDuration-(r-l.createdAt);if(c<0){l.visible&&m.dismiss(l.id);return}return setTimeout(()=>m.dismiss(l.id),c)});return()=>{n.forEach(l=>l&&clearTimeout(l))}},[t,s]);let i=u.useCallback(()=>{s&&w({type:6,time:Date.now()})},[s]),o=u.useCallback((r,n)=>{let{reverseOrder:l=!1,gutter:c=8,defaultPosition:d}=n||{},p=t.filter(x=>(x.position||d)===(r.position||d)&&x.height),h=p.findIndex(x=>x.id===r.id),f=p.filter((x,M)=>M<h&&x.visible).length;return p.filter(x=>x.visible).slice(...l?[f+1]:[0,f]).reduce((x,M)=>x+(M.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:ge,startPause:he,endPause:i,calculateOffset:o}}},ye=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,be=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ve=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,je=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ye} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${be} 0.15s ease-out forwards;
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
    animation: ${ve} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,we=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ke=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${we} 1s linear infinite;
`,Ne=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,$e=b`
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
}`,Ce=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ne} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${$e} 0.2s ease-out forwards;
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
`,Ee=j("div")`
  position: absolute;
`,Le=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ze=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,De=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ze} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ie=({toast:e})=>{let{icon:t,type:s,iconTheme:i}=e;return t!==void 0?typeof t=="string"?u.createElement(De,null,t):t:s==="blank"?null:u.createElement(Le,null,u.createElement(ke,{...i}),s!=="loading"&&u.createElement(Ee,null,s==="error"?u.createElement(je,{...i}):u.createElement(Ce,{...i})))},Oe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ae=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Me="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",Se=j("div")`
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
`,Te=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Fe=(e,t)=>{let s=e.includes("top")?1:-1,[i,o]=R()?[Me,Pe]:[Oe(s),Ae(s)];return{animation:t?`${b(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},He=u.memo(({toast:e,position:t,style:s,children:i})=>{let o=e.height?Fe(e.position||t||"top-center",e.visible):{opacity:0},r=u.createElement(Ie,{toast:e}),n=u.createElement(Te,{...e.ariaProps},I(e.message,e));return u.createElement(Se,{className:e.className,style:{...o,...s,...e.style}},typeof i=="function"?i({icon:r,message:n}):u.createElement(u.Fragment,null,r,n))});oe(u.createElement);var qe=({id:e,className:t,style:s,onHeightUpdate:i,children:o})=>{let r=u.useCallback(n=>{if(n){let l=()=>{let c=n.getBoundingClientRect().height;i(e,c)};l(),new MutationObserver(l).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return u.createElement("div",{ref:r,className:t,style:s},o)},_e=(e,t)=>{let s=e.includes("top"),i=s?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:R()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...i,...o}},Ge=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,Re=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:i,children:o,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:c}=xe(s);return u.createElement("div",{style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...r},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(d=>{let p=d.position||t,h=c.calculateOffset(d,{reverseOrder:e,gutter:i,defaultPosition:t}),f=_e(p,h);return u.createElement(qe,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?Ge:"",style:f},d.type==="custom"?I(d.message,d):o?o(d):u.createElement(He,{toast:d,position:p}))}))},Ve=m;function Qe({user:e,header:t,children:s}){const i=route().current(),[o,r]=u.useState(!1),n=()=>{r(!o)};return a.jsxs("div",{className:"admin-layout",children:[a.jsx("div",{className:"header w-full py-4 bg-white border-b-2 sticky top-0",children:a.jsxs("div",{className:"full flex items-center justify-between px-6",children:[a.jsx("div",{className:"left",children:a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx("div",{className:"ham flex items-center",children:a.jsx("button",{onClick:n,children:a.jsx(V,{size:24,color:"gray",strokeWidth:1.5})})}),a.jsx(g.Typography,{variant:"h5",color:"blue-gray",className:"text-center",children:"Wave Portal"})]})}),a.jsx("div",{className:"right",children:a.jsxs(N,{children:[a.jsx(N.Trigger,{children:a.jsx("span",{className:"inline-flex rounded-md",children:a.jsxs("button",{type:"button",className:"flex items-center gap-2 text-gray-600 font-semibold",children:[e.name,a.jsx(Q,{})]})})}),a.jsxs(N.Content,{children:[a.jsx(N.Link,{href:route("profile.edit"),children:"Profile"}),a.jsx(N.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})})]})}),a.jsxs("div",{className:"page-content",children:[a.jsx("aside",{className:`fixed w-full max-w-[15rem] transition-all ease-in-out duration-300 z-50 ${o?"left-0":"-left-full"}`,children:a.jsx(g.Card,{className:"h-screen bg-gradient-to-tr from-gray-900 to-gray-800 rounded-none",children:a.jsxs(g.List,{className:"text-white",children:[a.jsx($,{href:"/dashboard",className:`${i==="dashboard"?"bg-blue-gray-50/50 rounded-lg":""}`,children:a.jsxs(g.ListItem,{children:[a.jsx(g.ListItemPrefix,{className:"mr-3",children:a.jsx(Y,{size:20})}),a.jsx("span",{className:"font-semibold text-sm",children:"Dashboard"})]})}),a.jsx($,{href:route("wireless.sites.index"),className:`${i==="wireless.sites.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:a.jsxs(g.ListItem,{children:[a.jsx(g.ListItemPrefix,{className:"mr-3",children:a.jsx(X,{size:20})}),a.jsx("span",{className:"font-semibold text-base",children:"WNTD"})]})}),a.jsx($,{href:route("sql.import"),className:`${i==="sql.import"?"bg-blue-gray-50/50 rounded-lg":""}`,children:a.jsxs(g.ListItem,{children:[a.jsx(g.ListItemPrefix,{className:"mr-3",children:a.jsx(B,{size:20})}),a.jsx("span",{className:"font-semibold text-sm",children:"SQL Import"})]})}),a.jsx($,{href:route("settings.index"),className:`${i==="settings.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:a.jsxs(g.ListItem,{children:[a.jsx(g.ListItemPrefix,{className:"mr-3",children:a.jsx(K,{size:20})}),a.jsx("span",{className:"font-semibold text-sm",children:"Settings"})]})})]})})}),a.jsx("main",{className:"main-content lg:w-full lg:max-w-[calc(100%)]",children:s})]}),a.jsx(Re,{})]})}export{Qe as A,Q as C,Ve as _};
