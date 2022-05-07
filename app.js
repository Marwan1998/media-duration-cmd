#!/user/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from "nanospinner";


const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
async function welcome(){
    const rainbowAnimation = chalkanimation.rainbow('Hello, welcome to media duration package \npowerd by Marwan Algadi');
    await sleep();
    rainbowAnimation.stop();
    console.log(`${chalk.bgGray("\nProvide a correct path to calculate the video or audio files' time\n")}`);
}
await welcome();


let path = '';
async function getPath(){
    const input = await inquirer.prompt({
        name: 'path',
        type: 'input',
        message: 'Enter the path of files:',
        default(){
            return 'C:\\';
        },
    });

    const spinner = createSpinner('calculating...').start();
    await sleep();
    if(input.path != 'C:\\'){
        spinner.success({text: 'correct path'});
        return input.path;
    }else{
        spinner.error({text: `wrong path provided, ${chalk.bgRed('exiting...')}`});
        process.exit(1);
    }
}

path = await getPath();
console.log(path);



// the rest of program
console.log("HERE");




