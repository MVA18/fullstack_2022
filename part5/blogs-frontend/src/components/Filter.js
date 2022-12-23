const Filter = ({blogs, setFilteredBlogs, setSearch}) => {

    const filterBlogs = (event) =>
    {
        const filteredBlogs = blogs.filter(blog => {
            return blog.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilteredBlogs(filteredBlogs)
        setSearch(true)
    }

    return (
        <div>
            filter shown with <input onChange={filterBlogs}/>
        </div>
    )
}

export default Filter