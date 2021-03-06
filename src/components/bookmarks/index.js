/**
 * @file Implements Bookmarks Component for displaying all tuits that user bookmarked
 */
import React, {useEffect, useState} from "react";
import Tuits from "../tuits";
import tuits from "./tuits-data-with-bookmark.json"
import * as bookmarkService from "../../services/bookmarks-service"
import * as service from "../../services/auth-service";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Implements Bookmarks Component for displaying all tuits that user bookmarked
 * This page will require user to be logged in
 */
function Bookmarks() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [bookmarkedTuits, setBookmarkedTuits] = useState([])

    useEffect( async () => {
        try {
            const user = await service.profile();
            setProfile(user);
            findTuitsIBookmark()
        } catch (e) {
            alert("Please login!")
            navigate('/login');
        }
        // replace with fetch call for finding all bookmarked tuits
    }, [])

    /**
     * Fetch all tuits that bookmarked by user
     */
    const findTuitsIBookmark = () => {
        bookmarkService.findAllTuitsBookmarkedByUser("me")
            .then(tuits => {
                console.log(tuits)
                setBookmarkedTuits(tuits)
            });
    }

    return (
        <div>
            <h1>My Bookmarks</h1>
            <Tuits tuits={bookmarkedTuits} refreshTuits={findTuitsIBookmark}/>
        </div>
    );
}

export default Bookmarks;