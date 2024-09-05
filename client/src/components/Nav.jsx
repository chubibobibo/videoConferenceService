import { Button } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";
import { useState } from "react";

/** @loggedUser props passed from Banner.jsx. Data that comes from the react query to fetch logedUser  */
function Nav({ userData, handleHidden, isHidden }) {
  const navigate = useNavigate();

  /** @handleClickLogout handles logging out and redirection to the login page */
  const handleClickLogout = async () => {
    await axios.post("/api/users/logout");
    toast.success("User logged out");
    return navigate("/login");
  };

  const [isShowPwd, setIsShowPwd] = useState(false);

  /** @handleShowPwd */
  const handleShowPwd = () => {
    setIsShowPwd(!isShowPwd);
  };

  return (
    <>
      <img src='' alt='' />
      <div className='nav'>
        {userData ? (
          <>
            {" "}
            <p>
              Welcome <span>{userData?.data?.user?.username}</span>
            </p>
            <Button size='sm' color='white' onClick={handleClickLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {" "}
            <p>Welcome Guest</p>
            <Button size='sm' color='white' onClick={handleHidden}>
              Login
            </Button>
            {!isHidden && (
              <div className='modal-container'>
                <LoginModal
                  handleShowPwd={handleShowPwd}
                  isShowPwd={isShowPwd}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default Nav;
