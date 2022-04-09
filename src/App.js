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

function App() {
    return (
        <HashRouter>
            <Routes>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/*' element={<Tuiter/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
