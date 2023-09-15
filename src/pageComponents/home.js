import React from "react";
//import jwt from 'jsonwebtoken';
import {useState, useNavigate} from 'react-router-dom';
function Home(){
    return(
        <div>
            <nav>
                <div className="homeNav">
                    <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contacts</a></li>
                    </ul>
                </div>
            </nav>
            <h1>Health Care Website</h1>
            <h2>Yash Kanjariya Priyansh Patel Vaishnavi Shridhar Nishanth Ravichandran</h2>
            <a href='./form'>Form</a>
        </div>
    );
}
export default Home;