
import { useContext } from "react";
import userContext from "../../context/userContext";

function Header() {
  const username = useContext(userContext);

  return (
    <header>
      <h1>Student Management App</h1>
      <p>Welcome, {username}!</p>
    </header>
  );
}

export default Header;