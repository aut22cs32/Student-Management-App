import { useContext } from "react";
import userContext from "../context/userContext";

function UserDetails() {
const username = useContext(userContext);

return ( <div> <h3>User Details</h3> <p>Username: {username}</p> </div>
);
}

export default UserDetails;
