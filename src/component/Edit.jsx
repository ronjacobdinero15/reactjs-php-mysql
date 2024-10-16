import React, { useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

function Edit() {
  let navigate = useNavigate()

  const { user_id } = useParams()

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })

  const handleChange = event => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const fetchUserData = () => {
    fetch(
      `http://localhost/react-php-mysql/phpreactcrud/api/action.php?id=${user_id}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText)
        }
        return response.json()
      })
      .then(data => {
        setUser(data)
      })
      .catch(error =>
        console.error('There was a problem with the fetch operation:', error)
      )
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    fetch(
      `http://localhost/react-php-mysql/phpreactcrud/api/action.php?id=${user_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    )
      .then(response => response.json())
      .then(data => {
        navigate('/')
      })
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Edit User</div>
          <div className="col-md-6">
            <Link to="/" className="btn btn-success btn-sm float-end">
              View All
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">&nbsp;</div>
          <div className="col-md-4">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input type="submit" className="btn btn-primary" value="Edit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
