import React, {useState} from "react";
import UsersTable from "./users-table";

const SearchUsers = () => {
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchUsers = () => {

    }

    return (
        <div>
            <h2>Search users</h2>
            <div className="row">
                <div className="col-9">
                    <input value={searchName}
                           onChange={(event) => {
                               setSearchName(event.target.value)
                           }}
                           className="form-control"
                           placeholder="Please search User's username"/>
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
                <UsersTable users={searchResults}/>
            }
        </div>
    )
}

export default SearchUsers