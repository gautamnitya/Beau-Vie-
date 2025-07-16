import TopNavbar from "./TopNavbar";
import BottomCategoryBar from "./BottomCategoryBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <TopNavbar firstName={localStorage.getItem("first_name")} />
      <BottomCategoryBar />
      <Outlet />
    </>
  );
};

export default Layout;
