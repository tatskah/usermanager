import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import ErrorPage from "./error-page.js";
import Users from './components/users-list.component.js';
import UserForm from './components/user-form.component.js';

function App()
{

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
          <a href="/users" className="navbar-brand">
            &nbsp;&nbsp;Usermanager
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">Users</Link>
            </li>
          </div>
        </nav>

        <div id="page-content-wrapper">
          <div className="container-fluid">

            <div className="container mt-3">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );

}
export default App;
