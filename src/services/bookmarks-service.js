import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

export const api = axios.create({
    withCredentials: true
})

/**
 * PUT method for un/bookmarking a tuit
 * @param uid User's primary key
 * @param tid Tuit's primary key
 * @returns {Promise<AxiosResponse<any>>} Status on whether bookmark is created or deleted
 * successfully or not
 */
export const userTogglesTuitBookmarks = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/bookmarks/${tid}`)
        .then(response => response.data)

/**
 * GET method for retrieving all tuits bookmarked by a particular user
 * @param uid User's Primary key
 * @returns {Promise<AxiosResponse<any>>} JSON array contains all tuits bookmarked by this user
 */
export const findAllTuitsBookmarkedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/bookmarks`)
        .then(response => response.data)

/**
 * GET method for retrieving all bookmarks
 * @returns {Promise<AxiosResponse<any>>} JSON array of all bookmarks
 */
export const findAllBookmarks = () =>
    api.get(`${BASE_URL}/api/bookmarks`)
      .then(response => response.data)
