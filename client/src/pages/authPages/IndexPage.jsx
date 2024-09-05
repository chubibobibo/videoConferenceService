/** Styled componentes*/
import { Wrapper } from "../../assets/Wrappers/IndexPageWrapper";
import { Button } from "@material-tailwind/react";

import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <Wrapper>
      <div className='container'>
        <div className='image-side'></div>
        <div className='controls-side'>
          <div className='img-container'>
            <img src='./src/assets/ConvoFlow.png' alt='' />
            <h1>Connect. Communicate. Collaborate</h1>
            <p>
              Connect effortlessly with anyone, anywhere, through seamless video
              conferencing.
            </p>
          </div>
          <div className='button-container'>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
            <Link to='/register'>
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default IndexPage;
