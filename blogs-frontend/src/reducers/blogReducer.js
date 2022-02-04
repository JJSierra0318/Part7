import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return[...state, action.data]
  case 'LIKE_BLOG': {
    const changedBlog = action.data
    return state.map(blog => blog.id === changedBlog.id ? changedBlog : blog)
  }
  case 'REMOVE_BLOG': {
    const deletedBlog = action.data
    return state.filter(blog => blog.id !== deletedBlog)
  }
  case 'COMMENT': {
    const commentedBlog = action.data
    return state.map(blog => blog.id === commentedBlog.id ? commentedBlog : blog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const newBlog = content => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const user = blog.user
    const toVote = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const data = await blogService.update(toVote)
    dispatch({
      type: 'LIKE_BLOG',
      data: { ...data, user: user }
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const data = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      data
    })
  }
}

export default blogReducer