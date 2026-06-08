"use client";
import { useState } from "react";
import { addInput, isOperator, doubleOperator, equals } from "./logic";

export default function Home() {
  const appName = "CALCULATOR NOIR";
  const buttons = [
    "7","8","9","X",
    "4","5","6","/",
    "1","2","3","*",
    "C","0",".","-",
  ];

  const [display, setDisplay] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"typing" | "result">("typing");

  const handleClick = (value: string ) => {
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
      //added non input if errors
      if (mode === "result" && display ==="Error"){
        setDisplay("0");
        setMode("typing");
        return;
      }
      setMode("typing");
      return;
    }
    if (doubleOperator(value, display)) 
      return;
    
    
    setDisplay((prev) => addInput(prev, value));
    if (value === "=") {
      const result = equals(display);
      setDisplay(String(result));
      if (result === "Error" || result === "NaN") {
        setDisplay(result);
        setMode("result");
        return;
      };
      setHistory((prev) => [`${display} = ${result}`, ...prev].slice(0, 7));
      setMode("result");
      return;
    }
  };

  const getButtonClass = (btn: string) => {
    if (btn === "C" || btn === "X") return "calc-btn btn-clear";
    if (["+", "-", "*", "/"].includes(btn)) return "calc-btn btn-operator";
    return "calc-btn btn-number";
  };

  return (
    <>
      <div className="main-container">
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
