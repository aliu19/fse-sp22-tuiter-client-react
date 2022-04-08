/**
 * @file Implements tests for edit-profile screen
 */
import React from "react";
import EditProfile from "../components/profile/edit-profile";
import alice from "../components/profile/alice-data.json"
import {api, profile} from "../services/auth-service";
import {render, screen, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

/**
 * Test that if edit-profile component can render user's profile information correctly
 * with mocked profile
 */
describe("renders user's profile information mocked correctly", () => {
    const mock = jest.spyOn(api, 'post');
    const mockedProfile = alice;
    afterAll(() => {
        mock.mockRestore()
    })

    test("renders user's profile information mocked correctly", async () => {
        mock.mockImplementation(() => {
            return Promise.resolve({data: mockedProfile});
        })

        render(
            <HashRouter>
                <EditProfile/>
            </HashRouter>
        )

        await waitFor(() => {
            for (const key in mockedProfile) {
                if (key === "_id") {
                    return;
                }
                const profileAttribute = mockedProfile[key];
                const profileElement = screen.getByDisplayValue(profileAttribute);
                expect(profileElement).toBeInTheDocument();
            }
        })
    })
})