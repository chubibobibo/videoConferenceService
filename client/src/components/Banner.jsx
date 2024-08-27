import { Wrapper } from "../assets/Wrappers/BannerWrapper";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

function Banner() {
  return (
    <Wrapper>
      <div className='image-container'>
        <img src='../src/assets/ConvoFlow.png' alt='' />
      </div>
      <h1>ConvoFlow</h1>
      <p>An accessible and secure video conference solution</p>
      <div className='roomInput-container'>
        <input type='text' className='room-input' />
        <div className='button-container'>
          <Button size='lg'>Create call</Button>
          <Button>Join call</Button>
        </div>
      </div>
    </Wrapper>
  );
}
export default Banner;
