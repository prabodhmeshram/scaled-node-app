const fs = require("fs");
const ndjson = require("ndjson");
const bmiService = require("./app/services/bmiService");

const targetFilePath = `${process.cwd()}/app/data/test.txt`;

if(!fs.existsSync(targetFilePath)){
	throw new Error("File not found");
}

fs.createReadStream(targetFilePath)
	.pipe(ndjson.parse())
	.on("data", function(obj) {
	//Do the processing logic
		const BMI = bmiService.calculateBMI(obj.WeightKg,obj.HeightCm);
		const healthParams = bmiService.getBMIInfo(BMI); 
		fs.appendFile(`${process.cwd()}/app/data/output.txt`,JSON.stringify({...obj, BMI, ...healthParams})+"\n",(err)=>{
			if(err){
				console.log("Error writing to file.");
			}else{
				console.log("saved content");
			}
		});
	}).on("end",()=>{
		console.log("Success");
	}).on("error",(err)=>{
		console.log(err.message);
	});