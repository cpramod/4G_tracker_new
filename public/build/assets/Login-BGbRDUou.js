import{j as e,W as g,r as f,Y as h,a as i}from"./app-DzalHcVU.js";import{G as j}from"./GuestLayout-DZEh6_Ud.js";import{I as l}from"./InputError-CQQuqtUr.js";import{I as n}from"./InputLabel-wtpN6Dbq.js";import{T as d}from"./TextInput-CxoPIxQU.js";import{r as b}from"./index-D4XrngbZ.js";import"./ApplicationLogo-D-E-9B8Y.js";function w({className:r="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 "+r})}function F({status:r,canResetPassword:a}){const{data:t,setData:m,post:c,processing:u,errors:o,reset:x}=g({email:"",password:"",remember:!1});f.useEffect(()=>()=>{x("password")},[]);const p=s=>{s.preventDefault(),c(route("login"))};return e.jsxs(j,{children:[e.jsx(h,{title:"Log in"}),r&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:r}),e.jsxs("form",{onSubmit:p,className:"px-8 py-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"email",value:"Email"}),e.jsx(d,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value),placeholder:"Email..."}),e.jsx(l,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsx(d,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value),placeholder:"Password..."}),e.jsx(l,{message:o.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex mb-6 mt-6 justify-between",children:[e.jsxs("label",{className:"flex items-center",children:[e.jsx(w,{name:"remember",checked:t.remember,onChange:s=>m("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-700 dark:text-gray-400 font-medium",children:"Remember me"})]}),a&&e.jsx(i,{href:route("password.request"),className:"text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 font-medium ",children:"Forgot your password?"})]}),e.jsx("div",{className:"flex items-center justify-between mt-4",children:e.jsx(b.Button,{className:"capitalize rounded text-sm",disabled:u,variant:"gradient",color:"black`",fullWidth:!0,type:"submit",children:"Log in"})}),e.jsx("div",{className:"mt-6 mb-6",children:e.jsxs("p",{className:"text-center text-sm text-gray-700 tracking-tight font-medium",children:["Don't have an account ?  ",e.jsx(i,{href:route("register"),children:"Register here."})]})})]})]})}export{F as default};
