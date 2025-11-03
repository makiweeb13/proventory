import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './util/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import PermittedRoutes from './util/PermittedRoutes';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Products from './components/Products';
import PageLayout from './components/PageLayout';
import Categories from './components/Categories';
import Users from './components/Users';
import Sales from './components/Sales';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import Transactions from './components/Transactions';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />} >
          <Route element={<PageLayout />} >
            <Route index element={<Dashboard />} />
            <Route element={<PermittedRoutes />} >
              <Route path="/users" element={<Users />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
            </Route>
            <Route path="/sales" element={<Sales />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
