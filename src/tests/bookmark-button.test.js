/**
 * @file Implements UI test for bookmark button that is
 * used to toggle bookmark of a tuit
 */
import React from "react";
import {act, create} from "react-test-renderer";
import TuitStats from "../components/tuits/tuit-stats";

/**
 * A Mocked Tuit with stats and dislikes count
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
 * Unit Test to check if user can bookmark a tuit if they didn't bookmark
 * such tuit before
 */
describe("Click bookmark button to bookmark a tuit if they didn't bookmark the tuit before", () => {
    let tuit = {...MOCKED_TUIT}

    const bookmarkTuit = () => {
        tuit = {...tuit, bookmarkedByMe: true}
        tuitStats.update(
            <TuitStats
                tuit={tuit}
                bookmarkTuit={()=>{}}>
            </TuitStats>
        )
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                bookmarkTuit={bookmarkTuit}
                tuit={tuit}/>
        );
    })

    test("test static tuit is bookmarked", () => {

        const root = tuitStats.root;
        const bookmarkTuitButton = root.findByProps({className: 'ttr-bookmark-tuit-click'})

        expect(tuit.bookmarkedByMe).toBe(undefined)

        act(() => {bookmarkTuitButton.props.onClick()})
        expect(tuit.bookmarkedByMe).toBe(true);
    })
})

/**
 * Unit Test to check if user can un-bookmark a tuit if they bookmarked before
 * such tuit before
 */
describe("Click bookmark button again to un-bookmark a tuit if "
         + "they bookmarked the tuit before", () => {
    let tuit = {...MOCKED_TUIT, bookmarkedByMe: true}

    const bookmarkTuit = () => {
        tuit = {...tuit, bookmarkedByMe: false}
        tuitStats.update(
            <TuitStats
                tuit={tuit}
                bookmarkTuit={()=>{}}>
            </TuitStats>
        )
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                bookmarkTuit={bookmarkTuit}
                tuit={tuit}/>
        );
    })

    test("test static tuit is un-bookmarked", () => {

        const root = tuitStats.root;
        const bookmarkTuitButton = root.findByProps({className: 'ttr-bookmark-tuit-click'})

        expect(tuit.bookmarkedByMe).toBe(true)

        act(() => {bookmarkTuitButton.props.onClick()})
        expect(tuit.bookmarkedByMe).toBe(false);
    })
})