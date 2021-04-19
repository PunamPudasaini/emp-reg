import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Employee
        </Link>

        <Link className="navbar-brand" to="/table">
          Table
        </Link>
        <Link className="btn btn-outline-light" to="/employee/add">Add Employee</Link>
      </div>
    </nav>
  );
};

export default Navbar;
