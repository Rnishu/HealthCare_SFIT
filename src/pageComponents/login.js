import React from "react";

function Login(){
    return(
        <div classname="form">
            <div classname="title">Welcome</div>
            <div classname="subtitle">to BeWell</div>
            <div class="input-container ic1">
            <input type="text" placeholder="Username"></input><br></br>
            </div><div class="cut"></div>
            <div class="input-container ic2">
            <input type="password" placeholder="Password"></input><br></br>
            </div><div class="cut"></div>
            <button>Login</button>
            <a href='/register'>Register</a>
        </div>
    );
}

export default Login;
