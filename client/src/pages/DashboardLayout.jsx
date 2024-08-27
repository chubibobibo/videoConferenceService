import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

function DashboardLayout() {
  return (
    <>
      <Banner />
      <Outlet />
    </>
  );
}
export default DashboardLayout;
