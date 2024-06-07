import{c as l}from"./createLucideIcon-CLLfQlk1.js";import{j as t,a as m,r as x}from"./app-Bf0r3ZS7.js";import{r as p}from"./index-Cq8M2JfI.js";/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=l("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function b({links:r,perPage:s}){function n(e){return e?"bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2":"bg-gradient-to-tr from-gray-900 to-gray-800 text-white text-xs font-semibold rounded-md px-3 py-2"}return r.length>3&&t.jsx("div",{className:"flex flex-wrap flex-start md:justify-end gap-1",children:r.map((e,o)=>e.url===null?t.jsx("div",{className:"bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2",children:t.jsx("span",{dangerouslySetInnerHTML:{__html:e.label}})},o):t.jsx(m,{className:n(e.active),href:`${e.url}&per_page=${s}`,children:t.jsx("span",{dangerouslySetInnerHTML:{__html:e.label}})},o))})}function j({route_name:r,file_name:s}){const[n,e]=x.useState(!1),o=async()=>{try{e(!0);const c=await axios.get(route(`${r}`)),d=new Blob([c.data],{type:"text/csv"}),i=window.URL.createObjectURL(d),a=document.createElement("a");a.href=i,a.setAttribute("download",`${s}.csv`),document.body.appendChild(a),a.click(),document.body.removeChild(a)}catch(c){console.log(c)}finally{e(!1)}};return t.jsx("div",{className:"export",children:t.jsx(p.Button,{variant:"gradient",className:"capitalize",size:"sm",onClick:o,loading:n,children:"Export"})})}export{g as C,j as E,b as P,y as S};
