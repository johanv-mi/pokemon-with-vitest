import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PokemonCard from "./PokemonCard";

describe("PokemonCard", () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<PokemonCard />);

    expect(screen.getByText("POKÉMON GENERATOR")).toBeInTheDocument();
    expect(
      screen.getByText("CLICK BUTTON BELOW TO FETCH FIRST POKÉMON!")
    ).toBeInTheDocument();
  });

  it("shows loading state when fetching pokemon", async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<PokemonCard />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("CATCHING POKÉMON...")).toBeInTheDocument();
  });

  it("displays pokemon data after successful fetch", async () => {
    const mockPokemonData = {
      name: "pikachu",
      sprites: {
        front_default: "https://example.com/pikachu.png",
        other: {
          "official-artwork": {
            front_default: "https://example.com/pikachu-artwork.png",
          },
        },
      },
      types: [{ type: { name: "electric" } }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonData,
    });

    render(<PokemonCard />);

    const button = screen.getByText("WHO'S THAT POKÈMON?");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });

    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toBeInTheDocument();
  });

  it("displays error when API responds with ok=false", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(<PokemonCard />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("ERROR!")).toBeInTheDocument();
    });

    expect(screen.getByText("Failed to fetch Pokémon")).toBeInTheDocument();
  });

  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch Pokémon"));

    render(<PokemonCard />);

    const button = screen.getByText("WHO'S THAT POKÈMON?");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("ERROR!")).toBeInTheDocument();
    });
  });

  it("disables the button while loading", async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<PokemonCard />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("falls back to default sprite if official artwork is missing", async () => {
    const mockPokemonData = {
      name: "bulbasaur",
      sprites: {
        front_default: "https://example.com/bulbasaur.png",
        other: {},
      },
      types: [{ type: { name: "grass" } }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonData,
    });

    render(<PokemonCard />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByAltText("bulbasaur")).toHaveAttribute(
        "src",
        "https://example.com/bulbasaur.png"
      );
    });
  });
});
