/** material tailwind */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

/** react icons */
import { IoEye, IoEyeOff } from "react-icons/io5";

import { Form } from "react-router-dom";
import { useState } from "react";

function CardComponentRegister({
  title,
  btnLabel,
  linkLabel,
  btnType,
  linkTxt,
  linkRef,
}) {
  /** state to handle the eye icon for displaying password */
  const [isHiddenPwd1, setIsHiddenPwd1] = useState(true);
  const [isHiddenPwd2, setIsHiddenPwd2] = useState(true);

  /** @handleHidden changes the eye icon and changes the type of input(password / text) */
  const handleHiddenPwd1 = () => {
    setIsHiddenPwd1(!isHiddenPwd1);
  };
  const handleHiddenPwd2 = () => {
    setIsHiddenPwd2(!isHiddenPwd2);
  };

  return (
    <>
      <Card className='w-98 h-fit '>
        <CardHeader
          variant='gradient'
          //   color='custom-gray'
          className='mb-4 grid h-82 place-items-center '
        >
          <img src='./src/assets/ConvoFlow.png' alt='' />
          {/* <Typography variant='h3' color='white'>
            {title}
          </Typography> */}
        </CardHeader>
        <Form method='post'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Username' size='lg' type='text' name='username' />
            <Input label='First name' size='lg' type='text' name='firstName' />
            <Input label='Last name' size='lg' type='text' name='lastName' />
            <Input label='Email' size='lg' type='email' name='email' />
            {/** password 1 */}
            <Input
              label='Password'
              size='lg'
              type={isHiddenPwd1 ? "password" : "text"}
              name='pwd1'
              icon={
                isHiddenPwd1 ? (
                  <IoEye
                    onClick={handleHiddenPwd1}
                    className='cursor-pointer'
                  />
                ) : (
                  <IoEyeOff
                    onClick={handleHiddenPwd1}
                    className='cursor-pointer'
                  />
                )
              }
            />

            {/** password 2 */}
            <Input
              label='Re-enter your password'
              size='lg'
              type={isHiddenPwd2 ? "password" : "text"}
              name='pwd2'
              icon={
                isHiddenPwd2 ? (
                  <IoEye
                    onClick={handleHiddenPwd2}
                    className='cursor-pointer'
                  />
                ) : (
                  <IoEyeOff
                    onClick={handleHiddenPwd2}
                    className='cursor-pointer'
                  />
                )
              }
            />

            <Button variant='gradient' fullWidth type={btnType}>
              {btnLabel}
            </Button>
          </CardBody>
        </Form>
        <CardFooter className='pt-0'>
          <Typography variant='small' className='mt-6 flex justify-center'>
            {linkTxt}
            <Typography
              as='a'
              href={linkRef}
              variant='small'
              color='blue-gray'
              className='ml-1 font-bold'
            >
              {linkLabel}
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}
export default CardComponentRegister;
