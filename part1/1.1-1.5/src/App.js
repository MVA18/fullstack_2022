import Counter from "./Counter"
import StateCounter from "./StateCounter"

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }



    const Part = ({ name, exercises }) => { return ( <p>{name} {exercises}</p> )}

    const Content = ({parts}) => {
        return (
            <div>
                {parts && parts.length > 0 &&
                    parts.map((part, index) => (
                        < Part key={index} name={part.name} exercises={part.exercises}/>
                    ))}
            </div>
        )
    }

    const Footer = ({parts}) => {
        const total = parts.reduce((t,v) =>  t + v.exercises , 0 );
        return ( <p>Number of exercises {total}</p> )
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Footer parts={course.parts}/>
            <Header course={"Counter"}/>
            <Counter/>
            <Header course={"State Counter"}/>
            <StateCounter/>
        </div>
    )
}

export default App