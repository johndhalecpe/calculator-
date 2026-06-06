"use client";
import { useState } from "react";
import { addInput, isOperator, doubleOperator, equals } from "./logic";
export default function Home() {
  const appName: string = "Calcu";
  const buttons: string[] = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "C",
    "0",
    "+",
    "=",
  ];
  const [display, setDisplay] = useState("0");
  const erase: string = "X";
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"typing" | "result">("typing");

  const handleClick = (value: string) => {
    //mode selector
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

  return (
    <main>
      <h1>{appName}</h1>
      <div>{display}</div>
      <button onClick={() => setDisplay(display.slice(0, -1))}>{erase}</button>
      <div>
        {buttons.slice(0, 4).map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <div>
        {buttons.slice(4, 8).map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <div>
        {buttons.slice(8, 12).map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <div>
        {buttons.slice(12, 16).map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>

      <div>
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
