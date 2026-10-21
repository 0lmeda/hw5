import chalk from "chalk";
import prompts from "prompts";

const maxAttempts=3;

const crypto = require('crypto');
const num = crypto.randomInt(1,10);

console.log(chalk.magenta.bold("Guess the number"));
console.log(chalk.white("Guess a whole number between 1 and 10"));
console.log(chalk.yellow(`you have ${maxAttempts} attempts!`));


const response = await prompts({
    type: "text",
    name: "guess",
    message: "Enter your guess:"
});

console.log(chalk.blue(`${response.guess}`));