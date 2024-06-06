import{c as s}from"./createLucideIcon-DKJgpQql.js";import{j as t,a as d}from"./app-BD4exc6D.js";/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=s("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=s("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function p({links:r,perPage:n}){function o(e){return e?"bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2":"bg-gradient-to-tr from-gray-900 to-gray-800 text-white text-xs font-semibold rounded-md px-3 py-2"}return r.length>3&&t.jsx("div",{className:"flex flex-wrap flex-start md:justify-end gap-1",children:r.map((e,a)=>e.url===null?t.jsx("div",{className:"bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2",children:t.jsx("span",{dangerouslySetInnerHTML:{__html:e.label}})},a):t.jsx(d,{className:o(e.active),href:`${e.url}&per_page=${n}`,children:t.jsx("span",{dangerouslySetInnerHTML:{__html:e.label}})},a))})}export{m as C,p as P,c as S};
