import { useState } from "react";
import FetchButton from "./FetchButton";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number;
}

function PokemonCard() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-yellow-400 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black text-white border-4 border-black p-6 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-wider text-center">
            POKÉMON GENERATOR
          </h1>
        </div>

        <div className="bg-white border-8 border-black p-8 mb-8">
          <div className="min-h-96 flex flex-col items-center justify-center">
            {loading && (
              <div className="text-center">
                <div className="bg-black text-white border-4 border-black p-6 mb-4">
                  <p className="text-2xl font-black uppercase">
                    CATCHING POKÉMON...
                  </p>
                </div>
                <div className="w-16 h-16 bg-black mx-auto animate-pulse"></div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <div className="bg-red-500 text-white border-4 border-black p-6 mb-4">
                  <p className="text-2xl font-black uppercase">ERROR!</p>
                  <p className="text-lg font-bold">{error}</p>
                </div>
                <div className="bg-gray-300 border-4 border-black p-4">
                  <p className="font-black uppercase">Try again!</p>
                </div>
              </div>
            )}

            {pokemon && !loading && (
              <div className="text-center w-full">
                <div className="bg-gray-100 border-6 border-black p-6 mb-6">
                  <img
                    src={
                      pokemon.sprites.other?.["official-artwork"]
                        ?.front_default || pokemon.sprites.front_default
                    }
                    alt={pokemon.name}
                    className="w-64 h-64 mx-auto object-contain border-4 border-black"
                  />
                </div>

                <div className="bg-black text-white border-4 border-black p-4 mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-widest">
                    {pokemon.name}
                  </h2>
                </div>

                <div className="bg-purple-300 border-4 border-black p-4">
                  <p className="font-black uppercase text-sm">TYPE</p>
                  <p className="text-lg font-black uppercase">
                    {pokemon.types.map((type) => type.type.name).join(", ")}
                  </p>
                </div>
              </div>
            )}

            {!pokemon && !loading && !error && (
              <div className="text-center">
                <div className="bg-gray-300 border-6 border-black p-8">
                  <p className="text-2xl font-black uppercase tracking-wide">
                    CLICK BUTTON BELOW TO FETCH FIRST POKÉMON!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <FetchButton onClick={fetchRandomPokemon} loading={loading} />
      </div>
    </div>
  );
}

export default PokemonCard;
