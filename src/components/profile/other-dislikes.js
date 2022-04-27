/**
 * @file Implements MyDislikes Component for displaying all tuits that user disliked
 */
 import Tuits from "../tuits";
 import * as service from "../../services/dislikes-service"
 import {useEffect, useState} from "react";
 import {useParams} from "react-router-dom";
 import OtherTuits from "../tuits/other-tuits"
 
 /**
  * Implements OtherDislikes Component for displaying all tuits that user disliked
  * This page will require user to be logged in
  * @returns {JSX.Element}
  */
 const OtherDislikes = () => {
     /**
      *  to maintain all dislikedTuits state
      */
     const [dislikedTuits, setDislikedTuits] = useState([]);
     const {ouid} = useParams();
     /**
      * Calling dislikes service for retrieving all tuit disliked by "me"
      */
     const findTuitsIDislike = () => {
         service.findAllTuitsDislikedByUser(ouid)
             .then((tuits) => {
                 setDislikedTuits(tuits);
             })
     }
 
     useEffect(() => {
         findTuitsIDislike()
     }, [])
 
     return (
         <div>
             <OtherTuits userTuits={dislikedTuits}/>
         </div>
     )
 }
 
 export default OtherDislikes