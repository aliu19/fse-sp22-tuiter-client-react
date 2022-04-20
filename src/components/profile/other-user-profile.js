/**
 * @file Implements Profile component for display profile page for a user
 * It contains links to my-tuits, my-likes and my-dislikes
 */
 import React, {useEffect, useState} from "react";
 import {useParams} from "react-router-dom";
 import MyTuits from "./my-tuits";
 import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
 import * as usersService from "../../services/users-service";
 import * as tuitsService from "../../services/tuits-service";
 import MyLikes from "./my-likes";
 import MyDislikes from "./my-dislikes";

 const OtherUserProfile = () => {
    const [user, setUser] = useState([]);
    const [tuits, setTuits] = useState([]);
    const {uid} = useParams();
    const findUserById = () =>
    usersService.findUserById(uid)
            .then(user => {
                console.log('user', user)
                setUser(user)
            });
    const findTuitByUser = () =>
    tuitsService.findTuitByUser(uid)
            .then(tuits => {
                console.log('tuits', tuits)
                setTuits(tuits)
            })
//    const navigate = useNavigate();
//    const location = useLocation();
//    const [profile, setProfile] = useState({});

   useEffect(() => {
    console.log('location', window.location.pathname.indexOf('625712d9be600276088d9d30'))
       findUserById();
       findTuitByUser();
    }, []);

   /**
    * Helper function for destroy the sessions
    */
//    const logout = () => {
//      service.logout()
//          .then(() => navigate('/login'))
//    }

   return(
        // <div className='container-fluid'>
        //     <h2>User's profile</h2>
        //     {
        //         user &&
        //         <div>
        //             {user.username}
        //         </div>
        //     }
        // </div>
     <div className="ttr-other-user-profile">
       <div className="border border-bottom-0">
         <h4 className="p-2 mb-0 pb-0 fw-bolder">
           {user.username}
           <i className="fa fa-badge-check text-primary"/>
         </h4>
         <span className="ps-2">67.6K Tuits</span>
         <div className="mb-5 position-relative">
           <img className="w-100" src="../images/nasa-profile-header.jpg"/>
           <div className="bottom-0 left-0 position-absolute">
             <div className="position-relative">
               <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                    src="../images/nasa-3.png"/>
             </div>
           </div>
         </div>

         <div className="p-2">
           <h4 className="fw-bolder pb-0 mb-0">
             {user.username}<i className="fa fa-badge-check text-primary"/>
           </h4>
           <h6 className="pt-0">@{user.username}</h6>
           <p className="pt-2">
             There's space for everybody. Sparkles
           </p>
           <p>
             <i className="far fa-location-dot me-2"/>
             Pale Blue Dot
             <i className="far fa-link ms-3 me-2"/>
             <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
             <i className="far fa-balloon ms-3 me-2"/>
             Born October 1, 1958
             <br/>
             <i className="far fa-calendar me-2"/>
             Joined December 2007
           </p>
           <b>178</b> Following
           <b className="ms-4">51.1M</b> Followers
           
         </div>
       </div>
     </div>
   );
 }
 export default OtherUserProfile; 