import {useState} from "react";
import {loginAdmin} from "../services/api";

function AdminLogin({setLogged}){

const [password,setPassword]=useState("");

const login = async () => {

const res = await loginAdmin(password);
const data = await res.json();

if(data.status === "success"){

localStorage.setItem("admin","true");  // store login
setLogged(true);

}else{
alert("Wrong password");
}

};

return(

<div>

<h2>Admin Login</h2>

<input
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

);

}

export default AdminLogin;