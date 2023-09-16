import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Form(){
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [tempsymptoms, setTempSymptoms] = useState([]);
    const [symptomsArray, setSymptomsArray] = useState([]);
    const [date, setDate] = useState({});
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
        fetch('/api/symptoms')
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
    const handleChange = (gender) =>{
        setGender(gender);
    }
    function comparisonSymptomsFunction(){
        let tempArray = []
        symptomsArray.forEach(
            (symptom)=>{
                if(symptom.slice(0,symptoms.length) === symptoms){
                    tempArray.push(symptom);
                }
            }
        )
        setTempSymptoms(tempArray);
    }
    function createArray(symptom){
        const tempArray = []
        tempArray.push(symptom);
    }
    async function submit(){
        const tempArray = [oxygenLevel, pulseRate, temperature, systole, diastol];
        setVitalSigns(tempArray);
        const tempObject = {
            previousDisease : previousDisease,
            symptoms : previousDiseaseSymptoms
        }
        const presentDate = new Date(); 
        const diseaseDate = new Date(date); 
        const numberOfDays = diseaseDate.getDay() - presentDate.getDay(); 
        setMedicalHistory(tempObject);
        try{
            fetch('/api/userMedInfo',{
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
                    ancestralHistory
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
            <form>
                <input type="number" id='age' placeholder="Age"
                    onChange={(e)=>setAge(e.target.value)}></input><br></br>
                <input type='button' className='gender' id='male'></input>
                <label htmlFor='male' onClick={()=>handleChange('male')}>Male</label><br></br>
                <input type='button' className='gender' id='female'></input>
                <label htmlFor='female' onClick={()=>handleChange('female')}>Female</label><br></br>
                <input type='button' className='gender' id='others'></input>
                <label htmlFor='other' onClick={()=>handleChange('others')}>Others</label><br></br>
                <input 
                    type='text' 
                    placeholder="Symptoms" 
                    onChange={comparisonSymptomsFunction}
                ></input>
                <div>
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
                </div>
                <input type="date"
                    onChange={(e)=>setDate(e.target.value)}></input><br></br>
                <input type='text' placeholder="Location"
                    onChange={(e)=>setLocation(e.target.value)}></input><br></br>
                <input type='number' placeholder="Oxygen Levels"
                    onChange={(e)=>{setOxygenLevel(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Pulse Rate"
                    onChange={(e)=>{setPulseRate(e.target.value)}}></input><br></br>
                <input type='number' placeholder='Temperature in F'
                    onChange={(e)=>{setTemperature(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Systole"
                    onChange={(e)=>{setSystole(e.target.value)}}></input><br></br>
                <input type='number' placeholder="Diastol"
                    onChange={(e)=>{setDiastol(e.target.value)}}></input><br></br>
                <p>Medical History</p>
                <input type='text' placeholder="Previous Disease"
                    onChange={(e)=>{setPreviousDisease(e.target.value)}}></input><br></br>
                <input 
                    type='text'
                    placeholder='Symptoms related to previous disease'
                    onChange={(e)=>{setPreviousDiseaseSymptoms(e.target.value)}}
                ></input><br></br>
                <p>Ancestral History</p>
                <input type='text' placeholder="Disease"
                     onChange={(e)=>{setAncestralDisease(e.target.value)}}></input>
                <button onClick={submit}>Submit</button>
            </form>
        </div>
    );
}
export default Form;