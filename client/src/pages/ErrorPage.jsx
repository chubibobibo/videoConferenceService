import { useRouteError } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <main className='flex justify-center flex-col items-center'>
      {error.status === 404 ? (
        <img
          src='../src/assets/404.png'
          className='sm:h-[40rem] w-auto h-[15rem]'
        />
      ) : (
        <img src='.src/assets/error.png' className='w-fit' />
      )}
      <Link to='/'>
        {" "}
        <Button className='w-52'>Back to Homepage</Button>
      </Link>
    </main>
  );
}
export default ErrorPage;
