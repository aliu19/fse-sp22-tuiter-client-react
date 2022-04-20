import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const OtherUserTuits = () => {
    const {uid} = useParams();
    const [tuits, setTuits] = useState([]);
    const findTuitByUser = () =>
    tuitsService.findTuitByUser(uid)
            .then(tuits => {
                console.log('tuits', tuits)
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