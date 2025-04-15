const CredentialLoader = ({ status = "idle", message = "" }) => {
  const statusStates = {
    idle: {
      color: "text-gray-500",
      icon: (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ),
      text: message || "Verifying credentials...",
    },
    success: {
      color: "text-green-600",
      icon: (
        <svg
          className="h-5 w-5 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: message || "Credentials successfully verified",
    },
    error: {
      color: "text-red-600",
      icon: (
        <svg
          className="h-5 w-5 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      text: message || "Error verifying credentials",
    },
  };

  const currentState = statusStates[status] || statusStates.idle;

  return (
    <div className="flex items-center space-x-2 mt-1">
      {currentState.icon}
      <span className={`text-sm ${currentState.color}`}>
        {currentState.text}
      </span>
    </div>
  );
};

export default CredentialLoader;
