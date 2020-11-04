import React, { useState } from 'react'
import Input from "../input/Input"
import Button from "../buttons/Buttons"
import axios from "axios"
import { Redirect } from "react-router-dom";
const Login = () => {
    // styling for login and signup is inside input.css
    const [emailid,setEmailId] = useState('');
    const [pass,setPass] = useState('');
    const [redirect,setRedirect] = useState(false)
    const login = ()=>{
        axios.post("http://localhost:4000/users/login",{
            email:emailid,
            password:pass
            },
            {withCredentials:true}
        )
        .then(()=>{
            setRedirect(true)
            window.location.reload(false);    
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    return (
        <div>
            {redirect?<Redirect to="/dashboard"/>:null}
            <div className="form-container">
                <Input 
                label="Email Id"
                type="email"
                className="size-ipt-1"
                onChange={(e)=>{setEmailId(e.target.value)}}
                />
                <Input 
                label="Password"
                type="password"
                className="size-ipt-1"
                onChange={(e)=>{setPass(e.target.value)}}
                />
                <Button 
                className="success" 
                label="Log In"
                onClick={login}
                />
            </div>
        </div>
    )
}

export default Login
