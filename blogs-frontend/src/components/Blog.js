import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  if(!blog) return null

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(id, content))
  }

  return (
    <div>
      <div>
        <h3>{blog.title} by {blog.author}</h3>
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username===user.username&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name='comment'/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, id) =>
          <li key={id}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog