const bmiService = {
    
	calculateBMI(mass, height){
		const heightInMeter = height/100;
		return Math.round((mass/Math.pow(heightInMeter,2))*100)/100;
	},

	getBMIInfo(bmiValue){
		bmiValue = Math.round(bmiValue * 10) / 10;
		if(bmiValue <= 18.4){
			return { BmiCategory : "Underweight", HealthRisk: "Malnutrition risk" } ;
		}

		if(bmiValue >= 18.5 && bmiValue <= 24.9){
			return { BmiCategory : "Normal weight", HealthRisk: "Low risk" } ;
		}

		if(bmiValue >= 25 && bmiValue <= 29.9){
			return { BmiCategory : "Overweight", HealthRisk: "Enhanced risk" } ;
		}

		if(bmiValue >= 30 && bmiValue <= 34.9){
			return { BmiCategory : "Moderately obese", HealthRisk: "Medium risk" } ;
		}

		if(bmiValue >= 35 && bmiValue <= 39.9){
			return { BmiCategory : "Severely obese", HealthRisk: "High risk" } ;
		}
        
		return { BmiCategory : "Very severely obese", HealthRisk: "Very high risk" } ;
	},

	processBMIData(targetFilePath){
		const self = this;
		const fs = require("fs");
		const ndjson = require("ndjson");

		if(!targetFilePath){
			targetFilePath = `${process.cwd()}/app/data/test.txt`;
		}

		if(!fs.existsSync(targetFilePath)){
			return Promise.reject(new Error("File not found"));
		}

		return new Promise((resolve,reject)=>{
			return fs.createReadStream(targetFilePath)
				.pipe(ndjson.parse())
				.on("data", function(obj) {
					//Do the processing logic
					const BMI = self.calculateBMI(obj.WeightKg,obj.HeightCm);
					const healthParams = self.getBMIInfo(BMI); 
					fs.appendFile(`${process.cwd()}/app/data/output.txt`,JSON.stringify({...obj, BMI, ...healthParams})+"\n",(err)=>{
						if(err){
							console.log("Error writing to file.");
						}else{
							console.log("saved content");
						}
					});
				}).on("end",()=>{
					resolve("Success");
				}).on("error",(err)=>{
					reject(err.message);
				});
		});
	}

};

module.exports = bmiService;