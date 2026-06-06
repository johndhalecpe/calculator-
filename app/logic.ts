export function addInput(prev: string, input: string): string {
  //replace the default "0" with the first input
  if (prev === "0") {
    return input;
  }
  return prev + input;
}
export function isOperator(value: string): boolean {
  return ["+", "-", "*", "/", "=", "C"].includes(value);
}

export function doubleOperator(value: string, prev: string): boolean {
  const lastChar = prev.slice(-1);
  if (isOperator(value) && isOperator(lastChar)) {
    return true;
  }
  return false;
}

export function equals(value: string): string {
  try {
    const result = eval(value);
    return String(result);
  } catch {
    return "Error";
  }
}
