import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Employees from "./pages/Students";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="main-navigation" aria-label="Main navigation">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          About
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<Navigate to="/employees/cards" replace />} />
        <Route path="/employees" element={<Navigate to="/employees/cards" replace />} />
        <Route path="/employees/add" element={<Employees view="form" />} />
        <Route path="/employees/cards" element={<Employees view="cards" />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
