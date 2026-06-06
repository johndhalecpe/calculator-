"use client";
import { useState } from "react";
import { addInput, isOperator, doubleOperator, equals } from "./logic";

export default function Home() {
  const appName: string = "Calcu";
  const buttons: string[] = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "C", "0", ".", "+",
  ];
  const [display, setDisplay] = useState("0");
  const erase: string = "X";
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"typing" | "result">("typing");

  const handleClick = (value: string) => {
    if (mode === "result" && !isOperator(value)) {
      setDisplay(value);
      setMode("typing");
      return;
    } else if (mode === "result" && isOperator(value)) {
      setDisplay((prev) => prev + value);
      setMode("typing");
      return;
    }

    if (value === "C") {
      setDisplay("0");
      setMode("typing");
      return;
    }
    if (isOperator(value)) {
      value = value;
    }
    if (doubleOperator(value, display)) {
      return display;
    }
    if (value === "=") {
      const result = equals(display);
      setDisplay(result);
      setMode("result");
      setHistory((prev) => [`${display} = ${result}`, ...prev].slice(0, 5));
      value = result;
      return value;
    }
    if (display === "Error") {
      setDisplay(value);
      setMode("typing");
      return;
    }
    setDisplay((prevDisplay) => addInput(prevDisplay, value));
  };

  const getButtonClass = (btn: string) => {
    if (btn === "C") return "calc-btn btn-clear";
    if (["+", "-", "*", "/", "="].includes(btn)) return "calc-btn btn-operator";
    return "calc-btn btn-number";
  };

  return (
    <>
      {/* Sky background with stars and clouds */}
      <div className="sky-bg">
        <div className="stars" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
      </div>

      {/* Floating particles */}
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      {/* Main content */}
      <div className="main-container">
        {/* Ambient glow */}
        <div className="ambient-glow" />

        {/* Calculator wrapper with floating animation */}
        <div className="calculator-wrapper">
          {/* Calculator body */}
          <div className="calculator">
            {/* App name */}
            <div className="app-name">{appName}</div>

            {/* Display section */}
            <div className="display-section">
              <div className="display">{display}</div>
              <button
                className="erase-btn"
                onClick={() => {
                  setDisplay(display.slice(0, -1) || "0");
                  if (display.length === 1) setMode("typing");
                }}
              >
                {erase}
              </button>
            </div>

            {/* Button grid */}
            <div className="button-grid">
              {buttons.map((button) => (
                <button
                  key={button}
                  className={getButtonClass(button)}
                  onClick={() => handleClick(button)}
                >
                  {button}
                </button>
              ))}
              {/* Equals button - spans full width */}
              <button
                className="calc-btn btn-equals"
                onClick={() => handleClick("=")}
              >
                =
              </button>
            </div>
          </div>

          {/* Clouds at calculator feet */}
          <div className="calc-clouds">
            <div className="calc-cloud calc-cloud-1" />
            <div className="calc-cloud calc-cloud-2" />
            <div className="calc-cloud calc-cloud-3" />
          </div>
        </div>

        {/* History panel */}
        <div className="history-section">
          <div className="history-title">History</div>
          {history.length === 0 ? (
            <div className="history-empty">No calculations yet</div>
          ) : (
            <ul className="history-list">
              {history.map((entry, index) => (
                <li key={index} className="history-item">
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
