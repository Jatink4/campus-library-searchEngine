import {deleteBook} from "../services/api";

function DeleteButton({id}){

const remove = async ()=>{

await deleteBook(id);
alert("Deleted");

};

return(

<button onClick={remove}>
Delete
</button>

);

}

export default DeleteButton;