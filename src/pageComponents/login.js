import React from "react";

function Login(){
    return(
        <div>
            <input type="text" placeholder="Username"></input><br></br>
            <input type="password" placeholder="Password"></input><br></br>
            <button>Login</button>
            <a href='/register'>Register</a>
        </div>
    );
}

export default Login;