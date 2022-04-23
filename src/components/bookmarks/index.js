/**
 * @file Implements Bookmarks Component for displaying all tuits that user bookmarked
 */
import React, {useEffect, useState} from "react";
import Tuits from "../tuits";
import tuits from "./tuits-data-with-bookmark.json"

/**
 * Implements Bookmarks Component for displaying all tuits that user bookmarked
 * This page will require user to be logged in
 */
function Bookmarks() {
    const [bookmarkedTuits, setBookmarkedTuits] = useState([])

    useEffect( () => {
        // replace with fetch call for finding all bookmarked tuits
        findTuitsIBookmark()
    })

    /**
     * Fetch all tuits that bookmarked by user
     */
    const findTuitsIBookmark = () => {
        setBookmarkedTuits(tuits)
    }

    return (
        <div>
            <h1>Bookmarks Screen</h1>
            <Tuits tuits={bookmarkedTuits} refreshTuits={findTuitsIBookmark}/>
        </div>
    );
}

export default Bookmarks;