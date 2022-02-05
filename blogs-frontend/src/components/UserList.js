import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div className='UserList'>
      <h2>Users</h2>
      <Table bordered>
        <thead>
          <tr className='tableHeader'>
            <th />
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList