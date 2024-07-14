import { render, screen } from "@testing-library/react"
import MainComponent from "../components/MainComponent";
import { MemoryRouter } from "react-router";

describe('api calls', async () => {
  it("api success scenario on load", async () => {
    render(<MemoryRouter><MainComponent /></MemoryRouter>)
    expect(await screen.findByText("Pokemons are here")).toBeInTheDocument();
  })
})
describe('api calls', async () => {
  it("loader when api under calling", async () => {
    render(<MemoryRouter><MainComponent /></MemoryRouter>)
    expect(await screen.findByText("Loading ... -_-")).toBeInTheDocument();
  })
})