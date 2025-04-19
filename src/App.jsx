import './styles/App.css'
import LayoutMaster from './components/LayoutMaster/LayoutMaster'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FallBack from './pages/FallBack';
import Gestor from './pages/Gestor';
import Cozinha from './pages/Cozinha';
import Consumidor from './pages/Consumidor';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './pages/Signup';
import ProtectedRoute from './protectedRoutes/protectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMaster />,
    errorElement: <FallBack />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/gestor', element: <ProtectedRoute element={<Gestor />} allowsRoles={"gestor"} /> },
      { path: '/cozinha', element: <ProtectedRoute element={<Cozinha />} allowsRoles={"cozinha"} /> },
      { path: '/consumidor', element: <ProtectedRoute element={<Consumidor />} allowsRoles={"consumidor"} /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Signup /> },
    ]
  },

]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )

}

export default App
