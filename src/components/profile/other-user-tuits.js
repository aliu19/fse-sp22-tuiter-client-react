import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

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
        <Tuits tuits={tuits} refreshTuits={findTuitByUser}/>
    )
}

export default OtherUserTuits