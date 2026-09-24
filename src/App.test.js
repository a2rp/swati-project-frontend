import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the frontend home page", async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <App />
        </MemoryRouter>,
    );

    expect(
        await screen.findByRole("heading", { name: /search smarter/i }),
    ).toBeInTheDocument();
});