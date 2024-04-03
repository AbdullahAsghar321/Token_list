const fs = require('fs');

const keywords = ['if', 'else', 'while', 'for', 'int', 'float'];
const punctuators = [';', ',', '(', ')', '{', '}'];
const operators = ['+', '-', '*', '/', '=', '==', '<', '>', '<=', '>='];

function isKeyword(word) {
    return keywords.includes(word);
}

function isPunctuator(char) {
    return punctuators.includes(char);
}

function isOperator(char) {
    return operators.includes(char);
}

function isIdentifier(word) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(word);
}

function isConstant(word) {
    return /^[0-9]+(\.[0-9]+)?$/.test(word);
}

function analyzeTokens(input) {
    let tokens = [];
    let currentToken = '';
    let lineNumber = 1;

    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (char === '\n') {
            lineNumber++;
        }

        if (char === ' ' || char === '\n' || isPunctuator(char) || isOperator(char)) {
            if (currentToken) {
                if (isKeyword(currentToken)) {
                    tokens.push({ type: 'keyword', value: currentToken, line: lineNumber });
                } else if (isIdentifier(currentToken)) {
                    tokens.push({ type: 'identifier', value: currentToken, line: lineNumber });
                } else if (isConstant(currentToken)) {
                    tokens.push({ type: 'constant', value: currentToken, line: lineNumber });
                } else {
                    console.error(`Error at line ${lineNumber}: Invalid token "${currentToken}"`);
                    return;
                }
                currentToken = '';
            }

            if (isPunctuator(char)) {
                tokens.push({ type: 'punctuator', value: char, line: lineNumber });
            } else if (isOperator(char)) {
                tokens.push({ type: 'operator', value: char, line: lineNumber });
            }
        } else {
            currentToken += char;
        }
    }

    if (currentToken) {
        if (isKeyword(currentToken)) {
            tokens.push({ type: 'keyword', value: currentToken, line: lineNumber });
        } else if (isIdentifier(currentToken)) {
            tokens.push({ type: 'identifier', value: currentToken, line: lineNumber });
        } else if (isConstant(currentToken)) {
            tokens.push({ type: 'constant', value: currentToken, line: lineNumber });
        } else {
            console.error(`Error at line ${lineNumber}: Invalid token "${currentToken}"`);
            return;
        }
    }

    return tokens;
}

// Read file content
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const tokens = analyzeTokens(data);
    if (tokens) {
        console.log('Tokens:', tokens);
    }
});

/* INPUT as atxt file
int main() {
    int a = 10;
    float b = 20.5;
    if (a < b) {
        a = a + 1;
    } else {
        b = b - 1.5;
    }
}
*/

/*OUTPUT
Tokens: [
  { type: 'keyword', value: 'int', line: 1 },
  { type: 'identifier', value: 'main', line: 1 },
  { type: 'punctuator', value: '(', line: 1 },
  { type: 'punctuator', value: ')', line: 1 },
  { type: 'punctuator', value: '{', line: 1 },
  { type: 'keyword', value: 'int', line: 2 },
  { type: 'identifier', value: 'a', line: 2 },
  { type: 'operator', value: '=', line: 2 },
  { type: 'constant', value: '10', line: 2 },
  { type: 'punctuator', value: ';', line: 2 },
  { type: 'keyword', value: 'float', line: 3 },
  { type: 'identifier', value: 'b', line: 3 },
  { type: 'operator', value: '=', line: 3 },
  { type: 'constant', value: '20.5', line: 3 },
  { type: 'punctuator', value: ';', line: 3 },
  { type: 'keyword', value: 'if', line: 4 },
  { type: 'punctuator', value: '(', line: 4 },
  { type: 'identifier', value: 'a', line: 4 },
  { type: 'operator', value: '<', line: 4 },
  { type: 'identifier', value: 'b', line: 4 },
  { type: 'punctuator', value: ')', line: 4 },
  { type: 'punctuator', value: '{', line: 4 },
  { type: 'identifier', value: 'a', line: 5 },
  { type: 'operator', value: '=', line: 5 },
  { type: 'identifier', value: 'a', line: 5 },
  { type: 'operator', value: '+', line: 5 },
  { type: 'constant', value: '1', line: 5 },
  { type: 'punctuator', value: ';', line: 5 },
  { type: 'punctuator', value: '}', line: 6 },
  { type: 'keyword', value: 'else', line: 6 },
  { type: 'punctuator', value: '{', line: 6 },
  { type: 'identifier', value: 'b', line: 7 },
  { type: 'operator', value: '=', line: 7 },
  { type: 'identifier', value: 'b', line: 7 },
  { type: 'operator', value: '-', line: 7 },
  { type: 'constant', value: '1.5', line: 7 },
  { type: 'punctuator', value: ';', line: 7 },
  { type: 'punctuator', value: '}', line: 8 }
]

*/



