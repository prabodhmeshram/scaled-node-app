const { writeFile } = require("fs").promises;
const CustomError = require("../utils/error");

const chunkSize = 2;

const producerService = {
	async putData(data){
		// Dump data in data folder in chunks and dump 
		if(!data.length){
			throw new CustomError("Invalid data", 422);
		}

		let i,j;
		let chunkArrayData = [];
		for (i = 0,j = data.length; i < j; i += chunkSize) {
			chunkArrayData.push(data.slice(i, i + chunkSize));
		}

		const time = (new Date()).getTime();
		const producerDir = `${process.cwd()}/app/data/produced`;
		const writePromises = chunkArrayData.map((chunk,i) => writeFile(`${producerDir}/${time}-${i}.txt`, JSON.stringify(chunk)));

		return Promise.all(writePromises).then(()=>{
			return "Success";
		}).catch(ex=>{
			console.log(ex);
			throw ex.message;
		});
	}
};

module.exports = producerService;