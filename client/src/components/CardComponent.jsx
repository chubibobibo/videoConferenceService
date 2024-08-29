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

/** react icons */
import { IoEye, IoEyeOff } from "react-icons/io5";

import { Form } from "react-router-dom";
import { useState } from "react";

function CardComponent({
  title,
  btnLabel,
  linkLabel,
  btnType,
  linkTxt,
  linkRef,
}) {
  /** state to handle the eye icon for displaying password */
  const [isHidden, setIsHidden] = useState(true);

  /** @handleHidden changes the eye icon and changes the type of input(password / text) */
  const handleHidden = () => {
    setIsHidden(!isHidden);
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
        </CardHeader>
        <Form method='post'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Username' size='lg' type='text' name='username' />
            <Input
              label='Password'
              size='lg'
              type={isHidden ? "password" : "text"}
              name='password'
              icon={
                isHidden ? (
                  <IoEye onClick={handleHidden} className='cursor-pointer' />
                ) : (
                  <IoEyeOff onClick={handleHidden} className='cursor-pointer' />
                )
              }
            />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
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
export default CardComponent;
