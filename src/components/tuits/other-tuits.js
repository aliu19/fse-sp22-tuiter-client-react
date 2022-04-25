/**
 * @file Implements a tuit list component for only display purpose
 */
 import React, {useEffect, useState} from "react";
 import OtherTuit from "./other-tuit";
 import {useParams} from "react-router-dom";
 
 /**
  * Implements tuits list component that uses tuit component
  * to display each tuit.
  */
 const OtherTuits = ({userTuits}) => {
     const [manageTuits, setManageTuits] = useState(userTuits);
     useEffect(() => {
         setManageTuits(userTuits)
     }, [userTuits])
     return (
         <ul className='list-group'>
             {
                 manageTuits.map(tuit => {
                     return (
                         <OtherTuit
                             key={tuit._id}
                             tuit={tuit}/>
                     )
                 })
             }
         </ul>
     )
 }
 
 export default OtherTuits