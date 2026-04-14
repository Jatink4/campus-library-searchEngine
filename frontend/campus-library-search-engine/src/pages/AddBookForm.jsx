import {useState} from "react";
import {addBook} from "../services/api";

function AddBookForm(){

const [title,setTitle]=useState("");
const [author,setAuthor]=useState("");

const submit = async () => {

await addBook({
title:title,
description:"",
authors:[author],
publisher:"",
year:2024,
subject:""
});

alert("Book Added");

};


return(

<div>

<h2>Add Book</h2>

<input
placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
/>
<br />
<input
placeholder="Author"
onChange={(e)=>setAuthor(e.target.value)}
/>
<br />
<button onClick={submit}>Add</button>

</div>

);

}

export default AddBookForm;