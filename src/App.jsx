import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailVideo } from './pages/DetailVideo';
import { Login } from './pages/Login';
import LoginAuth from './utils/LoginAuth';
import { Product } from './pages/Product';
import { Register } from './pages/Register';
import { AddProduct } from './pages/AddProduct';
import PrivateRoute from './utils/PrivateRoute';
import { VideoPage } from './pages/Video';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/watch/:id',
      element: <DetailVideo />,
    },
    {
      path: '/product',
      element: <Product />,
    },
    {
      path: '/login',
      element: (
        <LoginAuth>
          <Login />
        </LoginAuth>
      ),
    },
    {
      path: '/register',
      element: (
        <LoginAuth>
          <Register />
        </LoginAuth>
      ),
    },
    {
      path: '/add-product',
      element: (
        <PrivateRoute>
          <AddProduct />
        </PrivateRoute>
      ),
    },
    {
      path: '/video',
      element: (
        <PrivateRoute>
          <VideoPage />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
