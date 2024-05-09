import{r as u,j as o,a as E}from"./app-Du5Kxnmg.js";import{q as R}from"./transition-DkIqk9Gn.js";import{r as h}from"./index-CF0bnYyq.js";import{c as N}from"./createLucideIcon-CvHx1CO9.js";const M=u.createContext(),z=({children:e})=>{const[t,r]=u.useState(!1),a=()=>{r(i=>!i)};return o.jsx(M.Provider,{value:{open:t,setOpen:r,toggleOpen:a},children:o.jsx("div",{className:"relative",children:e})})},J=({children:e})=>{const{open:t,setOpen:r,toggleOpen:a}=u.useContext(M);return o.jsxs(o.Fragment,{children:[o.jsx("div",{onClick:a,children:e}),t&&o.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>r(!1)})]})},U=({align:e="right",width:t="48",contentClasses:r="py-1 bg-white dark:bg-gray-700",children:a})=>{const{open:i,setOpen:s}=u.useContext(M);let n="origin-top";e==="left"?n="ltr:origin-top-left rtl:origin-top-right start-0":e==="right"&&(n="ltr:origin-top-right rtl:origin-top-left end-0");let l="";return t==="48"&&(l="w-48"),o.jsx(o.Fragment,{children:o.jsx(R,{as:u.Fragment,show:i,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:o.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${n} ${l}`,onClick:()=>s(!1),children:o.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+r,children:a})})})})},Y=({className:e="",children:t,...r})=>o.jsx(E,{...r,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+e,children:t});z.Trigger=J;z.Content=U;z.Link=Y;const k=z;/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=N("AlignJustify",[["line",{x1:"3",x2:"21",y1:"6",y2:"6",key:"4m8b97"}],["line",{x1:"3",x2:"21",y1:"12",y2:"12",key:"10d38w"}],["line",{x1:"3",x2:"21",y1:"18",y2:"18",key:"kwyyxn"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=N("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=N("CircleGauge",[["path",{d:"M15.6 2.7a10 10 0 1 0 5.7 5.7",key:"1e0p6d"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M13.4 10.6 19 5",key:"1kr7tw"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=N("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=N("LocateFixed",[["line",{x1:"2",x2:"5",y1:"12",y2:"12",key:"bvdh0s"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12",key:"1tbv5k"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5",key:"11lu5j"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}],["circle",{cx:"12",cy:"12",r:"7",key:"fim9np"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);let K={data:""},ee=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||K,te=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,re=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,v=(e,t)=>{let r="",a="",i="";for(let s in e){let n=e[s];s[0]=="@"?s[1]=="i"?r=s+" "+n+";":a+=s[1]=="f"?v(n,s):s+"{"+v(n,s[1]=="k"?"":t)+"}":typeof n=="object"?a+=v(n,t?t.replace(/([^,])+/g,l=>s.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):s):n!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=v.p?v.p(s,n):s+":"+n+";")}return r+(t&&i?t+"{"+i+"}":i)+a},y={},G=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+G(e[r]);return t}return e},se=(e,t,r,a,i)=>{let s=G(e),n=y[s]||(y[s]=(c=>{let d=0,p=11;for(;d<c.length;)p=101*p+c.charCodeAt(d++)>>>0;return"go"+p})(s));if(!y[n]){let c=s!==e?e:(d=>{let p,g,f=[{}];for(;p=te.exec(d.replace(re,""));)p[4]?f.shift():p[3]?(g=p[3].replace(H," ").trim(),f.unshift(f[0][g]=f[0][g]||{})):f[0][p[1]]=p[2].replace(H," ").trim();return f[0]})(e);y[n]=v(i?{["@keyframes "+n]:c}:c,r?"":"."+n)}let l=r&&y.g?y.g:null;return r&&(y.g=y[n]),((c,d,p,g)=>{g?d.data=d.data.replace(g,c):d.data.indexOf(c)===-1&&(d.data=p?c+d.data:d.data+c)})(y[n],t,a,l),n},ae=(e,t,r)=>e.reduce((a,i,s)=>{let n=t[s];if(n&&n.call){let l=n(r),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;n=c?"."+c:l&&typeof l=="object"?l.props?"":v(l,""):l===!1?"":l}return a+i+(n??"")},"");function A(e){let t=this||{},r=e.call?e(t.p):e;return se(r.unshift?r.raw?ae(r,[].slice.call(arguments,1),t.p):r.reduce((a,i)=>Object.assign(a,i&&i.call?i(t.p):i),{}):r,ee(t.target),t.g,t.o,t.k)}let W,T,F;A.bind({g:1});let b=A.bind({k:1});function ie(e,t,r,a){v.p=t,W=e,T=r,F=a}function w(e,t){let r=this||{};return function(){let a=arguments;function i(s,n){let l=Object.assign({},s),c=l.className||i.className;r.p=Object.assign({theme:T&&T()},l),r.o=/ *go\d+/.test(c),l.className=A.apply(r,a)+(c?" "+c:"");let d=e;return e[0]&&(d=l.as||e,delete l.as),F&&d[0]&&F(l),W(d,l)}return i}}var oe=e=>typeof e=="function",I=(e,t)=>oe(e)?e(t):e,ne=(()=>{let e=0;return()=>(++e).toString()})(),q=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),le=20,L=new Map,ce=1e3,_=e=>{if(L.has(e))return;let t=setTimeout(()=>{L.delete(e),j({type:4,toastId:e})},ce);L.set(e,t)},de=e=>{let t=L.get(e);t&&clearTimeout(t)},S=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,le)};case 1:return t.toast.id&&de(t.toast.id),{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:r}=t;return e.toasts.find(s=>s.id===r.id)?S(e,{type:1,toast:r}):S(e,{type:0,toast:r});case 3:let{toastId:a}=t;return a?_(a):e.toasts.forEach(s=>{_(s.id)}),{...e,toasts:e.toasts.map(s=>s.id===a||a===void 0?{...s,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},O=[],D={toasts:[],pausedAt:void 0},j=e=>{D=S(D,e),O.forEach(t=>{t(D)})},ue={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},pe=(e={})=>{let[t,r]=u.useState(D);u.useEffect(()=>(O.push(r),()=>{let i=O.indexOf(r);i>-1&&O.splice(i,1)}),[t]);let a=t.toasts.map(i=>{var s,n;return{...e,...e[i.type],...i,duration:i.duration||((s=e[i.type])==null?void 0:s.duration)||(e==null?void 0:e.duration)||ue[i.type],style:{...e.style,...(n=e[i.type])==null?void 0:n.style,...i.style}}});return{...t,toasts:a}},me=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||ne()}),C=e=>(t,r)=>{let a=me(t,e,r);return j({type:2,toast:a}),a.id},m=(e,t)=>C("blank")(e,t);m.error=C("error");m.success=C("success");m.loading=C("loading");m.custom=C("custom");m.dismiss=e=>{j({type:3,toastId:e})};m.remove=e=>j({type:4,toastId:e});m.promise=(e,t,r)=>{let a=m.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(i=>(m.success(I(t.success,i),{id:a,...r,...r==null?void 0:r.success}),i)).catch(i=>{m.error(I(t.error,i),{id:a,...r,...r==null?void 0:r.error})}),e};var fe=(e,t)=>{j({type:1,toast:{id:e,height:t}})},ge=()=>{j({type:5,time:Date.now()})},xe=e=>{let{toasts:t,pausedAt:r}=pe(e);u.useEffect(()=>{if(r)return;let s=Date.now(),n=t.map(l=>{if(l.duration===1/0)return;let c=(l.duration||0)+l.pauseDuration-(s-l.createdAt);if(c<0){l.visible&&m.dismiss(l.id);return}return setTimeout(()=>m.dismiss(l.id),c)});return()=>{n.forEach(l=>l&&clearTimeout(l))}},[t,r]);let a=u.useCallback(()=>{r&&j({type:6,time:Date.now()})},[r]),i=u.useCallback((s,n)=>{let{reverseOrder:l=!1,gutter:c=8,defaultPosition:d}=n||{},p=t.filter(x=>(x.position||d)===(s.position||d)&&x.height),g=p.findIndex(x=>x.id===s.id),f=p.filter((x,P)=>P<g&&x.visible).length;return p.filter(x=>x.visible).slice(...l?[f+1]:[0,f]).reduce((x,P)=>x+(P.height||0)+c,0)},[t]);return{toasts:t,handlers:{updateHeight:fe,startPause:ge,endPause:a,calculateOffset:i}}},he=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ye=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,be=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ve=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${he} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ye} 0.15s ease-out forwards;
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
    animation: ${be} 0.15s ease-out forwards;
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
`,je=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${we} 1s linear infinite;
`,ke=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ne=b`
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
}`,Ce=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ne} 0.2s ease-out forwards;
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
`,$e=w("div")`
  position: absolute;
`,Ee=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Le=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Oe=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Le} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,De=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?u.createElement(Oe,null,t):t:r==="blank"?null:u.createElement(Ee,null,u.createElement(je,{...a}),r!=="loading"&&u.createElement($e,null,r==="error"?u.createElement(ve,{...a}):u.createElement(Ce,{...a})))},Ie=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ze=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ae="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",Te=w("div")`
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
`,Fe=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Se=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=q()?[Ae,Pe]:[Ie(r),ze(r)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Me=u.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?Se(e.position||t||"top-center",e.visible):{opacity:0},s=u.createElement(De,{toast:e}),n=u.createElement(Fe,{...e.ariaProps},I(e.message,e));return u.createElement(Te,{className:e.className,style:{...i,...r,...e.style}},typeof a=="function"?a({icon:s,message:n}):u.createElement(u.Fragment,null,s,n))});ie(u.createElement);var He=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=u.useCallback(n=>{if(n){let l=()=>{let c=n.getBoundingClientRect().height;a(e,c)};l(),new MutationObserver(l).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return u.createElement("div",{ref:s,className:t,style:r},i)},_e=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:q()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...i}},Ge=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,We=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=xe(r);return u.createElement("div",{style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(d=>{let p=d.position||t,g=c.calculateOffset(d,{reverseOrder:e,gutter:a,defaultPosition:t}),f=_e(p,g);return u.createElement(He,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?Ge:"",style:f},d.type==="custom"?I(d.message,d):i?i(d):u.createElement(Me,{toast:d,position:p}))}))},Ye=m;function Ze({user:e,header:t,children:r}){const a=route().current(),[i,s]=u.useState(!1),n=()=>{s(!i)};return o.jsxs("div",{className:"admin-layout",children:[o.jsx("div",{className:"header w-full py-4 bg-white border-b-2 sticky top-0",children:o.jsxs("div",{className:"full flex items-center justify-between px-6",children:[o.jsx("div",{className:"left",children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("div",{className:"ham flex items-center",children:o.jsx("button",{onClick:n,children:o.jsx(Z,{size:24,color:"gray",strokeWidth:1.5})})}),o.jsx(h.Typography,{variant:"h5",color:"blue-gray",className:"text-center",children:"Wave Portal"})]})}),o.jsx("div",{className:"right",children:o.jsxs(k,{children:[o.jsx(k.Trigger,{children:o.jsx("span",{className:"inline-flex rounded-md",children:o.jsxs("button",{type:"button",className:"flex items-center gap-2 text-gray-600 font-semibold",children:[e.name,o.jsx(B,{})]})})}),o.jsxs(k.Content,{children:[o.jsx(k.Link,{href:route("profile.edit"),children:"Profile"}),o.jsx(k.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})})]})}),o.jsxs("div",{className:"page-content",children:[o.jsx("aside",{className:`fixed w-full max-w-[18rem] transition-all ease-in-out duration-300 z-50 ${i?"left-0":"-left-full"}`,children:o.jsx(h.Card,{className:"h-screen bg-gradient-to-tr from-gray-900 to-gray-800 rounded-none",children:o.jsxs(h.List,{className:"text-white",children:[o.jsx(E,{href:"/dashboard",className:`${a==="dashboard"?"bg-blue-gray-50/50 rounded-lg":""}`,children:o.jsxs(h.ListItem,{children:[o.jsx(h.ListItemPrefix,{className:"mr-3",children:o.jsx(Q,{})}),o.jsx("span",{className:"font-semibold text-base",children:"Dashboard"})]})}),o.jsx(E,{href:route("wireless.sites.index"),className:`${a==="wireless.sites.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:o.jsxs(h.ListItem,{children:[o.jsx(h.ListItemPrefix,{className:"mr-3",children:o.jsx(V,{})}),o.jsx("span",{className:"font-semibold text-base",children:"Wireless Sites"})]})}),o.jsx(E,{href:route("wireless.location.index"),className:`${a==="wireless.location.index"?"bg-blue-gray-50/50 rounded-lg":""}`,children:o.jsxs(h.ListItem,{children:[o.jsx(h.ListItemPrefix,{className:"mr-3",children:o.jsx(X,{})}),o.jsx("span",{className:"font-semibold text-base",children:"Wireless Locations"})]})})]})})}),o.jsx("main",{className:"main-content lg:w-full lg:max-w-[calc(100%)]",children:r})]}),o.jsx(We,{})]})}export{Ze as A,B as C,Ye as _};
