import React from 'react'
import Cookies from 'js-cookie';
import Login from '../../containers/login/Login'
import {
    Route
  } from "react-router-dom";
const ProtectedRoute = (props) =>{
    return(
        <Route 
            path = {props.path} 
            component = {
                Cookies.get('isLogged')?
                props.component:
                Login} 
            exact={props.exact}
        >    
        </Route>
    )
}

export default ProtectedRoute