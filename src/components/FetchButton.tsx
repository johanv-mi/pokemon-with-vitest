interface FetchButtonProps {
  onClick: () => void;
  loading: boolean;
}

function FetchButton({ onClick, loading }: FetchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black text-2xl uppercase tracking-wider py-6 px-8 border-8 border-black transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 transition-transform duration-75"
    >
      {loading ? "CATCHING..." : "WHO'S THAT POKÈMON?"}
    </button>
  );
}

export default FetchButton;
