import{W as u,r as p,j as e,Y as x,a as f}from"./app-DzalHcVU.js";import{G as w}from"./GuestLayout-DZEh6_Ud.js";import{I as o}from"./InputError-CQQuqtUr.js";import{I as m}from"./InputLabel-wtpN6Dbq.js";import{T as l}from"./TextInput-CxoPIxQU.js";import{r as h}from"./index-D4XrngbZ.js";import"./ApplicationLogo-D-E-9B8Y.js";function _(){const{data:a,setData:r,post:i,processing:n,errors:t,reset:d}=u({name:"",email:"",password:"",password_confirmation:""});p.useEffect(()=>()=>{d("password","password_confirmation")},[]);const c=s=>{s.preventDefault(),i(route("register"))};return e.jsxs(w,{children:[e.jsx(x,{title:"Register"}),e.jsxs("form",{onSubmit:c,className:"px-8 py-4",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",value:"Name"}),e.jsx(l,{id:"name",name:"name",value:a.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:s=>r("name",s.target.value),required:!0,placeholder:"Name..."}),e.jsx(o,{message:t.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>r("email",s.target.value),required:!0,placeholder:"Email..."}),e.jsx(o,{message:t.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password",value:"Password"}),e.jsx(l,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password",s.target.value),required:!0,placeholder:"Password..."}),e.jsx(o,{message:t.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password_confirmation",value:"Confirm Password"}),e.jsx(l,{id:"password_confirmation",type:"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password_confirmation",s.target.value),required:!0,placeholder:"Password Confirmation..."}),e.jsx(o,{message:t.password_confirmation,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center justify-end mt-6",children:e.jsx(h.Button,{variant:"gradient",fullWidth:!0,className:"rounded text-sm capitalize",disabled:n,color:"black",type:"submit",children:"Register"})}),e.jsx("div",{className:"text-center mt-4 mb-4",children:e.jsxs("p",{className:"text-center text-sm text-gray-700 tracking-tight font-medium",children:["Already registered ? ",e.jsx(f,{href:route("login"),children:"Login here."})]})})]})]})}export{_ as default};
