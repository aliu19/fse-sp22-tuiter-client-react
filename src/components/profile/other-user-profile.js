/**
 * @file Implements other user's Profile component for display profile page for a user
 * It contains links to my-tuits, my-likes and my-dislikes
 */
 import React, {useEffect, useState} from "react";
 import {useParams} from "react-router-dom";
 import MyTuits from "./my-tuits";
 import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
 import * as usersService from "../../services/users-service";
 import * as tuitsService from "../../services/tuits-service";
 import OtherLikes from "./other-likes";
 import OtherDislikes from "./other-dislikes";
 import OtherUserTuits from "./other-user-tuits"

 const OtherUserProfile = () => {
    const [otherUser, setOtherUser] = useState([]);
    const [otherTuits, setOtherTuits] = useState([]);
    const location = useLocation();
    const {ouid} = useParams();
    const findUserById = () =>
    usersService.findUserById(ouid)
            .then(otherUser => {
                console.log('otherUser', otherUser._id)
                setOtherUser(otherUser)
            });

   useEffect(() => {
    console.log('location', location.pathname.indexOf('tuits-and-replies'))
    console.log('location-tuits', location.pathname.indexOf('tuits'))
       findUserById();
    }, []);


   return(
     <div className="ttr-other-user-profile">
       <div className="border border-bottom-0">
         <h4 className="p-2 mb-0 pb-0 fw-bolder">
           {otherUser.username}
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
             {otherUser.username}<i className="fa fa-badge-check text-primary"/>
           </h4>
           <h6 className="pt-0">@{otherUser.username}</h6>
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
           <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className={`nav-link ${location.pathname.indexOf('othertuits') >= 0 ? 'active':''}`}
                      to={`/other-profile/${otherUser._id}/othertuits`}>Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to={`/other-profile/${otherUser._id}/other-tuits-and-replies`}
                    className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}>
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to={`/other-profile/${otherUser._id}/media`}
                    className={`nav-link ${location.pathname.indexOf('media') >= 0 ? 'active':''}`}>
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to={`/other-profile/${otherUser._id}/otherlikes`}
                    className={`nav-link ${location.pathname.indexOf('otherlikes') >= 0 ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to={`/other-profile/${otherUser._id}/dislikes`}
                    className={`nav-link ${location.pathname.indexOf('dislikes') >= 0 ? 'active':''}`}>
                Dislikes
              </Link>
            </li>
            </ul>
         </div>
       </div>
       <Routes>
        <Route path="/othertuits" element={<OtherUserTuits/>}/>
        <Route path="/otherlikes" element={<OtherLikes/>}/>
        <Route path="/dislikes" element={<OtherDislikes/>}/>
 
      </Routes>
     </div>
   );
 }
 export default OtherUserProfile; 