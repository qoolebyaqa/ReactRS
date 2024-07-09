import { Outlet } from "react-router";
import HeaderNavigation from "../components/HeaderNavigation";

function RootLayout() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <Outlet />
      </main>
    </> 

   );
}

export default RootLayout;