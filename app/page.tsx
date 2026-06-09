"use client";
import { useState } from "react";
import { addInput, isOperator, doubleOperator, equals } from "./logic";

export default function Home() {
  const appName = "CALCULATOR NOIR";
  const buttons = [
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "/",
    "1",
    "2",
    "3",
    "*",
    "C",
    "0",
    ".",
    "-",
  ];

  const [display, setDisplay] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"typing" | "result">("typing");

  const handleClick = (whichButtonisClicked: string) => {
    const eraseButton = () => {
      if (mode === "result") {
        setDisplay("0");
        setMode("typing");
        return;
      } else {
        setDisplay((previousDisplayedValue) =>
          previousDisplayedValue.length > 1
            ? previousDisplayedValue.slice(0, -1)
            : "0",
        );
        setMode("typing");
        return;
      }
    };
    const clearButton = () => {
      setDisplay("0");
      setMode("typing");
      return;
    };
    const resultEventHandler = () => {
      // handle error state first
      if (display === "Error") {
        setDisplay("0");
        setMode("typing");
        return;
      }
      setDisplay(
        isOperator(whichButtonisClicked)
          ? (previousDisplayedValue) =>
              previousDisplayedValue + whichButtonisClicked
          : whichButtonisClicked,
      );
      setMode("typing");
    };
    const doubleOperatorChecker = () => {
      if (doubleOperator(whichButtonisClicked, display)) return;
      setDisplay((initialDisplayValue) =>
        addInput(initialDisplayValue, whichButtonisClicked),
      );
    };
    const equal_Solving = () => {
      const result = equals(display);
      setDisplay(String(result));
      if (result === "Error") {
        setDisplay(result);
        setMode("result");
        return;
      }
      setHistory((initialDisplayValue) => {
        const newEntry = `${display} = ${result}`;
        if (Number(display) === Number(result)) {
          return initialDisplayValue;
        }
        if (initialDisplayValue[0] === newEntry) {
          return initialDisplayValue;
        }
        return [newEntry, ...initialDisplayValue].slice(0, 7);
      });
      setMode("result");
      return;
    };
    const autoDecimal = (whichButtonisClicked: string, display: string) => {
      if (whichButtonisClicked !== ".") return whichButtonisClicked;
      const lastNumber = display.split(/[\+\-\*\/]/).pop();
      if (lastNumber?.includes(".")) {
        return "";
      }
      if (display === "" || /[\+\-\*\/]$/.test(display)) {
        return "0.";
      }
      return ".";
    };
    if (whichButtonisClicked === "X") {
      eraseButton();
      return;
    }
    if (whichButtonisClicked === "C") {
      clearButton();
      return;
    }
    if (whichButtonisClicked === "=") {
      equal_Solving();
      return;
    }
    if (whichButtonisClicked === ".") {
      const fixed = autoDecimal(".", display);
      setDisplay((previousDisplayedValue) => previousDisplayedValue + fixed);
      return;
    }
    if (mode === "result") {
      resultEventHandler();
      return;
    }
    if (isOperator(whichButtonisClicked)) {
      doubleOperatorChecker();
      return;
    }
    setDisplay((previousDisplayedValue) =>
      addInput(previousDisplayedValue, whichButtonisClicked),
    );
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
