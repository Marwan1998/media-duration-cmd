#!/user/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from "nanospinner";
import fs from 'fs';
import {getVideoDurationInSeconds} from 'get-video-duration';


let path = '';
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
const myBrand = '\nMG45', line = '\n' + '-'.repeat(65);

console.clear();

console.log(gradient.pastel(figlet.textSync(myBrand, {
  font: 'Big Money-se',
  horizontalLayout: 'fitted',
  verticalLayout: 'ontrolled smushing',
  width: 80,
  whitespaceBreak: true
})));
//Other two colors for myBrand, to use, put figlet.textSync({}) in the data param in gradinet
// console.log(gradient.rainbow(data));
// console.log(gradient('red', 'green')(data, {interpolation: 'hsv', hsvSpin: 'long'}));

await welcome();

path = await getPath();

const pathName = path + "\\"

//files calculation 
const readDirPromise = new Promise((resolve, reject) => {
  let durSum = 0;
  fs.readdir(pathName, async (err, files) => {
    if (!err) {
      for (const file of files) {
        const fullPath = pathName + file;
        await getVideoDurationInSeconds(fullPath)
        .then((duration) => {
          durSum += duration;
        })
        .catch((videoErr) => {
            console.log(chalk.bgRed(chalk.black("Video Error:\n")) + chalk.red("Non media files will be just ignored\n") + videoErr + chalk.green(line));
        });
      }
      resolve(durSum);
    } else {
      console.error(chalk.red("Could not do it!\nDirectory Error: it could be wrong path provided"));
      reject(err);
    }
  });
});


readDirPromise.then(durSum => {
  const time = {
    //TODO: Add colors to the table
    Seconds: getMinutes(durSum).sec + 's',
    minutes: getMinutes(durSum).min + 'm',
    hours: getMinutes(durSum).hour + 'h',
  }
  console.log(gradient.pastel(line));
  console.table(time);
  console.log(gradient.pastel(line));
  by(); //fun call
}).catch(err => {
  console.log(err, chalk.green(line));
  process.exit(1);
});


//--------------------All Function--------------------

function getMinutes(num) {
  return {
    sec: Math.round(num),
    min: Math.round((num / 60) * 100) / 100,
    hour: Math.round((num / (60 * 60)) * 100) / 100,
  };
}

async function welcome(){
  const rainbowAnimation = chalkanimation.rainbow('Hello, welcome to media duration package \n \tpowerd by Marwan Algadi');
  await sleep();
  rainbowAnimation.stop();
  console.log(`${chalk.bgGray("\nProvide a correct path to calculate the video or audio files' time \n")}`);
}

async function by(){
const rainbowAnimation = chalkanimation.rainbow('This package powerd by Marwan Algadi');
await sleep(3000);
rainbowAnimation.stop();
console.log(chalk.bgRed(myBrand));
// console.log(gradient.rainbow(myBrand));
}

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
  await sleep(1000);
  if(input.path != 'C:\\'){
      spinner.success({text: 'correct path'});
      return input.path;
  }else{
      spinner.error({text: `please provide a valid path, ${chalk.bgRed('exiting...')}`});
      process.exit(1);
  }
}

