import { Button } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/** @loggedUser props passed from Banner.jsx. Data that comes from the react query to fetch logedUser  */
function Nav({ loggedUser }) {
  const navigate = useNavigate();

  /** @handleClickLogout handles logging out and redirection to the login page */
  const handleClickLogout = async () => {
    await axios.post("/api/users/logout");
    toast.success("User logged out");
    return navigate("/login");
  };

  const handleClickRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <img src='' alt='' />
      <div className='nav'>
        {loggedUser ? (
          <>
            {" "}
            <p>Welcome {loggedUser?.data?.user?.username}</p>
            <Button size='sm' color='white' onClick={handleClickLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {" "}
            <p>Welcome Guest</p>
            <Button size='sm' color='white' onClick={handleClickRedirect}>
              Login
            </Button>
          </>
        )}
      </div>
    </>
  );
}
export default Nav;
