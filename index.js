import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "crypto";
import { appendFileSync} from "node:fs";
const maxAttempts=3;


const num = randomInt(1,11);

console.log(chalk.magenta.bold("Guess the number"))
console.log(chalk.white("Guess a whole number between 1 and 10"));
console.log(chalk.yellow(`you have ${maxAttempts} attempts!`));
appendFileSync("game-log.txt",`\nGuess the number\nGuess a whole number between 1 and 10\nyou have ${maxAttempts} attempts!\n`);
let attempts = 0;
let won = false;

while(attempts<maxAttempts && !won){
    const response = await prompts({
        type: "text",
        name: "guess",
        message: `Attempts ${attempts+1}/${maxAttempts} Enter your guess:`
    });
appendFileSync("game-log.txt",`Attempt ${attempts + 1}/${maxAttempts} Enter your guess: ${response.guess ?? "[canceled]"}\n`);
    try{
        const input = response.guess;
        attempts++;

        if(input === undefined){
            console.log(chalk.yellow("Game canceled."));
            appendFileSync("game-log.txt", "Game canceled.\n");
            process.exit();
        }
        
        if (input.trim() === ""){
            throw new Error("A guess is required.");
        }
        const guess = Number(input);

        if(!Number.isInteger(guess)){
            throw new Error("Only whole numbers");
        }

        if(guess<= 0){
            throw new Error("Guess must be at least 1.");
        }

        if(guess>10){
            throw new Error("Guess cannot exceed 10.");
        }
        if (guess === num){
            won = true;
            console.log(chalk.green("Correct!, you guessed the number!"));
            appendFileSync("game-log.txt", "Correct!, you guessed the number! "+ guess +"\n");
        } else if(guess < num){
            console.log(chalk.yellow("Too low!"));
            appendFileSync("game-log.txt", "Too low!\n");

        } else if(guess > num){
            console.log(chalk.yellow("Too high!"));
            appendFileSync("game-log.txt", "Too high!\n");
        }
        
    } catch(error){
        console.log(chalk.red(error.message));
        appendFileSync("game-log.txt", error.message+"\n");
    }


}
    if (!won){
        console.log('\n')
        console.log(chalk.red("GAME OVER!"));
        appendFileSync("game-log.txt", "GAME OVER!\n");
        console.log(chalk.white(`The secret number was ${num}`));
        appendFileSync("game-log.txt", "The secret number was "+num+"\n");

        console.log();


    }

console.log(chalk.magenta("Thanks for playing! "));
appendFileSync("game-log.txt", "\n");