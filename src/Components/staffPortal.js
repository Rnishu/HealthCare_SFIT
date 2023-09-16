import React from "react";
import UserData from "./dataComponent/userdata";
function StaffPortal(){
    const skip = 0;
    const limit = 5;
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`/api/userMedInfo?limit=${limit}&skip=${skip}`)
        .then((res)=>{
            console.log(res);
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            setData(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    return(
        <div>
            <h1>Medical Staff's </h1>
            <p>Fill form for patient?</p>
            <a href='./form'>Form</a>
            <div>
                {
                    data.map(
                        (user, index)=>{
                            <UserData key={index} user={user}></UserData> 
                        }
                    )
                }
            </div>
        </div>
    );
}

export default StaffPortal;