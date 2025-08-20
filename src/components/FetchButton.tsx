function FetchButton(onClick: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
    >
      Who's That Pokémon?
    </button>
  );
}

export default FetchButton;
