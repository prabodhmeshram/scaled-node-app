const { readFile, readdir } = require("fs").promises;
const { to } = require('await-to-js');
const CustomError = require('../utils/error');
const bmiService = require('./bmiService');

const consumerService = {
    async consumeData(){
        // Dump data in data folder in chunks and dump 
        const producerDir = `${process.cwd()}/app/data/produced`;
        const [error, fileNames] = await to(readdir(producerDir));

        if(error){
            throw "Server exception";
        }

        if(!fileNames.length){
            throw new CustomError('Noting to process', 500);
        }

        const readPromises = fileNames.map(async (fileName)=>{
            return new Promise(async (resolve,reject)=>{
                const [errData, strData] = await to(readFile(`${producerDir}/${fileName}`));
                if(errData){
                    return reject(errData.message);
                }
                const data = JSON.parse(strData);
                const computedBMI = data.map((d)=> bmiService.calculateBMI(d.WeightKg,d.HeightCm)).map((bmiValue)=> bmiService.getBMIInfo(bmiValue));
                resolve(computedBMI);
            })
        });

        return Promise.all(readPromises)
        .then((values)=>{
            return values.flat();
        }).catch(ex=>{
            console.log(ex);
            throw ex.message;
        })
    }
}

module.exports = consumerService;