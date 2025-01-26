import { useState } from "react";
import "./Lupa.css";

interface LupaProps {
  placeholder: string;
  onSubmit: (value: string) => void;
}

export function Lupa({ placeholder, onSubmit }: LupaProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form id="busqueda" className="form-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <div className="icon-container">
          <svg
            className="search-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="busqueda-input"
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }} />
      </div>
    </form>
  );
}
