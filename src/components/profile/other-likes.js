import Tuits from "../tuits";
import * as service from '../../services/likes-service'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import OtherTuits from "../tuits/other-tuits"

const OtherLikes = () => {
    const {ouid} = useParams();
    const [likedTuits, setLikedTuits] = useState([]);

    const findTuitsILike = () => {
        service.findAllTuitsLikedByUser(ouid)
            .then((tuits) => {
                console.log(tuits);
                setLikedTuits(tuits)
            })
    }

    useEffect(()=> {
        findTuitsILike()
    }, []);

    return (
        <div>
            <OtherTuits userTuits={likedTuits}/>
        </div>
    )
}

export default OtherLikes;