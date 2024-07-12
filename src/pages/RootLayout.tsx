import { Outlet } from "react-router";
import MainComponent from "../components/MainComponent";
import HeaderNavigation from "../components/HeaderNavigation";

function RootLayout() {
  return (
    <>
      <HeaderNavigation />
      <main style={{display: "flex", margin: "0 auto"}}>
      <MainComponent />
      <Outlet />
      </main>
    </> 

   );
}

export default RootLayout;