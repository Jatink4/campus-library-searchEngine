import AddBookForm from "./AddBookForm";
import BookList from "./BookList";
import SearchBar from "../components/SearchBar";

function AdminDashboard(){



return(

<div style={{padding:"20px", fontFamily:"Arial"}}>

<h1>Admin Dashboard</h1>

{/* Search Section */}
<div style={{marginBottom:"15px"}}>
<SearchBar/>
</div>

{/* Add Book Section */}
<div style={{marginBottom:"30px"}}>
<AddBookForm  />
</div>

{/* Book List */}
<BookList />

</div>

);

}

export default AdminDashboard;