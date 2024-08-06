/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Home from "../app/page"

const mockRouter = {
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
}

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => mockRouter),
    usePathname: jest.fn(() => '/'),
    useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("Home", () => {
    it("renders login", () => {
        render(<Home />)

        expect(screen.getByTestId("username")).toBeInTheDocument()
        expect(screen.getByTestId("password")).toBeInTheDocument()
        expect(screen.getByTestId("login-btn")).toBeInTheDocument()
    })

    it("should not submit form", async () => {
        const mockOnSubmit = jest.fn()

        render(<Home handleOutsideSubmit={mockOnSubmit} />)

        fireEvent.submit(screen.getByRole("button", { name: "Login" }))

        await waitFor(() => {
            expect(mockOnSubmit).not.toHaveBeenCalled()
        })
    })

    it("should submit form", async () => {
        const mockOnSubmit = jest.fn()

        render(<Home handleOutsideSubmit={mockOnSubmit} />)
        fireEvent.change(screen.getByTestId("username"), {
            target: {
                value: "emilys",
            },
        })

        fireEvent.change(screen.getByTestId("password"), {
            target: {
                value: "emilyspass",
            },
        })

        fireEvent.click(screen.getByRole("button", { name: /login/i }))

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                username: "emilys",
                password: "emilyspass",
            })
        })
    })
})
