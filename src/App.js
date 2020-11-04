import React from 'react'
import Cookies from 'js-cookie';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Login from "./containers/login/Login";
import Dashboard from "./containers/dashboard/Dashboard"

function App() {
  const [role, setRole] = React.useState(Cookies.get('role') === "true"? true : false)

  return (
    <div>
       <Router>
          { Cookies.get('isLogged')
          ? null : window.location.pathname.localeCompare("/") === 0 
          ? null : (window.location.pathname = "/")}
          <Route 
            path="/" 
            exact 
            component={Login} 
          />
          <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          />


       </Router>
    </div>
  );
}

export default App;
