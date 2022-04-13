import React, {useState} from "react";
import EditableTuits from "./editable-tuits";

const SearchTuits = () => {
    const [searchTuit, setSearchTuit] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchTuits = () => {

    }

    return (
        <div>
            <h2>Search Tuits</h2>
            <div className="row">
                <div className="col-9">
                    <input value={searchTuit}
                           onChange={(event) => {
                               setSearchTuit(event.target.value)
                           }}
                           className="form-control"
                           placeholder="Please search Tuit contents"/>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary btn-block">
                        Search
                    </button>
                </div>
            </div>
            <br/>
            {
                !searchResults.length
                &&
                <h2>No Results</h2>
            }
            {
                searchResults.length > 0
                &&
                <EditableTuits tuits={searchResults}/>
            }
        </div>
    )
}

export default SearchTuits