/*Write a function calculateBmi that calculates a BMI(opens in a new tab) 
based on a given height (in centimeters) and weight (in kilograms) and 
then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print 
out the result. The code

console.log(calculateBmi(180, 74))
should print the following message:

Normal range */
type result = "Underweight" | "Normal" | "Overweight" | "Obese";

function calculateBmi(cm: number, kg: number): result{
    const finalHeight: number = cm ** 2;
    const almost: number = kg / finalHeight;
    const final: number = almost * 10000;
    if (final <= 18.4) {
        return "Underweight"
    }
    else if (final <= 24.9) {
        return "Normal";
    }
    else if (final <= 39.9) {
        return "Overweight";
    }
    else {
        return "Obese"
    }
}


console.log(calculateBmi(167, 150) + " range");