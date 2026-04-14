import { useState } from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App(){

const [logged,setLogged] = useState(
localStorage.getItem("admin") === "true"
);

return(

<div>

{logged ?
<AdminDashboard/>
:
<AdminLogin setLogged={setLogged}/>
}

</div>

);

}

export default App;