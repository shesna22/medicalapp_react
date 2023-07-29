import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from '../Navbar'



function Search_med()
{
const [medicines, setMedicines] = useState([]);
const [query, setquery] = useState("");

const user = useSelector(store => store.auth.user);

useEffect(() => {
axios
.get(`http://127.0.0.1:8000/djangoapi/search/`+query, {headers: { Authorization: `Token ${user.token}` },
})
.then((response) => {
setMedicines(response.data);
console.log(response.data)
})
.catch((error) => {
console.error("Error fetching medicines:", error);
});
}, [query, user.token]);

function handleSearchInputChange(event)
{
setquery(event.target.value);
}

return (
<div>
<Navbar />
<div className="container">
<div className="row">
<div className="col-8 offset-2">
<h1 className="text-center">Search Medicine</h1>
<div className="form-group">
<input
type="text"
className="form-control"
placeholder="Search by Medicine Name"
value={query}
onChange={handleSearchInputChange}
/>
</div>
<div className="list-group">
{medicines.length > 0 ? (
medicines.map((medicine) => (
<div
key={medicine.id}
className="list-group-item list-group-item-action"
>
Medicine: {medicine.name} <br />
Company: {medicine.company} <br />
Expiry: {medicine.expiry_date}
</div>
))) : (
<div className="list-group-item"><h3 className="text-center">No data found.</h3></div>
)}
</div>



</div>
</div>
</div>
</div>
);
}

export default Search_med;