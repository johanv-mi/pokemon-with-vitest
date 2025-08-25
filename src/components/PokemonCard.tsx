import { useState } from "react";

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
}

function FetchButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white border-4 border-black p-3 sm:p-4 lg:p-6 font-black uppercase text-sm sm:text-lg lg:text-xl tracking-wider transition-colors"
    >
      {loading ? "CATCHING..." : "WHO'S THAT POKÈMON?"}
    </button>
  );
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
    <div className="min-h-screen bg-yellow-400 p-4 sm:p-6 lg:p-8">
      <div className="max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
        <div className="bg-black text-white border-2 sm:border-4 border-black p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-lg sm:text-2xl lg:text-4xl font-black uppercase tracking-wider text-center">
            POKÉMON GENERATOR
          </h1>
        </div>

        <div className="bg-white border-4 sm:border-6 lg:border-8 border-black p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="min-h-64 sm:min-h-80 lg:min-h-96 flex flex-col items-center justify-center">
            {loading && (
              <div className="text-center">
                <div className="bg-black text-white border-2 sm:border-4 border-black p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4">
                  <p className="text-sm sm:text-lg lg:text-2xl font-black uppercase">
                    CATCHING POKÉMON...
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-black mx-auto animate-pulse"></div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <div className="bg-red-500 text-white border-2 sm:border-4 border-black p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4">
                  <p className="text-sm sm:text-lg lg:text-2xl font-black uppercase">
                    ERROR!
                  </p>
                  <p className="text-xs sm:text-sm lg:text-lg font-bold">
                    {error}
                  </p>
                </div>
                <div className="bg-gray-300 border-2 sm:border-4 border-black p-2 sm:p-3 lg:p-4">
                  <p className="font-black uppercase text-xs sm:text-sm lg:text-base">
                    Try again!
                  </p>
                </div>
              </div>
            )}

            {pokemon && !loading && (
              <div className="text-center w-full">
                <div className="bg-gray-100 border-4 sm:border-6 border-black p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
                  <img
                    src={
                      pokemon.sprites.other?.["official-artwork"]
                        ?.front_default || pokemon.sprites.front_default
                    }
                    alt={pokemon.name}
                    className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto object-contain border-2 sm:border-4 border-black"
                  />
                </div>

                <div className="bg-black text-white border-2 sm:border-4 border-black p-2 sm:p-3 lg:p-4 mb-3 sm:mb-4 lg:mb-6">
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-widest">
                    {pokemon.name}
                  </h2>
                </div>

                <div className="bg-purple-300 border-2 sm:border-4 border-black p-2 sm:p-3 lg:p-4">
                  <p className="font-black uppercase text-xs sm:text-sm">
                    TYPE
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg font-black uppercase">
                    {pokemon.types.map((type) => type.type.name).join(", ")}
                  </p>
                </div>
              </div>
            )}

            {!pokemon && !loading && !error && (
              <div className="text-center">
                <div className="bg-gray-300 border-4 sm:border-6 border-black p-4 sm:p-6 lg:p-8">
                  <p className="text-sm sm:text-lg lg:text-2xl font-black uppercase tracking-wide">
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
