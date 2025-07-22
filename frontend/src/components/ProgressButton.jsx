export default function ProgressButton({
  isLoading = false,
  children,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-full py-2 rounded text-white font-medium flex items-center justify-center transition 
        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} 
        ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          로딩 중...
        </span>
      ) : (
        children
      )}
    </button>
  );
}