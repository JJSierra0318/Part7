import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Menu from './components/Menu'
import BLogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'

import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import { userLogin, userLogout } from './reducers/userReducer'
import { Route, Switch } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { Form, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(userLogin(user))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(userLogin(user))
      dispatch(setNotification(`${user.name} welcome back!`, 'success', 5))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error', 5))
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(blog))
      dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(userLogout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div className='container' id='loginForm'>
        <h2>LOGIN</h2>

        <Notification notification={notification} />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
              <Form.Label className='labelForm'>Username:</Form.Label>
              <Form.Control
                type='text'
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <Form.Label className='labelForm'>Password:</Form.Label>
              <Form.Control
                type='password'
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button type='submit' id='login'>login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu user={user} handleLogout={handleLogout}/>
      <Notification notification={notification} />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <h2>Blogs</h2>
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <BLogList />
        </Route>
      </Switch>

    </div>
  )
}

export default App