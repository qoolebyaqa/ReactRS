import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './components/MainComponent';
import GreetingPage from './pages/GreetingPage';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/ReactRS',
      element: <RootLayout />,      
      children: [{ path: '/ReactRS', element: <MainPage />}, { path: '/ReactRS/greeting', element: <GreetingPage />}],
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
