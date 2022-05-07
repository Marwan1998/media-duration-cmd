#!/user/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from "nanospinner";


const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));
async function welcome(){
    const rainbowAnimation = chalkanimation.rainbow('Hello fucking hard world! \n');
    await sleep();
    rainbowAnimation.stop();
    console.log(`${chalk.bgGray("Put any colored text here")}`);
}
// await welcome();

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
    handlePath(input.path != 'C:\\');
    return input.path;
}


async function handlePath(isPath){
    const spinner = createSpinner('calculating...').start();
    await sleep(2000);
    if(isPath)
        spinner.success({text: 'correct path'});
    else{
        spinner.error({text: 'wrong path provided, exiting...'});
        process.exit(1);
    }
}

// path = await getPath();

console.log(await getPath());