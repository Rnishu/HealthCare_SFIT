import React from "react";
import{
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import Home from './pageComponents/home';
import Form from './pageComponents/form';
import StaffPortal from './pageComponents/staffPortal';
import Login from './pageComponents/login';
import Register from './pageComponents/register';
function AppRouter(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/form' element={<Form/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouter;