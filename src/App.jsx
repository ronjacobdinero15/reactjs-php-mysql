import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from './component/UserList'
import Add from './component/Add'
import Edit from './component/Edit'

function App() {
  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-center">
        <b>
          PHP React.js CRUD Application -{' '}
          <span className="text-primary">Create Delete Data API - 8</span>
        </b>
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:user_id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
