import { useState } from "react";
import FetchButton from "./FetchButton";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

function PokemonCard() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }

      const pokemonData = await response.json();
      setPokemon(pokemonData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Random Pokémon Generator
        </h1>

        {pokemon && !loading && (
          <div className="text-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 mx-auto mb-4 object-contain"
            />
            <h2 className="text-2xl font-bold capitalize mb-2 text-gray-800">
              {pokemon.name}
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Type(s):</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
      <FetchButton onClick={fetchRandomPokemon} loading={loading} />
    </div>
  );
}

export default PokemonCard;
