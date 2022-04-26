import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {useParams} from "react-router-dom";
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service"
import * as authService from "../../services/auth-service";


const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const [editing, setEditing] = useState(false);
    const {tid} = useParams();

    const [profile, setProfile] = useState(undefined);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    const findTuitById = () =>
        service.findTuitById(tid)
            .then(tuit => {
                setTuit(tuit)
            });

    const updateTuit = (newTuit) => {
        console.log('update tuit', newTuit)
        service.updateTuit(newTuit._id,newTuit)
        }

    /**
     * Callback function to fetch API to toggle likes of a tuit
     * when user clicks like button
     * @param tuit Tuit that was liked
     */
     const likeTuit = (tuit) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(findTuitById())
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    /**
     * Callback function to fetch API to toggle dislikes of a tuit
     * when user clicks dislike button
     * @param tuit Tuit that was disliked
     */
    const dislikeTuit = (tuit) => {
        if (profile !== undefined) {
            dislikeService.userTogglesTuitDislikes("me", tuit._id)
                .then(findTuitById())
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    useEffect(() => {
        findTuitById();
    }, []);

    return(
        <div>
            <div className="mb-3">
            {console.log('tuit-screen',tuit)}
            <Tuit 
            likeTuit={likeTuit}
            dislikeTuit={dislikeTuit}
            tuit={tuit}/>
        </div>
            {tuit.ownedByMe && !editing &&
                <button type="button" 
                        className="btn btn-primary me-2"
                        onClick={() => {
                            setEditing(true)
                        }}>
                Update
            </button>
            }
            {
                editing &&
                <button type="button" 
                        className="btn btn-success me-2"
                        onClick={() => {
                            setEditing(false)
                            updateTuit(tuitCache) 
                        }}></button>
            }
        </div>
    );
};
export default TuitScreen;