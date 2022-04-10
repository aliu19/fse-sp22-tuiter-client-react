import React from "react";
import logo from './logo.svg';
import './styles.css';
// import Navigation from "./components/navigation";
// import Index from "./components/tuits";
// import WhatsHappening from "./components/whats-happening/whats-happening";
// import Bookmarks from "./components/bookmarks/bookmarks";
import Tuiter from "./components/tuiter";
import {HashRouter, Route, Routes} from "react-router-dom";
import Admin from "./components/admin";
import AdminEditProfile from "./components/admin/users-manager/admin-edit-profile";
import UsersTuits from "./components/admin/tuits-manager/users-tuits";
import AllTuits from "./components/admin/tuits-manager/all-tuits";
import SearchTuits from "./components/admin/tuits-manager/search-tuits";
import SearchUsers from "./components/admin/users-manager/search-users";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/admin/*' element={<Admin/>}/>
                <Route path='/admin/:currentPage' element={<Admin/>}/>
                <Route path='/admin/profile/:uid' element={<AdminEditProfile/>}/>
                <Route path='/admin/:uid/tuits' element={<UsersTuits/>}/>
                <Route path='/*' element={<Tuiter/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
