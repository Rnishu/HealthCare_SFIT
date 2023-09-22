import React from "react";
//import jwt from 'jsonwebtoken';
import {useState, useNavigate} from 'react-router-dom';
function Home(){
    return(
        <div>
            <nav>
                <div className="homeNav">
                    <ul className="navLink">
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contacts</a></li>
                    </ul>
                </div>
            </nav>
            <h1 className="homeHeading">BeWell.org</h1>
            <h2>Welcome to BeWell.org, we care about your wellness.</h2>
            <p className="homePara">Welcome to BeWell.org, your trusted partner in healthcare innovation. BeWell.org is a 
            cutting-edge AI/ML pipeline designed to revolutionize disease prediction and severity assessment.
            Our state-of-the-art technology harnesses the power of artificial intelligence and machine learning
            to provide accurate and timely insights into your health. With BeWell.org, you can stay ahead of potential
            health challenges, enabling early intervention and personalized care. Join us on this transformative journey
            towards a healthier and happier future. Your well-being, our priority.</p>
            <a className='link' href='./form'>Form</a>

        </div>
    );
}
export default Home;