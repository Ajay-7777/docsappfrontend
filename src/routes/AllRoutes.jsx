import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignupPage from "../pages/SignupPage";
import Editor from "../pages/Redirect";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function AllRoutes(){

    return <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/redirect" element={<Editor />}></Route> */}
        {/* <Route path='/redirect' element={<Navigate replace to={`/docs/${uuid()}`} /> } /> */}
        <Route path='/redirect/docs/:id' element={<PrivateRoute ><Editor /></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute ><NotesPage /></PrivateRoute>}></Route>

    </Routes>
}