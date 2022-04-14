/**
 * @file Implement editable tuit component that display each
 * individual tuit and enables admins to manage the tuit.
 */
import React, {useState} from "react";

/**
 * Implements editable tuit component that display each tuit
 * and enables admins to edit/delete the tuit.
 */
const EditableTuit = ({tuit}) => {
    const [tuitCache, setTuitCache] = useState(tuit);
    const [editing, setEditing] = useState(false);
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis / 1000.0;
        const minutesOld = secondsOld / 60.0;
        const hoursOld = minutesOld / 60.0;
        const daysOld = hoursOld / 24.0;
        if (daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if (hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if (minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if (secondsOld > 1) {
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
                {
                    !editing &&
                    <i className='float-end fa fa-pen edit-button'
                       onClick={() => {
                           setEditing(true)
                       }}/>
                }
                {
                    editing &&
                    <div className='up-del-buttons'>
                        <i onClick={() => {
                            setEditing(false)
                        }}
                           className="float-end fa fa-check save-button"/>
                        <i
                            onClick={() => {
                            }}
                            className="float-end fa fa-trash me-1 trash-button"/>
                    </div>
                }
                <h2
                    className="fs-5">
                    {tuit.postedBy && tuit.postedBy.username}
                    @{tuit.postedBy && tuit.postedBy.username} -<span className="ms-1">{daysOld(
                    tuit)}</span></h2>
                {
                    !editing &&
                    tuit.tuit
                }
                {
                    editing &&
                    <textarea value={tuitCache.tuit}
                           onChange={(e) => {
                               setTuitCache({...tuitCache, tuit: e.target.value})
                           }}
                           className="form-control mb-3"/>
                }
            </div>
        </li>
    )
}

export default EditableTuit