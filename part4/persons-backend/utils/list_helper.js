var _ = require('lodash');

const dummy = (blogs) => {
    return blogs.first().count();
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item['likes']
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = blogs => {
    var res = Math.max(...blogs.map(o => o.likes))
    return blogs.length === 0 ? 0 : (({ title, author, likes }) => ({ title, author, likes }))(blogs.find(function(o){ return o.likes === res; }))
}

const mostBlogs = blogs => {
    var res = Math.max(...blogs.map(o => o.likes))
    return blogs.length === 0 ? 0 : (({ author, blogs }) => ({ author, blogs }))(blogs.find(function(o){ return o.blogs === res; }))
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs
}