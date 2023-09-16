import React from "react";
import{
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import Home from './Components/home';
import Form from './Components/form';
import StaffPortal from './Components/staffPortal';
import Login from './Components/login';
import Register from './Components/register';
import Result from './Components/results';
function AppRouter(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/home' element={<Home/>}/>
                    <Route exact path='/form' element={<Form/>}/>
                    <Route exact path='/staff_portal' element={<StaffPortal/>}/> 
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouter;