import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import { paths } from './helpers';


function App() {
  const router = createBrowserRouter([
    {
      path: '/ReactRS/',
      element: <RootLayout />,      
      children: paths,
      errorElement: <ErrorPage />
    }
  ]);

  return (<RouterProvider router={router} />)
}

export default App
