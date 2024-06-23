import{W as Y,j as e,r as p,R as $,b as re,y as K,Y as oe,a as le}from"./app-CrS-F7N2.js";import{r as n}from"./index-CUrtQdmz.js";import{_ as ee,A as ae,C as ie}from"./AuthenticatedLayout-BObt_2Xh.js";import{T as se}from"./TextInput-BDgcLnyp.js";import{I as H}from"./InputLabel-I_cPhifu.js";import{I as E}from"./InputError-DaenVlP7.js";import{M as de,D as ce,T as ue,S as xe,R as he,E as fe,C as me,P as je}from"./RestoreTable-CDTR1UFn.js";import{U as ve}from"./UploadItemField-CcBFvTS9.js";import"./transition-QrvrlTN8.js";import"./format-lmOIHTd3.js";function ye({addColumnDialog:a,setAddColumnDialog:i}){const{data:s,setData:c,post:o,processing:u,errors:x,reset:h}=Y({type:"wntd",name:"",key:"",input_type:"",options:""}),w=f=>{f.preventDefault(),o(route("additional.columns.save.item"),{onSuccess:()=>{i(!1),h()}})};return e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"Add New Column"}),e.jsxs(n.DialogBody,{children:[e.jsxs("div",{className:"form-item mb-4",children:[e.jsx(H,{value:"Column Name",className:"mb-1"}),e.jsx(se,{className:"w-full text-sm font-medium text-gray-600",placeholder:"Column Name...",value:s.name,onChange:f=>c("name",f.target.value)}),e.jsx(E,{message:x.name,className:"text-sm font-medium"})]}),e.jsxs("div",{className:"form-item mb-4",children:[e.jsx(H,{value:"Column Key",className:"mb-1"}),e.jsx(se,{className:"w-full text-sm font-medium text-gray-600",placeholder:"Column key...",value:s.key,onChange:f=>c("key",f.target.value)}),e.jsx(E,{message:x.key,className:"text-sm font-medium"})]}),e.jsxs("div",{className:"form-item mb-4",children:[e.jsx(H,{value:"Column Input Type",className:"mb-1"}),e.jsxs("select",{className:"w-full rounded text-sm border-gray-300 shadow-sm font-medium text-gray-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600",value:s.input_type,onChange:f=>c("input_type",f.target.value),children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"text",children:"Text"}),e.jsx("option",{value:"date",children:"Date"}),e.jsx("option",{value:"dropdown",children:"DropDown"})]}),e.jsx(E,{message:x.input_type,className:"text-sm font-medium"})]}),(s==null?void 0:s.input_type)==="dropdown"&&e.jsxs("div",{className:"form-item mb-4",children:[e.jsx(H,{value:"Dropdown Options seprated by (|)",className:"mb-1"}),e.jsx("textarea",{className:"w-full rounded text-sm border-gray-300 shadow-sm font-normal focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600",placeholder:"Dropdown Options seprated by | ...",rows:4,value:s.options,onChange:f=>c("options",f.target.value)}),e.jsx(E,{message:x.options,className:"text-sm font-medium"})]})]}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",onClick:()=>i(!a),className:"mr-1 capitalize",children:e.jsx("span",{children:"Cancel"})}),e.jsx(n.Button,{variant:"gradient",color:"green",onClick:f=>w(f),className:"capitalize",loading:u,children:e.jsx("span",{children:"Submit"})})]})]})}function pe({hideColumnDialog:a,setHideColumnDialog:i,columns:s,hidden_columns:c,deleted_columns:o}){const u=()=>i(!a),[x,h]=p.useState([]),{data:w,setData:f,post:N,processing:S,errors:k,reset:C}=Y({type:"wntd",key:"hide",items:(c==null?void 0:c.length)>0?c:[]});p.useEffect(()=>{a&&h(j=>[...s.filter(z=>!o.includes(z.key)).map(z=>({key:z.key,name:z.name}))])},[a]);const g=(j,T)=>{const z=j.target.checked;f(I=>z?{...I,items:[...I.items,T]}:{...I,items:I.items.filter(_=>_!==T)})},m=j=>{j.preventDefault(),N(route("hide.columns.item"),{onSuccess:()=>{i(!1),C()}})};return e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"Hide Column"}),e.jsx(n.DialogBody,{children:e.jsxs("div",{className:"form-item",children:[e.jsx("p",{className:"text-[#333] font-semibold",children:"Please select the column you want to hide"}),e.jsx("div",{className:"form-item grid grid-cols-2",children:(x==null?void 0:x.length)>0&&x.map((j,T)=>e.jsx($.Fragment,{children:e.jsx(n.Checkbox,{containerProps:{className:"py-3"},className:"w-5 h-5 rounded-md",label:e.jsx(n.Typography,{color:"blue-gray",className:"font-medium text-sm",children:j==null?void 0:j.name}),onChange:z=>g(z,j==null?void 0:j.key),defaultChecked:c==null?void 0:c.includes(j==null?void 0:j.key)})},T))})]})}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",onClick:u,className:"mr-1 capitalize",children:e.jsx("span",{children:"Cancel"})}),e.jsx(n.Button,{variant:"gradient",color:"green",onClick:j=>{m(j)},className:"capitalize",loading:S,children:e.jsx("span",{children:"Confirm"})})]})]})}function be({renameColumnDialog:a,setRenameColumnDialog:i,columns:s,deleted_columns:c}){var k;const{data:o,setData:u,post:x,processing:h,errors:w,reset:f}=Y({type:"wntd",key:"rename",items:[]});p.useEffect(()=>{a&&u(C=>{const g=[...s.filter(m=>!c.includes(m.key)).map(m=>({key:m.key,name:m.name}))];return{...C,items:g}})},[a]);const N=(C,g)=>{u(m=>({...m,items:m.items.map(j=>j.key===C?{...j,name:g}:j)}))},S=C=>{C.preventDefault(),x(route("rename.columns.item"),{onSuccess:()=>{i(!1),f()}})};return e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"Rename Columns"}),e.jsx(n.DialogBody,{className:"max-h-[42rem] overflow-scroll",children:e.jsx("div",{className:"grid grid-cols-2 gap-3",children:(o==null?void 0:o.items.length)>0&&((k=o==null?void 0:o.items)==null?void 0:k.map((C,g)=>e.jsx("div",{className:"form-item mb-2",children:e.jsx(se,{className:"w-full text-sm font-medium text-gray-600",value:C==null?void 0:C.name,onChange:m=>N(C==null?void 0:C.key,m.target.value)})},g)))})}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",className:"mr-1 capitalize",onClick:()=>i(!1),children:"Cancel"}),e.jsx(n.Button,{variant:"gradient",color:"green",className:"capitalize",onClick:C=>S(C),loading:h,children:"Submit"})]})]})}function Ne({deleteColumnDialog:a,setDeleteColumnDialog:i,columns:s,deleted_columns:c}){const{data:o,setData:u,post:x,processing:h,errors:w,reset:f}=Y({type:"wntd",key:"delete",items:[]}),[N,S]=p.useState([]);p.useEffect(()=>{a&&S(g=>[...s.filter(j=>!c.includes(j.key)).map(j=>({key:j.key,name:j.name}))])},[a]);const k=(g,m)=>{const j=g.target.checked;u(T=>j?{...T,items:[...T.items,m]}:{...T,items:T.items.filter(z=>z!==m)})},C=g=>{g.preventDefault(),x(route("delete.columns.item"),{onSuccess:()=>{i(!1),f()}})};return e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"Delete Columns"}),e.jsx(n.DialogBody,{className:"max-h-[42rem] overflow-scroll",children:e.jsxs("div",{className:"form-item",children:[e.jsx("p",{className:"text-[#333] font-semibold",children:"Please select the column you want to delete."}),e.jsx("div",{className:"grid grid-cols-2",children:(N==null?void 0:N.length)>0&&N.map((g,m)=>e.jsx($.Fragment,{children:e.jsx(n.Checkbox,{containerProps:{className:"py-3"},className:"w-5 h-5 rounded-md",label:e.jsx(n.Typography,{color:"blue-gray",className:"font-medium text-sm",children:g==null?void 0:g.name}),onChange:j=>{k(j,g==null?void 0:g.key)}})},m))})]})}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",className:"mr-1 capitalize",onClick:()=>i(!1),children:"Cancel"}),e.jsx(n.Button,{variant:"gradient",color:"green",className:"capitalize",onClick:g=>{C(g)},loading:h,children:"Submit"})]})]})}function ge({arrangeColumnDialog:a,setArrangeColumnDialog:i,columns:s,deleted_columns:c}){const[o,u]=p.useState([]),[x,h]=p.useState(null),{data:w,setData:f,post:N,processing:S,errors:k,reset:C}=Y({type:"wntd",key:"arrange",items:[]});p.useEffect(()=>{a&&u(I=>[...(F=>F.map((U,A)=>({...U,position:A+1})))(s.filter(F=>!c.includes(F.key)).map(F=>({key:F.key,name:F.name})))])},[a]);const g=(I,_)=>{h(_)},m=()=>{h(null)},j=I=>{I.preventDefault()},T=(I,_)=>{if(!x)return;const W=o.indexOf(x),F=o.indexOf(_);if(W!==-1&&F!==-1){const A=[...(O=>O.map((r,y)=>({...r,position:y+1})))(o)],[L]=A.splice(W,1);A.splice(F,0,L);const V=A.map((O,r)=>({...O,position:r+1}));u(V);const J=V.map(O=>({key:O.key,position:O.position}));f("items",J)}},z=I=>{I.preventDefault(),N(route("rearrange.columns.item"),{onSuccess:()=>{i(!1),C()}})};return e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"Re-arrange Columns"}),e.jsxs(n.DialogBody,{className:"max-h-[42rem] overflow-scroll",children:[e.jsx("p",{className:"text-[#333] font-semibold mb-3",children:"Please drag and drop the column you want to arrange."}),e.jsx("div",{className:"draggable-wrapper border rounded-md py-2",children:(o==null?void 0:o.length)>0&&(o==null?void 0:o.map((I,_)=>e.jsx("div",{className:"text-gray-600 font-medium py-1 px-2 text-sm  cursor-move",draggable:"true",onDragStart:W=>g(W,I),onDragEnd:m,onDragOver:j,onDrop:W=>T(W,I),children:e.jsxs("div",{className:"flex items-center gap-3 border py-2 px-2 rounded-md ",children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(de,{strokeWidth:1.5,size:18})}),I.name]})},_)))})]}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",className:"mr-1 capitalize",onClick:()=>i(!1),children:"cancel"}),e.jsx(n.Button,{variant:"gradient",color:"green",className:"capitalize",onClick:I=>z(I),loading:S,children:"Submit"})]})]})}function we({columns:a,hidden_columns:i,deleted_columns:s}){const[c,o]=p.useState(!1),[u,x]=p.useState(!1),[h,w]=p.useState(!1),[f,N]=p.useState(!1),[S,k]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs(n.Menu,{children:[e.jsx(n.MenuHandler,{children:e.jsx(n.Button,{variant:"gradient",size:"sm",className:"capitalize",children:"Column Options"})}),e.jsxs(n.MenuList,{className:"font-semibold text-gray-600",children:[e.jsx(n.MenuItem,{onClick:()=>{o(!0)},children:"Add Column"}),e.jsx(n.MenuItem,{onClick:()=>{x(!0)},children:"Show/Hide Columns"}),e.jsx(n.MenuItem,{onClick:()=>{w(!0)},children:"Rename Columns"}),e.jsx(n.MenuItem,{onClick:()=>{k(!0)},children:"Rearrange Columns"}),e.jsx(n.MenuItem,{onClick:()=>{N(!0)},className:"text-red-500",children:"Delete Columns"})]})]}),e.jsx(ye,{addColumnDialog:c,setAddColumnDialog:o}),e.jsx(pe,{hideColumnDialog:u,setHideColumnDialog:x,columns:a,hidden_columns:i,deleted_columns:s}),e.jsx(be,{renameColumnDialog:h,setRenameColumnDialog:w,columns:a,deleted_columns:s}),e.jsx(Ne,{deleteColumnDialog:f,setDeleteColumnDialog:N,columns:a,deleted_columns:s}),e.jsx(ge,{arrangeColumnDialog:S,setArrangeColumnDialog:k,columns:a,deleted_columns:s})]})}function Ce({mappingDialog:a,setMappingDialog:i,mappingData:s,setBatchId:c}){var T,z,I,_,W,F,U,A,L,V,J,O;const o=()=>i(!a),[u,x]=p.useState({file_path:s?s==null?void 0:s.filePath:"",loc_id:"",wntd:"",imsi:"",version:"",avc:"",bw_profile:"",lon:"",lat:"",site_name:"",home_cell:"",home_pci:"",traffic_profile:""}),[h,w]=p.useState({}),[f,N]=p.useState(!1),[S,k]=p.useState(""),[C,g]=p.useState(""),m=(r,y)=>{x(q=>({...q,[r]:y}))};p.useEffect(()=>{m("file_path",s!=null&&s.filePath?s==null?void 0:s.filePath:"")},[s]);const j=async r=>{var q,G,Q,X,Z,D;r.preventDefault();let y={};if(["loc_id","wntd","imsi","version","avc","bw_profile","lon","lat","site_name","home_cell","home_pci","traffic_profile"].forEach(P=>{u[P]||(y[P]="This field is required.")}),w(y),Object.keys(y).length>0){console.log(y);return}try{N(!0);const P=await re.post(route("wireless.sites.map.save"),u);P!=null&&P.data&&(g((G=(q=P==null?void 0:P.data)==null?void 0:q.success)==null?void 0:G.message),c((Q=P==null?void 0:P.data)==null?void 0:Q.batch_id),setTimeout(()=>{i(!1),g(""),k("")},3e3),K.visit(route("wireless.sites.index")))}catch(P){console.log("error:",P),k(`${(D=(Z=(X=P==null?void 0:P.response)==null?void 0:X.data)==null?void 0:Z.error)==null?void 0:D.message}`)}finally{N(!1)}};return e.jsx($.Fragment,{children:e.jsxs(n.Dialog,{open:a,size:"xs",children:[e.jsx(n.DialogHeader,{children:"CSV Mapping"}),S&&e.jsx("p",{className:"text-red-500 font-medium text-[12px] px-4",children:S}),C&&e.jsx("p",{className:"text-green-500 font-medium text-[12px] px-4",children:C}),e.jsxs(n.DialogBody,{className:"px-6 overflow-scroll",children:[e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"LOCID",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.loc_id,onChange:r=>m("loc_id",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((T=s==null?void 0:s.header)==null?void 0:T.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.loc_id,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"WNTD",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.wntd,onChange:r=>m("wntd",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((z=s==null?void 0:s.header)==null?void 0:z.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.wntd,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"IMSI",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.imsi,onChange:r=>m("imsi",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((I=s==null?void 0:s.header)==null?void 0:I.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.imsi,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"VERSION",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.version,onChange:r=>m("version",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((_=s==null?void 0:s.header)==null?void 0:_.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.version,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"AVC",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.avc,onChange:r=>m("avc",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((W=s==null?void 0:s.header)==null?void 0:W.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.avc,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"BW Profile",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.bw_profile,onChange:r=>m("bw_profile",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((F=s==null?void 0:s.header)==null?void 0:F.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.bw_profile,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"Lon",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.lon,onChange:r=>m("lon",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((U=s==null?void 0:s.header)==null?void 0:U.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.lon,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"Lat",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.lat,onChange:r=>m("lat",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((A=s==null?void 0:s.header)==null?void 0:A.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.lat,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"SiteName",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.site_name,onChange:r=>m("site_name",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((L=s==null?void 0:s.header)==null?void 0:L.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.site_name,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"HomeCell",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.home_cell,onChange:r=>m("home_cell",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((V=s==null?void 0:s.header)==null?void 0:V.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.home_cell,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"HomePCI",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.home_pci,onChange:r=>m("home_pci",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((J=s==null?void 0:s.header)==null?void 0:J.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.home_pci,className:"!text-[12px] font-medium"})]})]})}),e.jsx("div",{className:"form-item mb-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(H,{value:"Traffic_Profile",className:"w-1/3"}),e.jsxs("div",{className:"w-full",children:[e.jsxs("select",{className:"w-full font-medium text-[12px] py-1 rounded-md border-gray-300",value:u.traffic_profile,onChange:r=>m("traffic_profile",r.target.value),children:[e.jsx("option",{value:"",children:"Select"}),((O=s==null?void 0:s.header)==null?void 0:O.length)>0&&(s==null?void 0:s.header.map((r,y)=>e.jsx("option",{value:r,children:r},y)))]}),e.jsx(E,{message:h.traffic_profile,className:"!text-[12px] font-medium"})]})]})})]}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",color:"red",onClick:o,className:"mr-1",disabled:f,children:e.jsx("span",{children:"Cancel"})}),e.jsx(n.Button,{variant:"gradient",color:"green",onClick:j,loading:f,children:e.jsx("span",{children:"Confirm"})})]})]})})}function ke({siteId:a,locId:i,name:s,value:c,handleEditAbleItem:o}){const[u,x]=p.useState(c||""),h=w=>{x(w),o(a,i,s,w)};return e.jsx("div",{className:"w-full h-full",children:e.jsx("textarea",{className:"border-none focus:ring-0 bg-transparent !shadow-none text-[12px] font-medium w-full",value:u,rows:1,onChange:w=>{h(w.target.value)}})})}function Se({siteId:a,locId:i,name:s,value:c,handleEditAbleItem:o}){const[u,x]=p.useState(c||""),h=w=>{x(w),o(a,i,s,w)};return e.jsx("div",{className:"w-full h-full",children:e.jsx(ce,{selected:u,onChange:w=>h(w),className:"border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium",dateFormat:"dd/MM/yyyy"})})}function Ie({siteId:a,locId:i,name:s,value:c,options:o,handleEditAbleItem:u}){const[x,h]=p.useState(c||""),w=f=>{h(f),u(a,i,s,f)};return e.jsx("div",{className:"w-full h-full",children:e.jsxs("select",{value:x,onChange:f=>{w(f.target.value)},className:"border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium",children:[e.jsx("option",{value:"",children:"Select"}),(o==null?void 0:o.length)>0&&o.map((f,N)=>e.jsx("option",{value:f.value,children:f.label},N))]})})}const _e={text:ke,date:Se,dropdown:Ie};function Pe({item:a,site:i,handleEditAbleItem:s}){const c=_e[a.input_type],o={status:[{label:"In Progress",value:"in_progress"},{label:"Not Started",value:"not_started"},{label:"Completed",value:"completed"}],solution_type:[{label:"Device Upgrade",value:"device_upgrade"},{label:"Reparent",value:"reparent"},{label:"Repan",value:"repan"}]};return e.jsx(c,{siteId:i==null?void 0:i.id,locId:i==null?void 0:i.loc_id,name:a.key,value:a.value,handleEditAbleItem:s,options:o[a.key]})}function ze({site_id:a,changedItems:i,setChangedItems:s}){const[c,o]=p.useState(!1),u=async x=>{var h,w,f;if(i.length>0){let N=i.filter(S=>S.site_id===x)[0];if(N){o(!0);const S=await axios.post(route("wireless.sites.save.item"),{site_id:N==null?void 0:N.site_id,location_id:N==null?void 0:N.loc_id,items:N==null?void 0:N.items});(h=S==null?void 0:S.data)!=null&&h.success&&(o(!1),ee.success((f=(w=S==null?void 0:S.data)==null?void 0:w.success)==null?void 0:f.message),s(k=>k.filter(C=>C.site_id!==x)))}}};return e.jsx(n.Button,{size:"sm",className:"capitalize py-1 px-2 rounded font-semibold",disabled:!i.some(x=>x.site_id===a),onClick:()=>{u(a)},loading:c,children:"Save"})}function Te({site_id:a}){const{processing:i,delete:s}=Y(),[c,o]=p.useState(!1),u={onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)},x=()=>{s(route("wireless.sites.destroy",a),{preserveScroll:!0,onSuccess:()=>{K.visit(route("wireless.sites.index"))}})};return e.jsx($.Fragment,{children:e.jsxs(n.Popover,{placement:"top-end",open:c,handler:o,children:[e.jsx(n.PopoverHandler,{...u,children:e.jsx(n.Button,{variant:"gradient",color:"red",size:"sm",className:"capitalize py-1 px-2 rounded",onClick:()=>setOpen(!0),children:e.jsx(ue,{size:14})})}),e.jsxs(n.PopoverContent,{...u,className:"px-3",children:[e.jsx(n.Typography,{variant:"h6",className:"text-center",children:"Are you sure?"}),e.jsx(n.Typography,{variant:"small",className:"font-normal",children:"This cannot be reverted back."}),e.jsxs("div",{className:"mt-2 flex justify-between",children:[e.jsx(n.Button,{variant:"text",color:"red",size:"sm",className:"capitalize rounded",onClick:()=>o(!1),children:"Cancel"}),e.jsx(n.Button,{variant:"gradient",color:"red",size:"sm",className:"capitalize rounded",onClick:x,children:"Delete"})]})]})]})})}function $e({auth:a,sites:i,get_data:s,batch:c,additional_columns:o,hidden_columns:u,renamed_columns:x,deleted_columns:h,arrange_columns:w}){var P;const{role:f}=a,N=[{name:"LOCID",sortable:!0,key:"loc_id",position:1,editable:!1},{name:"WNTD",sortable:!0,key:"wntd",position:2,editable:!1},{name:"IMSI",sortable:!0,key:"imsi",position:3,editable:!1},{name:"VERSION",sortable:!0,key:"version",position:4,editable:!1},{name:"AVC",sortable:!0,key:"avc",position:5,editable:!1},{name:"BW Profile",sortable:!0,key:"bw_profile",position:6,editable:!1},{name:"Lon",sortable:!0,key:"lon",position:7,editable:!1},{name:"Lat",sortable:!0,key:"lat",position:8,editable:!1},{name:"SiteName",sortable:!0,key:"site_name",position:9,editable:!1},{name:"HomeCell",sortable:!0,key:"home_cell",position:10,editable:!1},{name:"HomePCI",sortable:!0,key:"home_pci",position:11,editable:!1},{name:"Traffic Profile",sortable:!0,key:"traffic_profile",position:12},{name:"Start Date",sortable:!1,key:"start_date",position:13,editable:!0,input_type:"date"},{name:"End Date",sortable:!1,key:"end_date",position:14,editable:!0,input_type:"date"},{name:"Solution Type",sortable:!1,key:"solution_type",position:15,editable:!0,input_type:"dropdown"},{name:"Status",sortable:!1,key:"status",position:16,editable:!0,input_type:"dropdown"},{name:"Remarks",sortable:!1,key:"remarks",position:17,editable:!0,input_type:"text"},{name:"Artifacts",sortable:!1,key:"artifacts",position:18,editable:!0,input_type:"upload"}];function S(t,b){return t==null?b:b==null?t:[...new Set([...t,...b])]}const k=S(u,h);function C(){const t=[...N],b=o==null?void 0:o.map(d=>({...d,editable:!0})),l=(d,v)=>d.position!==void 0&&v.position!==void 0?d.position-v.position:d.position!==void 0?-1:v.position!==void 0?1:0;return x&&(t.forEach(d=>{const v=x.find(R=>R.key===d.key);v&&(d.name=v.name)}),b.forEach(d=>{const v=x.find(R=>R.key===d.key);v&&(d.name=v.name)})),k&&(t.forEach(d=>{k.find(R=>R===d.key)&&(d.hidden=!0)}),b.forEach(d=>{k.find(R=>R===d.key)&&(d.hidden=!0)})),w&&(t.forEach(d=>{const v=w.find(R=>R.key===d.key);v&&(d.position=v.position)}),b.forEach(d=>{const v=w.find(R=>R.key===d.key);v&&(d.position=v.position)})),[...t,...b].sort(l)}const g=C(),m=p.useRef(null),[j,T]=p.useState(s!=null&&s.search?s==null?void 0:s.search:""),[z,I]=p.useState(s!=null&&s.per_page?s==null?void 0:s.per_page:10),[_]=p.useState(i),[W,F]=p.useState(!1),[U,A]=p.useState(""),[L,V]=p.useState(null),[J,O]=p.useState([]),r=t=>{m.current.click()},y=async t=>{var l,B,M;const b=new FormData;b.append("import_file",t.target.files[0]);try{const d=await re.post(route("wireless.sites.import"),b);d!=null&&d.data&&(A(d==null?void 0:d.data),F(!0))}catch(d){ee.error(`${(M=(B=(l=d==null?void 0:d.response)==null?void 0:l.data)==null?void 0:B.error)==null?void 0:M.message}`)}},q=async()=>{K.get(route("wireless.sites.index",{search:j}))},G=async(t,b)=>{K.get(route("wireless.sites.index",{order_by:t,order:b}))},Q=async(t,b)=>{K.get(route("wireless.sites.index",{filter_by:t,value:b}))},X=t=>{I(t),K.get(route("wireless.sites.index",{...s,per_page:t}))};p.useEffect(()=>{c!=null&&c.batch_site_id&&V(c==null?void 0:c.batch_site_id)},[]),p.useEffect(()=>{const t=async()=>{var l,B,M;try{let d=0;const v=await re.get(route("import.progress",{batchId:L}));if(v!=null&&v.data){let R=parseInt((l=v==null?void 0:v.data)==null?void 0:l.total_jobs),ne=parseInt((B=v==null?void 0:v.data)==null?void 0:B.pending_jobs),te=R-ne;parseInt((M=v==null?void 0:v.data)==null?void 0:M.failed_jobs)>0?clearInterval(b):(d=parseInt(te/R*100).toFixed(0),d<100?ee.loading(`CSV Data Import Progress: ${d}%.
 Please wait....`,{id:"loading-toast",style:{backgroundColor:"#424242",color:"#ffffff",fontSize:14,borderRadius:4,fontWeight:"bold"}}):(ee.dismiss("loading-toast"),clearInterval(b)))}}catch(d){console.log(d)}},b=setInterval(()=>{L&&t()},5e3);return()=>clearInterval(b)},[L]);const Z=(t,b,l,B)=>{const M=J.findIndex(d=>d.site_id===t&&d.loc_id===b);O(M!==-1?d=>{const v=[...d];return v[M]={...v[M],items:{...v[M].items,[l]:B}},v}:d=>[...d,{site_id:t,loc_id:b,items:{[l]:B}}])},D=t=>{let b=[];return g.forEach(l=>{const B=l.key,M=t[B];M!==void 0?l!=null&&l.position?b[l.position-1]={key:B,value:M,editable:l==null?void 0:l.editable,input_type:l!=null&&l.input_type?l==null?void 0:l.input_type:""}:b.push({key:B,value:M,editable:l==null?void 0:l.editable,input_type:l!=null&&l.input_type?l==null?void 0:l.input_type:""}):b.push({key:B,value:"",editable:l==null?void 0:l.editable,input_type:l!=null&&l.input_type?l==null?void 0:l.input_type:""})}),b};return e.jsxs(ae,{user:a==null?void 0:a.user,children:[e.jsx(oe,{title:"WNTD"}),e.jsx("div",{className:"top-section p-4",children:e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("div",{className:"",children:[e.jsx(n.Typography,{variant:"h3",className:"tracking-tight",children:"WNTD"}),e.jsxs("ul",{className:"flex gap-1 text-gray-600 text-sm",children:[e.jsx("li",{children:e.jsx(le,{href:route("dashboard"),children:"Dashboard"})}),e.jsx("li",{children:"/"}),e.jsx("li",{children:e.jsx(le,{href:route("wireless.sites.index"),children:"WNTD"})})]})]})})}),e.jsx("div",{className:"filter-wrapper md:px-4",children:e.jsxs("div",{className:"flex filter-details justify-end gap-2",children:[e.jsxs("div",{className:"search-wrapper w-1/5 flex relative",children:[e.jsx(se,{placeholder:"Search...",className:"w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8",value:j,onChange:t=>T(t.target.value)}),e.jsx("div",{className:"search-icon",children:e.jsx(n.IconButton,{size:"sm",className:"rounded-l-none",onClick:q,children:e.jsx(xe,{color:"white",size:18})})})]}),e.jsx("div",{className:"status-filter",children:e.jsxs("select",{className:"w-52 text-sm rounded-md focus:ring-0 h-8 border-gray-300 py-1 text-gray-600 font-medium",onChange:t=>Q("status",t.target.value),value:(s==null?void 0:s.filter_by)==="status"?s==null?void 0:s.value:"",children:[e.jsx("option",{value:"",children:"Filter by Status"}),e.jsx("option",{value:"in_progress",children:"In Progress"}),e.jsx("option",{value:"not_started",children:"Not Started"}),e.jsx("option",{value:"completed",children:"Completed"})]})}),e.jsx("div",{className:"filter-solution-type",children:e.jsxs("select",{className:"w-52 text-sm rounded-md focus:ring-0 h-8 border-gray-300 py-1 text-gray-600 font-medium",onChange:t=>Q("solution_type",t.target.value),value:(s==null?void 0:s.filter_by)==="solution_type"?s==null?void 0:s.value:"",children:[e.jsx("option",{value:"",children:"Filter by Solution Type"}),e.jsx("option",{value:"device_upgrade",children:"Device Upgrade"}),e.jsx("option",{value:"reparent",children:"Reparent"}),e.jsx("option",{value:"repan",children:"Repan"})]})}),f==="super-admin"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"import-type-field",children:[e.jsx(n.Button,{variant:"gradient",className:"capitalize",size:"sm",onClick:r,children:"Import from CSV"}),e.jsx("input",{type:"file",onChange:y,ref:m,style:{display:"none"}})]}),e.jsx(we,{columns:g,hidden_columns:u,deleted_columns:h||[]}),e.jsx(he,{type:"wntd"})]}),e.jsx(fe,{route_name:"wireless.sites.export",file_name:"WNTD_Export"})]})}),e.jsxs("div",{className:"content mt-6",children:[e.jsx(n.Card,{className:"h-full w-full rounded-none",children:e.jsxs("div",{className:"overflow-x-auto overflow-hidden",children:[e.jsxs("table",{className:"w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[g.map(t=>e.jsx("th",{className:`border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer ${k!=null&&k.includes(t==null?void 0:t.key)?"hidden":""}`,children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx(n.Typography,{variant:"small",className:"leading-none text-gray-800 font-medium text-sm",children:t.name}),(t==null?void 0:t.sortable)&&e.jsxs("div",{className:"relative mt-1",children:[e.jsx("span",{className:"absolute -top-2 right-0 hover:bg-blue-gray-100 rounded-sm",children:e.jsx(me,{size:12,strokeWidth:2,onClick:()=>{G(t.key,"asc")}})}),e.jsx("span",{className:"absolute -bottom-1 right-0 hover:bg-blue-gray-100 rounded-sm",children:e.jsx(ie,{size:12,strokeWidth:2,onClick:()=>{G(t.key,"desc")}})})]})]})},t.name)),e.jsx("th",{className:"border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer"})]})}),e.jsx("tbody",{children:_==null?void 0:_.data.map(t=>{const b=D(t);return e.jsxs("tr",{className:"even:bg-blue-gray-50/50",children:[b==null?void 0:b.map((l,B)=>e.jsx($.Fragment,{children:e.jsx("td",{className:`border-l h-10 text-[12px] font-medium ps-2 ${k!=null&&k.includes(l==null?void 0:l.key)?"hidden":""}`,children:(l==null?void 0:l.key)==="loc_id"?e.jsx(le,{href:route("wireless.show.location.index",l==null?void 0:l.value),className:"font-semibold underline",children:l==null?void 0:l.value}):e.jsx($.Fragment,{children:l!=null&&l.editable?e.jsxs($.Fragment,{children:[(l==null?void 0:l.input_type)!=="upload"&&e.jsx(Pe,{item:l,site:t,handleEditAbleItem:Z}),(l==null?void 0:l.input_type)==="upload"&&e.jsx(ve,{value:l==null?void 0:l.value,name:"artifacts",locId:t.loc_id,siteId:t.id})]}):e.jsx($.Fragment,{children:(l==null?void 0:l.key)==="imsi"?parseFloat(l==null?void 0:l.value):l==null?void 0:l.value})})})},B)),e.jsx("td",{className:"border-l h-10 px-3",children:e.jsxs("div",{className:"flex gap-1",children:[e.jsx(ze,{site_id:t==null?void 0:t.id,changedItems:J,setChangedItems:O}),e.jsx(Te,{site_id:t==null?void 0:t.id})]})})]},t.id)})})]}),((P=_==null?void 0:_.data)==null?void 0:P.length)===0&&e.jsx(n.Typography,{variant:"h6",color:"blue-gray",className:"text-center py-6",children:"No data found"}),e.jsxs("div",{className:"md:flex grid justify-start md:justify-end items-center pt-6 mb-8 gap-3 px-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"text-sm font-medium",children:"Rows per Page"}),e.jsxs("select",{className:"rounded-md text-sm font-medium border-gray-400 focus:ring-0 py-2",value:z,onChange:t=>{X(t.target.value)},children:[e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"15",children:"15"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"20",children:"25"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"all",children:"All"})]})]}),e.jsx("div",{className:"text-sm font-medium",children:`${i==null?void 0:i.from}-${i==null?void 0:i.to} of ${i==null?void 0:i.total} Records`}),e.jsx(je,{links:_==null?void 0:_.links,perPage:z})]})]})}),e.jsx(Ce,{mappingDialog:W,setMappingDialog:F,mappingData:U,setBatchId:V})]})]})}export{$e as default};
