/**
 * @file Implements tests for editable tuit component
 */
import React from "react";
import EditableTuit from "../components/admin/tuits-manager/editable-tuit";
import {HashRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";

/**
 * Mock a tuit
 */
const MOCKED_TUIT = {
    tuit: "Sample Tuit",
    postedBy: {
        username: "Alice",
        password: "alice123",
        email: "alice@weyland.com",
        _id: "123"
    },
    stats: {likes: 125, replies: 235, retuits: 345, dislikes: 555},
    likedByMe: true,
    _id: "12"
}

/**
 * This test makes sure that EditableTuit can render correct tuit data
 * with edit-button
 */
test("render tuit content mocked and edit button", ()=> {
    render(
        <HashRouter>
            <EditableTuit tuit={MOCKED_TUIT}/>
        </HashRouter>
    )

    const editButton = screen.getByTestId('edit-button', {exact: false})
    expect(editButton).toBeInTheDocument();
    const tuitElement = screen.getByText(MOCKED_TUIT.tuit, {exact: false})
    expect(tuitElement).toBeInTheDocument();
})