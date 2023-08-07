const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')







blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1})
  response.json(blogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)


  
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})




blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    const body = request.body
    
    const user = request.user


  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  const user = request.user
  const userid = user.id

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).send({error: "Invalid"})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedEntry = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  if (updatedEntry) {
    response.status(200).json(updatedEntry);
  } else {
    response.status(404).send({ error: 'Blog not found' });
  }
});


module.exports = blogsRouter