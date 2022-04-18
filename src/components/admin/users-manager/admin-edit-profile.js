import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as authService from "../../../services/auth-service";
import * as usersService from "../../../services/users-service";

const AdminEditProfile = () => {
    const {uid} = useParams()
    const [admin, setAdmin] = useState({});
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    useEffect(async () => {
        try {
            const logAsAdmin = await authService.profile();
            if (logAsAdmin.role !== 'ADMIN') {
                alert("Must logged in as an admin user.")
                navigate('/login')
            }
            setAdmin(logAsAdmin)
            const findUserProfile = await usersService.findUserById(uid);
            setProfile(findUserProfile);
        } catch (e) {
            alert("Must logged in as an admin user.")
            navigate('/login')
        }
    }, [])

    return (
        <div className='container-fluid'>
            <h2>User's profile</h2>
            {
                profile &&
                <div>
                    {profile.username}
                </div>
            }
        </div>
    )
}

export default AdminEditProfile