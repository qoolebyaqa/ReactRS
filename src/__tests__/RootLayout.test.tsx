import { render, screen } from "@testing-library/react";
import RootLayout from "../pages/RootLayout";
import { createMemoryRouter, RouteObject, RouterProvider } from "react-router";
import MainComponent from "../components/MainComponent";


const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <MainComponent />,
      },
    ],
  },
];
const renderWithRouter = (_ui: React.ReactElement, { route = '/' } = {}) => {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return render(<RouterProvider router={router}></RouterProvider>);
};

describe('RootLayout component', () => {
  it('renders the main element', () => {
    renderWithRouter(<RootLayout />);
    const mainElement = screen.getByTestId('main-item');
    expect(mainElement).toBeInTheDocument();
  });
})