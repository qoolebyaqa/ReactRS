import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import DescriptionCard from './components/DescriptionCard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/ReactRS/',
      element: <RootLayout />,      
      children: [{path: '/ReactRS/:namePokemon', element: <DescriptionCard />}],
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
