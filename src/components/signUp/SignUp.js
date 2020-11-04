import React, { useState } from 'react'
import Input from "../input/Input"
import Button from "../buttons/Buttons"
import axios from "axios"

const SignUp = () => {
    // styling for login and signup is inside input.css
    const [emailid,setEmailId] = useState('');
    const [pass,setPass] = useState('');
    const [nm,setName] = useState('');
    const [num,setNum] = useState('');
    const [rl,setRole] = useState('');
    const [done,setDone]=React.useState(false)
    const signUp = ()=>{
        var data = JSON.stringify({
            "name":nm,
            "email":emailid,
            "password":pass,
            "role":rl,
            "number":num
        });
        var config = {
            method: 'post',
            url: 'http://localhost:4000/users/createUser',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios(config)
          .then(function () {
            setDone(true);
          })
          .catch(function (e) {
            console.log(e);
          });
    }
    return (
        <div>
            {
                done?(<><h1>Thank you!</h1><br/><br/></>):(
                    <div className="form-container">
                        <Input 
                        label="Name"
                        type="text"
                        className="size-ipt-1"
                        onChange={(e)=>{setName(e.target.value)}}
                        />
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
                        <Input 
                        label="Mobile No."
                        type="number"
                        className="size-ipt-1"
                        onChange={(e)=>{setNum(e.target.value)}}
                        />
                        <label for="role">Join freelancer as: </label>
                        <br/>
                        <select  
                        className="size-ipt-1" 
                        id="role"
                        onChange={(e)=>{setRole(e.target.value)}}>
                             <option value="none">--</option>
                            <option value="artist">Freelancer</option>
                            <option value="hirer">Employer</option>
                        </select>
                        <br/>
                        <Button 
                        className="dark" 
                        label="Sign Up"
                        onClick={signUp}
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default SignUp
