import { useState } from "react";
import { searchBooks } from "../services/api";

function SearchBar(){

const [query,setQuery] = useState("");
const [results,setResults] = useState([]);

const search = async () => {

if(query.trim() === "") return;

const res = await searchBooks(query);
const data = await res.json();

setResults(data);

};

return(

<div style={{padding:"20px"}}>

<h2>Search Books</h2>

<input
placeholder="Search by title, author, subject"
value={query}
onChange={(e)=>setQuery(e.target.value)}
style={{
padding:"8px",
width:"250px",
marginRight:"10px",
border:"1px solid #ccc",
borderRadius:"4px"
}}
/>

<button
onClick={search}
style={{
padding:"8px 15px",
background:"#007bff",
color:"white",
border:"none",
borderRadius:"4px",
cursor:"pointer"
}}
>
Search
</button>

<ul style={{marginTop:"20px"}}>

{results.map((b,i)=>(
<li key={i} style={{marginBottom:"8px"}}>
<b>{b.title}</b> — {b.authors.join(", ")}
</li>
))}

</ul>

</div>

);

}

export default SearchBar;