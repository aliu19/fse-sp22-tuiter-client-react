import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {useParams} from "react-router-dom";
import Tuit from "./tuit";

const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const {tid} = useParams();
    const findTuitById = () =>
        service.findTuitById(tid)
            .then(tuit => {
                setTuit(tuit)
            });
    useEffect(() => {
        findTuitById();
    }, []);

    return(
        <div>
            <div className="mb-3">
            {console.log('tuit-screen',tuit)}
            <Tuit tuit={tuit} likeTuit={() => {}}/>
        </div>
            <button type="button" className="btn btn-primary me-2">
                Update
            </button>
        </div>
    );
};
export default TuitScreen;