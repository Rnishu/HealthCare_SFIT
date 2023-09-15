import React from "react";
function Form(){
    function submit(){
        console.log('Data Submitted')
    }
    return(
        <div>
            <form>
            <input type="number" id='age' placeholder="Age"></input><br></br>
            <input type='radio' name='gender' id='male'></input>
            <label for='male'>Male</label><br></br>
            <input type='radio' name='gender' id='female'></input>
            <label for='female'>Female</label><br></br>
            <input type='radio' name='gender' id='others'></input>
            <label for='other'>Others</label><br></br>
            <input type='text' placeholder="Symptoms"></input><br></br>
            <input type="date"></input><br></br>
            <input type='text' placeholder="Location"></input><br></br>
            <input type='text' placeholder="Vital Signs"></input><br></br>
            <p>Medical History</p>
            <input type='text' placeholder="Previous Disease"></input><br></br>
            <input 
                type='text' placeholder='Symptoms related to previous disease'
            ></input><br></br>
            <p>Ancestral History</p>
            <input typpe='text' placeholder="Disease"></input>
            <button onClick={submit}>Submit</button>
        </form>
        </div>
    );
}
export default Form;