/**
 * @file Implement Tuit component for displaying each tuit
 */
import React, {useEffect, useState} from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import {Link} from "react-router-dom";

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit, updateTuit, bookmarkTuit}) => {
    const [tuitCache, setTuitCache] = useState(tuit);
    const [editing, setEditing] = useState(false);
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
                         className="ttr-tuit-avatar-logo rounded-circle"/>
                }
            </div>
            <div className="w-100">
                {/* { tuit.ownedByMe === true &&
                    <i onClick={() => deleteTuit(tuit._id)}
                       className="fas fa-remove tuit-button fa-2x fa-pull-right"/>
                }
                {console.log(tuit)} */}
                {
                    tuit.ownedByMe && !editing &&
                    <i data-testid='edit-button'
                       className='float-end fa fa-pen edit-button'
                       onClick={() => {
                           setEditing(true)
                       }}/>
                }
                {
                    editing &&
                    <div className='up-del-buttons'>
                        <i onClick={() => {
                            setEditing(false)
                            updateTuit(tuitCache) 
                        }}
                           className="float-end fa fa-check save-button"/>
                        <i
                            onClick={() => {
                                deleteTuit(tuit._id)
                            }}
                            className="float-end fa fa-trash me-1 trash-button"/>
                    </div>
                }
                <Link to={`/tuit/${tuit._id}`}>
                    <i className="float-end tuit-button fas fa-circle-ellipsis me-1"/>
                </Link>
                <h2
                    className="fs-5">
                    {!tuit.ownedByMe && tuit.postedBy && 
                    <Link to={`/other-profile/${tuit.postedBy._id}/othertuits`}>
                        {tuit.postedBy.username}
                    </Link>
                    }
                    {tuit.ownedByMe && tuit.postedBy && 
                    tuit.postedBy.username
                    }
                    @{tuit.postedBy && tuit.postedBy.username} -<span className="ms-1">{daysOld(tuit)}</span> </h2>
                {
                    !editing &&
                    tuitCache.tuit
                }
                {
                    editing &&
                    <textarea value={tuitCache.tuit}
                           onChange={(e) => {
                               setTuitCache({...tuitCache, tuit: e.target.value})
                           }}
                           className="form-control mb-3"/>
                }
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
                <TuitStats tuit={tuit}
                           dislikeTuit={dislikeTuit}
                           bookmarkTuit={bookmarkTuit}
                           likeTuit={likeTuit}/>
            </div>
        </li>
    );
}
export default Tuit;