/**
 * @file Implements tests for my bookmarks screen
 */

import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import Bookmarks from "../components/bookmarks";
import {HashRouter} from "react-router-dom";
import MOCKED_BOOKMARKED_TUITS from "../components/bookmarks/tuits-data-with-bookmark.json"
import {api} from "../services/bookmarks-service";

describe('my bookmarks screen renders bookmarked tuit mocked', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test("my bookmarks screen renders bookmarked tuit mocked", async () => {
        mock.mockImplementation(() => {
            return  Promise.resolve({data: MOCKED_BOOKMARKED_TUITS});
        });

        render(
            <HashRouter>
                <Bookmarks/>
            </HashRouter>
        )

        await waitFor(() => {
            MOCKED_BOOKMARKED_TUITS.map(eachTuit => {
                let name = eachTuit.postedBy.username
                // substring match, ignore case, same as /alice/i
                // check if all tuits are rendered
                const nameElements =  screen.getAllByText(name, {exact: false});
                const tuitElements =  screen.getAllByText(eachTuit.tuit, {exact: false});
                nameElements.forEach(e => expect(e).toBeInTheDocument());
                tuitElements.forEach(e => expect(e).toBeInTheDocument());
            })
        })
    })
})