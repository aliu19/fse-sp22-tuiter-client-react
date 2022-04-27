/**
 * @file Implements a tuit list component for only display purpose
 */
import React, {useEffect, useState} from "react";
import OtherTuit from "./other-tuit";
import {useParams} from "react-router-dom";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service"
import * as authService from "../../services/auth-service";


/**
 * Implements tuits list component that uses tuit component
 * to display each tuit.
 */
const OtherTuits = ({userTuits, refreshTuits}) => {
    const [profile, setProfile] = useState(undefined);
    // const [manageTuits, setManageTuits] = useState(userTuits);
    
    useEffect(async ()=> {
        // setManageTuits(userTuits)
        console.log('tuits', userTuits)
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    /**
     * Callback function to fetch API to toggle likes of a tuit
     * when user clicks like button
     * @param tuit Tuit that was liked
     */
     const likeTuit = (tuit) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(refreshTuits)
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
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }
    
    return (
        <ul className='list-group'>
            {
                userTuits.map(tuit => {
                    return (
                        <OtherTuit
                            key={tuit._id}
                            tuit={tuit}
                            likeTuit={likeTuit}
                            dislikeTuit={dislikeTuit}/>
                    )
                })
            }
        </ul>
    )
}

export default OtherTuits