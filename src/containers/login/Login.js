import React, { useState } from 'react'
import "./login.css"
import logo from "../../assets/logo.png"
import Button from "../../components/buttons/Buttons"
import Popup from "../../components/popup/Popup"
import LoginComp from "../../components/login/Login"
import SignUp from "../../components/signUp/SignUp"
import Cookies from 'js-cookie';
import axios from "axios"

const Login = () => {
    const [login,setLogin]=useState(false);
    const [signUp,setSignUp]=useState(false);

    const loginFunc = ()=>{
        setLogin(true);
    }
    const signUpFunc = ()=>{
        setSignUp(true);
    }

    const crossFunc = ()=>{
        setLogin(false);
        setSignUp(false);
    }

    const logout = ()=>{
        axios.get("http://localhost:4000/users/logout",
        {withCredentials:true})
        .then(()=>{
            window.location.reload(false);    
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    return (
        <div className="login-container">
            {login?(
                <Popup 
                label="Welcome to Freelancer! Log In"
                onClick={crossFunc}
                children={<LoginComp/>}
                />
            ):null}
            {signUp?(
                <Popup 
                label="Welcome to Freelancer! Sign Up"
                onClick={crossFunc}
                children={<SignUp/>}
                />
            ):null}
            <img className="login-logo" src={logo}/>
            <h1 className="login-text-main">Hire the best<br/> <span className="login-text-color">freelancers</span> for any job, <br/><span>online.</span></h1>
            <br/>
            <h4 className="login-text-small">Hire a freelancer or find your next job here!</h4>
            <div className="buttons-login">
                <Button 
                className="primary" 
                label={(Cookies.get('isLogged'))?"Log Out":"Log In"}
                onClick={!Cookies.get('isLogged')?loginFunc:logout}
                />
               { (Cookies.get('isLogged'))?null:(<Button 
                className="light" 
                label="Sign Up"
                onClick={signUpFunc}
                />)}
                </div>
        </div>
    )
}

export default Login
