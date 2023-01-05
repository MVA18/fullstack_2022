var _ = require('lodash')

const dummy = (blogs) => {
    return blogs.first().count()
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
    var authorArray = _.map(blogs,'author');
    var mostCommonAuthor = _.chain(authorArray).countBy().toPairs().maxBy(_.last).value();

    return blogs.length === 0 ? 0 : (blogs.length === 1) ? blogs[0] : {
        author: mostCommonAuthor[0],
        blogs: mostCommonAuthor[1]
    }
}

const mostLikes = blogs => {
    const getMostLikes = (blogs) => blogs
        .reduce(({ sums,most }, { likes, author }) => {
            sums[author] = likes = (sums[author] || 0) + likes
            if (likes > most.likes) most = { author,likes }
            return { sums,most }
        }, { sums: {}, most: { likes:0 } })
        .most

    return blogs.length === 0 ? 0 : getMostLikes(blogs)
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}