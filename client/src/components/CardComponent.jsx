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

import { Form } from "react-router-dom";

function CardComponent({ title, btnLabel, linkLabel, btnType }) {
  return (
    <>
      <Card className='w-96'>
        <CardHeader
          variant='gradient'
          color='gray'
          className='mb-4 grid h-28 place-items-center'
        >
          <Typography variant='h3' color='white'>
            {title}
          </Typography>
        </CardHeader>
        <Form method='post'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Username' size='lg' type='text' name='username' />
            <Input label='Password' size='lg' type='password' name='password' />
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
            Don&apos;t have an account?
            <Typography
              as='a'
              href='#signup'
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
