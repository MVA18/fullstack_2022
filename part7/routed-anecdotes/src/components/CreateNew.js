import  { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.data.value,
            author: author.data.value,
            info: info.data.value,
            votes: 0
        })
    }

    const reset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    content
                    <input {...content.data} />
                </div>
                <div>
                    author
                    <input {...author.data} />
                </div>
                <div>
                    url for more info
                    <input {...info.data} />
                </div>
                <button>create</button>
                <button onClick={ reset }>reset</button>
            </form>
        </div>
    )

}

export default CreateNew