import React, {useEffect, useState} from "react";
import * as tuitsService from "../../../services/tuits-service"
import EditableTuits from "./editable-tuits";
import {useParams} from "react-router-dom";

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