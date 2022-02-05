import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h4>Create new</h4>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <div>
            <Form.Label className='labelForm'>Author:</Form.Label>
            <Form.Control
              className='blogForm'
              type='text'
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <Form.Label className='labelForm'>Title:</Form.Label>
            <Form.Control
              className='blogForm'
              type='text'
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <Form.Label className='labelForm'>Url:</Form.Label>
            <Form.Control
              className='blogForm'
              type='text'
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button type='submit' id="create" variant='dark'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog