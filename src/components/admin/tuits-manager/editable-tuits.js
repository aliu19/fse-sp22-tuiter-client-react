import React, {useEffect, useState} from "react";
import EditableTuit from "./editable-tuit";
import {useParams} from "react-router-dom";

const EditableTuits = ({allTuits, deleteTuit}) => {
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
                            key={tuit._id}
                            tuit={tuit}/>
                    )
                })
            }
        </ul>
    )
}

export default EditableTuits