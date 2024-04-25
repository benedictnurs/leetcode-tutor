const someJSCodeExample = `
function factorial(n) {
  if (n === 0) {
      return 1;
  } else {
      return n * factorial(n - 1);
  }
}

var number = 5;
console.log("Factorial of", number, "is", factorial(number));

`;

const somePythonCodeExample = `
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

number = 5
print("Factorial of", number, "is", factorial(number))
`;

const someCPPCodeExample = `
#include <iostream>

// Function to calculate factorial
int factorial(int n) {
    if (n == 0 || n == 1)
        return 1;
    else
        return n * factorial(n - 1);
}

int main() {
    int number = 5;
    std::cout << "Factorial of " << number << " is " << factorial(number) << std::endl;
    return 0;
}

`;

const files = {
  "main.python": {
    name: "style.py",
    language: "python",
    language_id: "71", // Language ID for Python
    value: somePythonCodeExample,
  },
  "main.javascript": {
    name: "script.js",
    language: "javascript",
    language_id: "javascript", // Language ID for JavaScript
    value: someJSCodeExample,
  },
};

export default files;
