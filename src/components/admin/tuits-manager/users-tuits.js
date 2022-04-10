import React from "react";
import {useParams} from "react-router-dom";

const UsersTuits = () => {
    const {uid} = useParams();
    return(
        <div>
            <h2>User's tuits</h2>
            <h2>{`user id is${uid}`}</h2>
        </div>
    )
}

export default UsersTuits