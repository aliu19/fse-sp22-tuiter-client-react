/**
 * @file Implements tuit list component for admins to manage tuits in the system.
 * It utilizes the reusable editable tuits component.
 */
import React, {useEffect, useState} from "react";
import * as tuitsService from "../../../services/tuits-service"
import EditableTuits from "./editable-tuits";
import {useParams} from "react-router-dom";

/**
 * Implements tuit list that displays all tuits and uses editable tuits component
 * that enables admins to manage tuits in the system.
 */
const AllTuits = () => {
    const {currentPage} = useParams();
    const [allTuits, setAllTuits] = useState([]);

    useEffect(() => {
        tuitsService.findAllTuits()
            .then(tuits=> {
                setAllTuits(tuits);
            })
    }, [])

    return(
        <div>
            <h2>All tuits</h2>
            <EditableTuits allTuits={allTuits}/>
        </div>
    )
}

export default AllTuits