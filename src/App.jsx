import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailVideo } from './pages/DetailVideo';
import { Login } from './pages/Login';

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
      path: '/login',
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
