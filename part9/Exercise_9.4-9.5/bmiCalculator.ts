interface BMIValues {
    massValue: number
    heightValue: number
  }
  
  const parseBmiArguments = (height: string, weight: string): BMIValues => {
  
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      return {
        heightValue: Number(height),
        massValue: Number(weight)
      }
    } else {
      throw new Error('Provided values were not numbers!')
    }
  }
  
  const calculateBmi = (height: number, mass: number): String => {

    const bmi = (mass / ((Math.round(height) / 100) ** 2))

    if(bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)'
    }
    else if(bmi < 18.5) {
        return 'Underweight (unhealthy weight)'
    }
    else if(bmi > 24.9) {
        return 'Overweight (unhealthy weight)'
    }
    else if(bmi > 29.9) {
        return 'Obese (unhealthy weight)'
    }
    
    return 'Could not determine'
  }
  
  export const bmiCalculator = (height: string, weight: string): String => {
    try {
      const { heightValue, massValue } = parseBmiArguments(height, weight)
      return calculateBmi(heightValue, massValue)
  
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.'
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
      }
      return errorMessage
    }
  }
  