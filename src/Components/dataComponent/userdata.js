import React from "react";

const UserData = (user) =>{
    const presentDate = new date();
    const numberOfDays = user.data.getDay() - presentDate.getDay();
    return(
        <div>
            <p>{user.username}</p>
            <p>{user.age}</p>
            <ul>
                {
                    user.symptoms.map(
                    (symptom, index)=>(
                        <li key={index}>{symptom}</li>
                    ))
                }       
            </ul>
            <p>{numberOfDays}</p>
            <p>{gender}</p>
            <p>{location}</p>
            <h2>Medical History</h2>
            
        </div>
    );
}
export default UserData;