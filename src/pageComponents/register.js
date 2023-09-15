import React from "react";

function Register(){
    return(
        <div>
            <input type="text" placeholder="Username"></input><br></br>
            <input type="password" placeholder="Password"></input><br></br>
            <input type="email" placeholder="Email"></input><br></br>
            <button>Register</button>
            <a href='./login'>Login?</a>
        </div>
    );
}

export default Register;