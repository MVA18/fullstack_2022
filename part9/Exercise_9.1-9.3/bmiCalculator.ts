interface BMIValues {
    mass: number
    height: number
  }
  
  const parseBmiArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        mass: Number(args[3])
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
  
  try {
    const { height, mass } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, mass))

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }