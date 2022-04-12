import React, {useState} from "react";

const SearchUsers = () => {
    const [searchName, setSearchName] = useState("");
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
                           placeholder="please search User's username"/>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary btn-block">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchUsers