"use client";
import { useState } from "react";
import { addInput, isOperator, doubleOperator, equals } from "./logic";

export default function Home() {
  const appName = "Calcu";
  const buttons = [
    "7","8","9","X",
    "4","5","6","/",
    "1","2","3","*",
    "C","0",".","-",
  ];

  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"typing" | "result">("typing");

  const handleClick = (value: string) => {
    if (value === "X") {
      if (mode === "result") {
        setDisplay("0");
        setMode("typing");
        return;
      } else {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      setMode("typing");
      return;
      }
    }

    if (value === "C") {
      setDisplay("0");
      setMode("typing");
      return;
    }

    if (mode === "result") {
      setDisplay(isOperator(value) ? (prev) => prev + value : value);
      setMode("typing");
      return;
    }

    if (doubleOperator(value, display)) return;

    if (value === "=") {
      const result = equals(display);
      setHistory((prev) => [`${display} = ${result}`, ...prev].slice(0, 7));
      setDisplay(result);
      setMode("result");
      return;
    }

    if (display === "Error") {
      setDisplay(value);
      setMode("typing");
      return;
    }

    setDisplay((prev) => addInput(prev, value));
  };

  const getButtonClass = (btn: string) => {
    if (btn === "C" || btn === "X") return "calc-btn btn-clear";
    if (["+", "-", "*", "/"].includes(btn)) return "calc-btn btn-operator";
    return "calc-btn btn-number";
  };

  return (
    <>
      {/* Sky background */}
      <div className="sky-bg">
        <div className="stars" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="particle" />
      ))}

      {/* Main content */}
      <div className="main-container">
        <div className="ambient-glow" />

        <div className="side-by-side">
          <div className="calculator-wrapper">
            <div className="calculator">
              <div className="app-name">{appName}</div>

              <div className="display-section">
                <div className="display">{display}</div>
              </div>

              <div className="button-grid">
                {buttons.map((btn) => (
                  <button
                    key={btn}
                    className={getButtonClass(btn)}
                    onClick={() => handleClick(btn)}
                  >
                    {btn}
                  </button>
                ))}
                <button
                  className="calc-btn btn-equals btn-bottom"
                  onClick={() => handleClick("=")}
                >
                  =
                </button>
                <button
                  className="calc-btn btn-operator btn-bottom"
                  onClick={() => handleClick("+")}
                >
                  +
                </button>
              </div>
            </div>

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
                {history.map((entry, i) => (
                  <li key={i} className="history-item">
                    {entry}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
