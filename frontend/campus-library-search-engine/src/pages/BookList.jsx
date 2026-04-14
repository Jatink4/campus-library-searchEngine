import {useEffect,useState} from "react";
import {getBooks} from "../services/api";
import DeleteButton from "../components/DeleteButton";

function BookList(){

const [books,setBooks]=useState([]);

const load = async ()=>{

const res = await getBooks();
const data = await res.json();

setBooks(data);

};

useEffect(()=>{
load();
},[]);  


return(

<div style={{padding:"20px", fontFamily:"Arial"}}>

<h2 style={{color:"#fcf5f5", marginBottom:"15px"}}>
Books
</h2>

<ul style={{listStyle:"none", padding:0}}>

{books.map((b,i)=>(

<li
className="book-item"
key={i}
style={{
display:"flex",
color:"white",
justifyContent:"space-between",
alignItems:"center",
padding:"10px",
marginBottom:"10px",
background:"#2f3692",
borderRadius:"6px",
boxShadow:"0 2px 4px rgba(28, 161, 223, 0.1)"
}}
>

<span style={{fontSize:"16px", fontWeight:"500"}}>
{b.title} - {b.authors.join(", ")}
</span>

<DeleteButton id={i}/>

</li>

))}

</ul>

</div>

);

}

export default BookList;