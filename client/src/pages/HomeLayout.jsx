/**@Outlet renders child components in the parent component */
import { Outlet } from "react-router-dom";
function HomeLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
export default HomeLayout;
