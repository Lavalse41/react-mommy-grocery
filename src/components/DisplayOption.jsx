function displayOption({ displayOption, setDisplayOption }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        className={`display-btn ${
          displayOption === "card" && "selected-display"
        }`}
        onClick={() => setDisplayOption("card")}
      >
        <svg
          fill={displayOption === "card" ? "#ffffff" : "#8d9aed"}
          width="28px"
          height="25px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1z" />
        </svg>
      </button>
      <button
        className={`display-btn ${
          displayOption === "list" && "selected-display"
        }`}
        onClick={() => setDisplayOption("list")}
      >
        <svg
          width="28px"
          height="25px"
          viewBox="0 0 24 24"
          fill=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z"
            stroke={displayOption === "list" ? "#ffffff" : "#8d9aed"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default displayOption;
