import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import RestaurantsPage from "./pages/user/RestaurantsPage";
import ReleasePage from "./pages/user/ReleasePage";
import MealsPage from "./pages/user/MealsPage";
import NewMealPage from "./pages/user/NewMealPage";

export function BackButton(){
    const navigate = useNavigate();
    return <button className={"btn btn-primary"} onClick={() => navigate(-1)}>
        Back
    </button>
}
function App() {
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/restaurants" element={<RestaurantsPage/>}/>
                    <Route path="/release" element={<ReleasePage/>} />
                    <Route path="/restaurants/:id/meals" element={<MealsPage/>} />
                    <Route path="/newMeal" element={<NewMealPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
