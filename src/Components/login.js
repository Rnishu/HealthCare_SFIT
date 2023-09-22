import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');   
    const host = 'http://localhost:3001/';
    const navigate = useNavigate();
    async function loginUser(event){
        event.preventDefault();
        const response = await fetch(host+'api/login', {
          method : 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
        const data = response.json();
        if(data.user){
          localStorage.setItem('token', data.user);
          alert('Login Successful');
          navigate('/home');
        }else{
          alert('Please check your username and password');
        }
        console.log(data);
    }
    return(
        <div>
            <input 
                type="text" 
                placeholder="Username"
                value={username}
                className="textfield"
                onChange={(e)=>setUsername(e.target.value)}
            ></input><br></br>
            <input 
                type="password" 
                placeholder="Password"
                value={password}  
                className="textfield" 
                onChange={(e)=>setPassword(e.target.value)} 
            ></input><br></br>
            <button onClick={loginUser} className='submitButton'>Login</button><br></br>
            <a href='/register'>Register?</a>
        </div>
    );
}

export default Login;