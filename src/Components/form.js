import e from "cors";
import React, { useState, useReducer, useEffect }from "react";
import { useNavigate} from "react-router-dom";
const host = 'http://localhost:3001/';
function Form(){

    const [symptomsArray, dispatch] = useReducer(
        (symptomsArray, {type, value})=>{
            switch(type) {
                case 'add' :
                    return [...symptomsArray, value];
                case 'remove' :
                    return symptomsArray.filter(
                        (index) =>{
                            return index !==value
                        }
                    )
                default :
                    return symptomsArray;
            }
        },[]
    )
    const navigate = useNavigate();
    const [age, setAge] = useState();
    const [gender, setGender] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [date, setDate] = useState({});
    let numberOfDays;
    const [location, setLocation] = useState('');
    const [oxygenLevel, setOxygenLevel] = useState('');
    const [pulseRate, setPulseRate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [systole, setSystole] = useState('');
    const [diastol, setDiastol] = useState('');
    const [vitalSigns, setVitalSigns] = useState([]);
    const [previousDisease, setPreviousDisease] = useState([]);
    const [previousDiseaseSymptoms, setPreviousDiseaseSymptoms] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState({});
    const [ancestralDisease, setAncestralDisease] = useState([]); 

    useEffect(()=>{
        fetch(host+'api/symptomsList')
        .then((res)=>{
            console.log(res);
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            setSymptomsArray(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    function handleGender(e, gender){
        e.preventDefault();
        setGender(gender);
    }
    /*function comparisonSymptomsFunction(){
        let tempArray = []
        symptomsArray.forEach(
            (symptom)=>{
                if(symptom.slice(0,symptoms.length) === symptoms){
                    tempArray.push(symptom);
                }
            }
        )
        setTempSymptoms(tempArray);
        }*/

    async function submit(){
        try{
        const tempArray = [oxygenLevel, pulseRate, temperature, systole, diastol];
        setVitalSigns(tempArray);
        const tempObject = {
            previousDisease : previousDisease,
            symptoms : previousDiseaseSymptoms
        }
        setMedicalHistory(tempObject);
            const presentDate = new Date(); 
            const diseaseDate = new Date(date); 
            numberOfDays = diseaseDate.getDay() - presentDate.getDay(); 
        }catch(error){
            console.log(error);
        }
        try{
            fetch(host+'api/userMedInfo',{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json',
                },
                body:JSON.stringify({
                    age,
                    symptoms,
                    numberOfDays,
                    gender,
                    vitalSigns,
                    location,
                    medicalHistory,
                    ancestralDisease
                })
            });
            
        }catch(error){
            console.log(error);
        }
        navigate('/result');
        console.log('Data Submitted');
    }

    return(
        <div>
            <h1 className="formHeading"></h1>
            <div class="formContainer">
            <form>
                <input type="number" id='age' placeholder="Age" className="input"
                    onChange={(e)=>setAge(e.target.value)}></input><br></br>
                <div className="genderContainer">
                    <input type='button' className='gender input' id='male' value='Male' onClick={(e)=>{handleGender(e,'Male')}}></input><br></br>
                    <input type='button' className='gender input' id='female' value='Female' onClick={(e)=>{handleGender(e,'Female')}}></input><br></br>
                    <input type='button' className='gender input' id='others' value='Others' onClick={(e)=>{handleGender(e,'Other')}}></input><br></br>
                </div>
                <input 
                    className="input"
                    type='text' 
                    placeholder="Symptoms" 
                    value={symptoms}
                    onChange={(e)=>{setSymptoms(e.target.value)}}
                ></input>
                <button onClick = {
                    ()=>{
                        dispatch({type : 'add',value : symptoms})
                    }
                }>Add Symptom</button><br></br>
                {
                    symptomsArray.map((symptom, index)=>{
                        <div>
                            <p>{symptom}</p>
                            <button onClick={
                                ()=>{
                                    dispatch({type : 'remove', value : index})
                                }
                            }>Remove Symptom</button><br></br>
                        </div>
                    })
                }
                {/*<div>
                    <ul>
                        {
                            symptomsArray.map((array, index)=>{
                                <li>
                                    <button
                                        value={array[index]} 
                                        onClick={setSymptoms(array[element])}
                                    ></button>
                                </li>
                                createArray();
                            })
                        }
                    </ul>
                </div><br></br>
                <div>
                    <ul>
                        {
                            tempsymptoms.map((symptom)=>{
                                <li>{symptom}</li>
                            })
                        }
                    </ul>
                    </div>*/}
                <input type="date" className="date input flexChild"
                    onChange={(e)=>setDate(e.target.value)}></input><br></br>
                <input type='text' placeholder="Location" className="input flexChild"
                    onChange={(e)=>setLocation(e.target.value)}></input><br></br>
                <input type='number' placeholder="Oxygen Levels" className="input flexChild"
                    onChange={(e)=>{setOxygenLevel(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Pulse Rate" className="input flexChild"
                    onChange={(e)=>{setPulseRate(e.target.value)}}></input><br></br>
                <input type='number' placeholder='Temperature in F' className="input flexChild"
                    onChange={(e)=>{setTemperature(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Systole" className="input flexChild"
                    onChange={(e)=>{setSystole(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Diastol" className="input flexChild"
                    onChange={(e)=>{setDiastol(e.target.value)}}></input><br></br>
                <p className="label">Medical History</p>
                <input type='text' placeholder="Previous Disease" className="input flexChild"
                    onChange={(e)=>{setPreviousDisease(e.target.value)}}></input><br></br>
                <input className="input flexChild"
                    type='text'
                    placeholder='Symptoms related to previous disease'
                    onChange={(e)=>{setPreviousDiseaseSymptoms(e.target.value)}}
                ></input><br></br>
                <p className="label">Ancestral History</p>
                <input type='text' placeholder="Disease" className="input flexChild"
                     onChange={(e)=>{setAncestralDisease(e.target.value)}}></input>
                <button onClick={submit} className="input flexChild">Submit</button>
            </form>
            </div>
        </div>
    );
}
export default Form;