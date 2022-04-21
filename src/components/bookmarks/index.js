import React, {useState} from "react";
import Tuits from "../tuits";

function Bookmarks() {
    const [bookmarkedTuits, setBookmarkedTuits] = useState([])

    return (
        <div>
            <h1>Bookmarks Screen</h1>
            <Tuits/>
        </div>
    );
}

export default Bookmarks;