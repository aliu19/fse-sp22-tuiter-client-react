import React, {useEffect, useState} from "react";
import EditableTuit from "./editable-tuit";
import {useParams} from "react-router-dom";

const EditableTuits = ({allTuits, deleteTuit, updateTuit}) => {
    const [manageTuits, setManageTuits] = useState(allTuits);
    useEffect(() => {
        setManageTuits(allTuits)
    }, [allTuits])
    return (
        <ul className='list-group'>
            {
                manageTuits.map(tuit => {
                    return (
                        <EditableTuit
                            deleteTuit={deleteTuit}
                            updateTuit={updateTuit}
                            key={tuit._id}
                            tuit={tuit}/>
                    )
                })
            }
        </ul>
    )
}

export default EditableTuits