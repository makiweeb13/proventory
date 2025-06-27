import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './util/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Products from './components/Products';
import PageLayout from './components/PageLayout';
import Categories from './components/Categories';
import Users from './components/Users';
import Sales from './components/Sales';
import Profile from './components/Profile';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes />} >
          <Route element={<PageLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
