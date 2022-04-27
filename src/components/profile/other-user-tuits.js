/**
 * @file Implements a list of tuits a user posted for other user's profile
 */

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import * as service from "../../services/tuits-service";
import OtherTuits from "../tuits/other-tuits"

const OtherUserTuits = () => {
    const {ouid} = useParams();
    const [tuits, setTuits] = useState([]);
    const findTuitByUser = () =>
    service.findTuitByUser(ouid)
            .then(tuits => {
                console.log('tuits', tuits)
                console.log('ouid', ouid)
                setTuits(tuits)
            })

    useEffect(() => {
        findTuitByUser()
    }, []);

    return (
        <OtherTuits 
        userTuits={tuits}
        refreshTuits={findTuitByUser}
        />
    )
}

export default OtherUserTuits