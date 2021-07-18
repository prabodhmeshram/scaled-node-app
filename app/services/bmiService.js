const bmiService = {
    
    calculateBMI(mass, height){
        const heightInMeter = height/100;
        return Math.round((mass/Math.pow(heightInMeter,2))*100)/100;
    },

    getBMIInfo(bmiValue){
        bmiValue = Math.round(bmiValue * 10) / 10;
        if(bmiValue <= 18.4){
            return { bmi_category : 'Underweight', health_risk: 'Malnutrition risk' } ;
        }

        if(bmiValue >= 18.5 && bmiValue <= 24.9){
            return { bmi_category : 'Normal weight', health_risk: 'Low risk' } ;
        }

        if(bmiValue >= 25 && bmiValue <= 29.9){
            return { bmi_category : 'Overweight', health_risk: 'Enhanced risk' } ;
        }

        if(bmiValue >= 30 && bmiValue <= 34.9){
            return { bmi_category : 'Moderately obese', health_risk: 'Medium risk' } ;
        }

        if(bmiValue >= 35 && bmiValue <= 39.9){
            return { bmi_category : 'Severely obese', health_risk: 'High risk' } ;
        }
        
        return { bmi_category : 'Very severely obese', health_risk: 'Very high risk' } ;
    }

}

module.exports = bmiService;