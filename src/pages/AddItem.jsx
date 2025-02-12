import { useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { createItem } from '../services/apiShelves'

function AddItem() {
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()
  const { shelf_id } = useParams()

  const { mutate } = useMutation({
    mutationFn: () => createItem({ item_name: itemName, price }, shelf_id),
    onSuccess: () => navigate(`/shelf/${shelf_id}`),
  })

  const handleSubmit = e => {
    e.preventDefault()
    mutate()
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Add A New Item</div>
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
                <label htmlFor="item_name">Item Name</label>
                <input
                  type="text"
                  id="item_name"
                  name="item_name"
                  className="form-control"
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="form-control"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input type="submit" className="btn btn-primary" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddItem
