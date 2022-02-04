import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BLogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link></div>)}
    </div>
  )
}

export default BLogList