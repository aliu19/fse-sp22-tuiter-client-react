import React, {useEffect, useState} from "react";
import Tuits from "../tuits";
import tuits from "./tuits-data-with-bookmark.json"

function Bookmarks() {
    const [bookmarkedTuits, setBookmarkedTuits] = useState([])

    useEffect( () => {
        // replace with fetch call for finding all bookmarked tuits
        findTuitsIBookmark()
    })

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