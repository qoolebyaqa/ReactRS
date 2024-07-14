import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import DescriptionCard from './components/DescriptionCard';
import { getPokemons } from './api';
import { IPokeItem } from './types';

function App() {
  const router = createBrowserRouter([
    {
      path: '/ReactRS/',
      element: <RootLayout />,      
      children: [{path: '/ReactRS/:namePokemon', element: <DescriptionCard />, loader: async ({params}) => {
        const items: IPokeItem[] = await getPokemons();
        const isExistRoute = items.find(item => item.name === params.namePokemon)
        if (isExistRoute) {
          return isExistRoute
        } else {
          throw new Error('not found')
        }
      }}],
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
