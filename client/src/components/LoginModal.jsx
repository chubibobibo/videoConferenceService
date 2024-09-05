import { IoEye, IoEyeOff } from "react-icons/io5";

import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

/** material tailwind */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

/** @isShowPwd state that manages the displaying of the password and changing of eye icon*/
/** @handleShowPwd function to toggle isShowPwd*/

function LoginModal({ isShowPwd, handleShowPwd }) {
  const navigate = useNavigate();

  /** @loginData state that contain data for the login */
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/login", loginData);
      toast.success("User logged in");
      navigate("/dashboard/roomTable");
    } catch (err) {
      console.log(err);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  };

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <Input
        label='Username'
        size='lg'
        type='text'
        name='username'
        color='white'
        onChange={handleChange}
      />
      <Input
        label='Password'
        size='lg'
        type={!isShowPwd ? "password" : "text"}
        name='password'
        color='white'
        onChange={handleChange}
        icon={
          isShowPwd ? (
            <IoEye onClick={handleShowPwd} className='cursor-pointer' />
          ) : (
            <IoEyeOff onClick={handleShowPwd} className='cursor-pointer' />
          )
        }
      />
      <Button variant='gradient' fullWidth type={"submit"}>
        Login
      </Button>
    </Form>
  );
}
export default LoginModal;
