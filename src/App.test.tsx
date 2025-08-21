import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";

describe("App flow", () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("renders headline from PokemonCard", () => {
    render(<App />);
    const headline = screen.getByText("POKÉMON GENERATOR");
    expect(headline).toBeInTheDocument();
  });

  it("clicks the button and shows a pokemon", async () => {
    const mockPokemon = {
      name: "charmander",
      sprites: {
        front_default: "https://example.com/charmander.png",
        other: {
          "official-artwork": {
            front_default: "https://example.com/charmander-art.png",
          },
        },
      },
      types: [{ type: { name: "fire" } }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    }),
      render(<App />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("CATCHING POKÉMON...")).toBeInTheDocument();
  });
});
