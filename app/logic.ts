export function addInput(prevInput: string, newInput: string): string {
  //replace the default "0" with the first input
  if (prevInput === "0") {
    return newInput;
  }
  return prevInput + newInput;
}
//checking if operator
export function isOperator(input: string): boolean {
  return ["+", "-", "*", "/", "=", "C"].includes(input);
}
//checks if the last character and the current input are both operators,
//  if so it returns true to prevent adding another operator
export function doubleOperator(input: string , prevInput: string): boolean {
  const lastChar = prevInput.slice(-1);
  if (isOperator(input) && isOperator(lastChar)) {
    return true;
  }
  return false;
}
//calculates what displays
export function equals(currentDisplay: string): number | string {
  try {
    const result = eval(currentDisplay);
    //added NaN error fix :>
     if (isNaN(result)) return "Error";
    // make result number to limit the float then make it a string again.
    return Number(parseFloat(result.toFixed(3).toString()));
  } catch {
    return "Error";
  }
}

