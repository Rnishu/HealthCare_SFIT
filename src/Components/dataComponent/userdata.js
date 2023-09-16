import React, { useEffect, useState } from "react";

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
        </div>
    );
}
export default UserData;