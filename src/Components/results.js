import React, { useEffect, useState } from "react";
const host = 'http://localhost:3001/';
function Results(){
    const [urgency, setUrgency] = useState('');
    const [disease, setDisease] = useState('');
    const [allotment, setAllotment] = useState('');
    useEffect(()=>{
        fetch(host+'api/predictionData')
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
            <p className="urgency text">Urgency : {urgency}</p>
            <p className="disease text">Disease : {disease}</p>
            <p className="hospital text">Alloted hospital : {allotment}</p>
        </div>
    );
}

export default Results;