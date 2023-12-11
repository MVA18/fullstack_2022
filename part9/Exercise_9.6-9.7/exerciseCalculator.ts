interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface exerciseArguments {
    hours: number[],
    target: number
}

const parseExerciseArguments = (hours: string[], target: number): exerciseArguments => {
    if (hours.length < 1) {
        throw new Error('Not enough hours arguments');
    }

    if (isNaN(target)) {
        throw new Error('Provided target is not a number!');
    }

    const numberHours: number[] = [];

    hours.forEach(value => {
        const hourValue = parseFloat(value);
        if (isNaN(hourValue)) {
            throw new Error('Provided hour value is not a number!');
        } else if (hourValue > 24) {
            throw new Error('Provided hours exceed the maximum limit of 24!');
        } else if (hourValue < 0) {
            throw new Error('Provided hours cannot be negative!');
        }

        numberHours.push(hourValue);
    })

    return {
        hours: numberHours,
        target: target
    }
}

const ratingDescription = (rating: number): string => {

    switch (true) {
        case (rating > 0):
            return 'Not too bad but could be better'
        case (rating > 1 && rating < 3):
            return 'You are passing this weeks target exercise hours'
        case (rating > 3):
            return 'Your are doing an amazing job'
        default:
            return 'You are not doing anything'
    }

}

const exerciseData = (args: exerciseArguments): Result => {

    const periodLength = args.hours.length
    const trainingDays = args.hours.filter(x => x > 0).length
    const average = args.hours.reduce((total: number, num: number) => total + num, 0) / periodLength
    const success = (average >= args.target)
    const rating = Math.round(average)

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription(rating),
        target: args.target,
        average: average,
    }
}

export const exerciseCalculator = (hours: string[], target: number) : Result|string => {

try {
    const exerciseArguments: exerciseArguments = parseExerciseArguments(hours, target)
    return exerciseData(exerciseArguments)

} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    return errorMessage
}
}