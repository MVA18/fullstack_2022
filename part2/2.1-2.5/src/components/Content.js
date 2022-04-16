const Total = ({ parts }) => {

    const sum = parts.reduce((accumulator, {exercises}) => {
        return accumulator + exercises;
    }, 0);

    return (<p><strong>total of {sum} exercises</strong></p>)
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        { parts.map(part =>
            <Part key={part.id} part={part}/>
        )}
        <Total parts={parts} />
    </>

export default Content