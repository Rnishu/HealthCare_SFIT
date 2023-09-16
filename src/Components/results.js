import React, { useEffect, useState } from "react";

function Results(){
    const [urgency, setUrgency] = useState('');
    const [disease, setDisease] = useState('');
    const [allotment, setAllotment] = useState('');
    useEffect(()=>{
        fetch('/api/results')
            .then((res)=>{
                console.log(res);
                return res.json();
            })
            .then((data)=>{
                console.log(data);
                setUrgency(data.urgency);
                setDisease(data.disease);
                setAllotment(data.allotment);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])
    return(
        <div>
            <p>urgency : {urgency}</p>
            <p>Disease : {disease}</p>
            <p>Alloted hospital : {allotment}</p>
        </div>
    );
}

export default Results;