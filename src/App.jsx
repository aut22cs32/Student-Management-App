
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Students from "./pages/Students";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      
<nav className="main-navigation">
  <NavLink
    to="/home"
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    Home
  </NavLink>

  <NavLink
    to="/students"
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    Students
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
  >
    About
  </NavLink>
</nav>


      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;