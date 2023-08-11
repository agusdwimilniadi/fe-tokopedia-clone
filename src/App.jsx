import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailVideo } from './pages/DetailVideo';
import { Login } from './pages/Login';
import LoginAuth from './utils/LoginAuth';
import { Product } from './pages/Product';

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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
