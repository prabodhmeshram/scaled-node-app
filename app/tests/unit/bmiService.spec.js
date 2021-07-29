const bmiService = require("../../services/bmiService");


describe("Methods", () => {
	describe("calculateBMI", () => {
		it("Should calculate BMI for height and weight", ()=>{
			expect(bmiService.calculateBMI(75, 175)).toBe(24.49);
		});
	});

	describe("getBMIInfo", () => {
		// Data driven tests
		const testCases = [{
			title : "Should have Malnutrition risk as response",
			data : 2.045,
			result : { BmiCategory : "Underweight", HealthRisk: "Malnutrition risk" }
		},{
			title : "Should have low risk as response",
			data : 19.22,
			result : { BmiCategory : "Normal weight", HealthRisk: "Low risk" }
		},{
			title : "Should have Enhanced risk as response",
			data : 28.01,
			result : { BmiCategory : "Overweight", HealthRisk: "Enhanced risk" }
		},{
			title : "Should have Medium risk as response",
			data : 32,
			result : { BmiCategory : "Moderately obese", HealthRisk: "Medium risk" }
		},{
			title : "Should have High risk as response",
			data : 39.9,
			result : { BmiCategory : "Severely obese", HealthRisk: "High risk" }
		},{
			title : "Should have Very high risk as response",
			data : 56,
			result : { BmiCategory : "Very severely obese", HealthRisk: "Very high risk" }
		},{
			title : "Should have Enhanced risk as response when rounding off the bmi value",
			data : 24.967,
			result : { BmiCategory : "Overweight", HealthRisk: "Enhanced risk" }
		}
		];

		testCases.map(test=>{
			const { title, data, result} = test;
			it(title, ()=>{
				expect(bmiService.getBMIInfo(data)).toEqual(result) ;
			});
		});
	});
    
});
