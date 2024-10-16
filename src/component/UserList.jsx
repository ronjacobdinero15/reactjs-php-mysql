import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const apiUrl =
      'http://localhost/react-php-mysql/phpreactcrud/api/action.php'

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
  }, [])

  const handleDelete = user_id => {
    if (confirm('Are your sure you want to remove it?')) {
      fetch(
        `http://localhost/react-php-mysql/phpreactcrud/api/action.php?id=${user_id}`,
        {
          method: 'DELETE',
        }
      )
        .then(response => response.json())
        .then(data => {
          setUsers(prevUser => prevUser.filter(user => user.id !== user_id))
        })
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <b>User Data</b>
          </div>
          <div className="col-md-6">
            <Link to="/add" className="btn btn-success btn-sm float-end">
              Add
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
