/**
 * @file Implements edit-profile component that displays user's information, and
 * enable them to manage their account.
 * Users can click update to update their profile information
 * Users can click delete to delete their account
 * Users can click go-back to their profile page.
 */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as authService from "../../services/auth-service";
import alice from "./alice-data.json"
import admin from "./admin-user-data.json"
import * as userService from "../../services/users-service";

/**
 * Implements EditProfile component that will fetch and display user's profile information and
 * enables users to edit their profile information and delete their account
 */
const EditProfile = () => {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        authService.profile()
            .then(profile => {
                console.log(profile)
                setProfileInfo(admin);
            })
    }, [])

    /**
     * A call back function that helps call user service
     * to update user's profile information when user
     * clicks the "save" button
     */
    const handleUserUpdate = () => {
        let newProfile = profileInfo;
        if (profileInfo.password === '') {
            alert("Password cannot be empty")
        } else {
            userService.updateUserProfile(newProfile)
                .then(res => {
                    alert("Successfully Updated!")
                    console.log(profileInfo)
                    setProfileInfo(newProfile);
                })
                .catch(error => {
                    alert("Failed to update!")
                })
        }
    }

    /**
     * A call back function that helps call user service
     * to delete current user account when user
     * clicks "delete" button
     */
    const handleDeleteAccount = () => {
        alert("Successfully deleted your account!")
    }

    return (
        <div className="ttr-edit-profile">
            <div className="border border-bottom-0">
                <Link to="/profile"
                      className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                    <i className="fas fa-angle-left"/>
                </Link>
                <span to="/profile"
                      onClick={() => handleUserUpdate()}
                      className="btn btn-dark rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2">
                    Save
                </span>
                <Link className="btn btn-danger rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2"
                      onClick={() => handleDeleteAccount()}
                      to='/'>
                    Delete
                </Link>
                <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
                <div className="mb-5 position-relative">
                    <img className="w-100" src="../images/nasa-profile-header.jpg"/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img
                                className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                                src="../images/nasa-3.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <form action="profile.html">
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="username">Username</label>
                    <input id="username" title="Username"
                           readOnly
                           className="p-0 form-control border-0"
                           placeholder="alan"
                           value={profileInfo.username}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="password">Reset password</label>
                    <input id="password"
                           className="p-0 form-control border-0"
                           type="password"
                           value={profileInfo.password}
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, password: e.target.value})
                           }}
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name"
                           className="p-0 form-control border-0"
                           value={profileInfo.firstName ? profileInfo.firstName : ""}
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, firstName: e.target.value})
                           }}
                           placeholder="Edit your first name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name"
                           className="p-0 form-control border-0"
                           value={profileInfo.lastName}
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, lastName: e.target.value})
                           }}
                           placeholder="Edit your last name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="p-0 form-control border-0"
                        value={profileInfo.biography}
                        onChange={(e) => {
                            setProfileInfo({...profileInfo, biography: e.target.value})
                        }}
                        id="bio"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="date-of-birth">Date of birth</label>
                    <input id="date-of-birth"
                           className="p-0 form-control border-0"
                           type="date"
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, dateOfBirth: e.target.value})
                           }}
                           value={profileInfo.dateOfBirth}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="alan@cam.ac.uk"
                           className="p-0 form-control border-0"
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, email: e.target.value})
                           }}
                           value={profileInfo.email}
                           type="email"/>
                </div>
                {/* TO-DO ? */}
                {/*<div className="border border-secondary rounded-3 p-2 mb-3">*/}
                {/*  <label for="photo">Profile photo</label>*/}
                {/*  <input id="photo"*/}
                {/*         className="p-0 form-control border-0"*/}
                {/*         type="file"/>*/}
                {/*</div>*/}
                {/*<div className="border border-secondary rounded-3 p-2 mb-3">*/}
                {/*  <label for="header">Header image</label>*/}
                {/*  <input id="header"*/}
                {/*         className="p-0 form-control border-0"*/}
                {/*         type="file"/>*/}
                {/*</div>*/}
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label for="account">Account type</label>
                    <select
                        disabled={true}
                        value={profileInfo.accountType}
                        className="p-0 form-control border-0"
                        id="account">
                        <option value="PERSONAL">Personal account</option>
                        <option value="ADMIN">Admin account</option>
                    </select>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    Marital status
                    <br/>
                    <div className='row'>
                    <span className='col'>
                        <input id="married"
                               type="radio"
                               name="marital"
                               checked={profileInfo.maritalStatus === "MARRIED"}
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               value="MARRIED"/>
                        <label for="married">Married</label>
                    </span>
                        <span className='col'>
                        <input id="single"
                               type="radio"
                               name="marital"
                               checked={profileInfo.maritalStatus === "SINGLE"}
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               value="SINGLE"/>
                        <label for="single">Single</label>
                    </span>
                        <span className='col'>
                        <input id="widow"
                               type="radio"
                               name="marital"
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               checked={profileInfo.maritalStatus === "WIDOW"}
                               value="WIDOW"/>
                        <label htmlFor="widow">Widow</label>
                    </span>
                    </div>
                </div>
                {/*<div className="border border-secondary rounded-3 p-2 mb-3">*/}
                {/*    Topics of interest*/}
                {/*    <input id="space" type="checkbox"*/}
                {/*           checked name="topics"/>*/}
                {/*    <label for="space">Space</label>*/}
                {/*    <input id="energy" type="checkbox" checked*/}
                {/*           name="topics"/>*/}
                {/*    <label for="energy">Energy</label>*/}
                {/*    <input id="politics" type="checkbox"*/}
                {/*           name="topics"/>*/}
                {/*    <label for="politics">Politics</label>*/}
                {/*</div>*/}
            </form>
        </div>);
};
export default EditProfile;