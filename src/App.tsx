import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import DescriptionCard from './components/DescriptionCard';
import { getPokemons } from './api';
import { GlobalStateType, IPokeItem } from './types';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokeActions } from './store';

export const MyThemeContext = createContext({theme: false, updateTheme: (a: boolean) => {a}});

function App() {
  const theme = useSelector((state: GlobalStateType) => state.PokeStore.theme);
  const dispatch = useDispatch();
  function updateTheme(bool: boolean) {
    dispatch(pokeActions.toogleTheme(bool));
  }
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
    <MyThemeContext.Provider value={{theme, updateTheme}}>
    <RouterProvider router={router} /></MyThemeContext.Provider>
  )
}

export default App
