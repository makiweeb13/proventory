import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './util/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes />} >
          <Route index element={<Dashboard />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
