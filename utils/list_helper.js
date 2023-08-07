var _ = require('lodash');


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return sum
}

const favouriteBlog = (blogs) => {
  const max = blogs.reduce((max, blog) => {
    return Math.max(max, blog.likes)
  }, 0)
  return blogs.find(blog => blog.likes === max)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const maxAuthor = _.maxBy(_.keys(authors), (o) => { return authors[o] })
  return {
    author: maxAuthor,
    blogs: authors[maxAuthor]
  }
}

const authorLikes = (blogs) => {

  const likesByAuthor = _.reduce(blogs, (result, blog) => {
    if (result[blog.author]) {
      result[blog.author] += blog.likes;
    } else {
      result[blog.author] = blog.likes;
    }
    return result;
  }, {});


  const maxAuthor = _.maxBy(_.keys(likesByAuthor), (author) => { return likesByAuthor[author] });

  return {
    author: maxAuthor,
    likes: likesByAuthor[maxAuthor]
  };
};




module.exports = {
  dummy,
  totalLikes,
  favouriteBlog, 
  mostBlogs,
  authorLikes}