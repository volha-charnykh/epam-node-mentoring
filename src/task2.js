import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const csvFilePath = './csv/nodejs-hw1-ex2.csv';
const txtFilePath = './output/nodejs-hw1-ex2.txt'

const requiredFieldNames = ['book', 'author', 'price'];
const numericalKeys = ['price'];

pipeline(
    createReadStream(csvFilePath),
    csv().subscribe((json) => {
            console.log('New chunk');
            console.log(json);
            Object.keys(json).forEach(key => {
                if (requiredFieldNames.includes(key.toLowerCase())) {
                    if (numericalKeys.includes(key.toLowerCase())) {
                        json[key.toLowerCase()] = +json[key];
                    } else {
                        json[key.toLowerCase()] = json[key];
                    }
                }
                delete json[key];
            });
            console.log('Transformed');
            console.log(json);
            // emulate long operation to check line by line execution
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        },
        (error) => console.error(error)),
    createWriteStream(txtFilePath),
    (error) => error ? console.error(error) : console.log('Done!')
)
