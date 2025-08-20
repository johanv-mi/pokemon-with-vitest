import { useState } from "react";

function PokemonCard() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Random Pokémon Generator
        </h1>

        <div className="mb-8 min-h-80 flex flex-col items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Click the button below to catch a random Pokémon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
