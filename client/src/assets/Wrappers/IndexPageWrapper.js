import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("./src/assets/indexPage.png");
  background-size: cover;
  background-position: center;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  .container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    grid-template-areas: "image-side controls-side";
    height: 100vh;
    width: 100vw;
    margin-left: 20%;

    .controls-side {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 5rem;
      margin-right: 2rem;

      h1 {
        font-weight: 400;
        font-size: 32px;
        justify-self: center;
      }

      .button-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
      }
    }

    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 2rem;
      gap: 2rem;
      /* margin-right: 5rem; */

      img {
        border-radius: 20px;
        height: 10rem;
        width: 10rem;
      }

      p {
        font-size: 18px;
      }
    }

    /** media queries */
    @media only screen and (max-width: 540px) {
      /* background-image: none !important; */
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("./src/assets/indexsmall.jpg");
      background-size: cover;
      background-position: center;
      text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
      box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
      color: white;
      margin: 0;

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 4rem;
      }

      .controls-side h1 {
        font-size: 22px;
      }
      .controls-side {
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-right: 0;
        padding-left: 2%;
        padding-right: 2%;
      }

      .img-container {
        width: 100%;
        height: 20rem;
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 0;
        margin-bottom: 5rem;
      }

      .button-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
`;
