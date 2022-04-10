import React from "react";
import {Link} from "react-router-dom";
import TuitVideo from "../../tuits/tuit-video";
import TuitImage from "../../tuits/tuit-image";

const EditableTuit = ({tuit}) => {
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis/1000.0;
        const minutesOld = secondsOld/60.0;
        const hoursOld = minutesOld/60.0;
        const daysOld = hoursOld/24.0;
        if(daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if(hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if(minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if(secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        } else {
            old = "just now"
        }
        return old;
    }

    return (
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    tuit.postedBy &&
                    <img src={`../images/${tuit.postedBy.username}.jpg`}
                         width={20}
                         className="ttr-tuit-avatar-logo rounded-circle"/>
                }
            </div>
            <div className="w-100">
                <Link to={`/tuit/${tuit._id}`}>
                    <i className="float-end tuit-button fas fa-circle-ellipsis me-1"/>
                </Link>
                <h2
                    className="fs-5">
                    {tuit.postedBy && tuit.postedBy.username}
                    @{tuit.postedBy && tuit.postedBy.username} -<span className="ms-1">{daysOld(tuit)}</span> </h2>
                {tuit.tuit}
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
            </div>
        </li>
    )
}

export default EditableTuit