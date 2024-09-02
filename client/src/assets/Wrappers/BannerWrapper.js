import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../src/assets/banner1.jpg);
  height: 30rem;
  background-size: cover;
  background-position: center;
  /* opacity: 0.75; */
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;

  .nav {
    width: 90%;
    display: flex;
    justify-content: end;
    gap: 10px;
  }

  .image-container {
    width: 8rem;
    height: 8rem;
    /* margin-top: -3%; */
  }

  img {
    border-radius: 10px;
  }

  h1 {
    font-size: 58px;
  }

  p {
    font-size: 22px;
  }

  /** container for the input text to enter room name */
  .roomInput-container {
    width: 35%;
    /* height: 100%; */
    background-color: white;
    margin-top: 2rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .icon {
      position: absolute;
      color: black;
      margin-left: 17%;
      /* margin-left: 20%; */
      cursor: pointer;
      width: 2rem;
      height: 2rem;
    }

    /** text input for room */
    .room-input {
      width: 60%;
      height: 3rem;
      color: black;
      border: 1px solid white;
      padding: 5px;
      margin-right: 2%;
    }
    .room-input:hover {
      border: 2px solid green;
      border-radius: 10px;
    }
    /** @outline removes border color */
    .room-input:focus {
      outline: none !important;
      /* border-color: green; */
      border: 2px solid green;
      border-radius: 10px;
    }

    .button-container {
      display: flex;
      gap: 1rem;
    }
  }

  @media only screen and (max-width: 1790px) {
    .roomInput-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      width: 40%;

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 30%;
        margin-top: 0.5%;
        align-content: center;
      }
    }
  }
  @media only screen and (max-width: 1080px) {
    .roomInput-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      width: 50%;

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 80%;
      }

      /* .icon {
        margin-left: 40%;
        margin-top: 2%;
        align-content: center;
      } */
    }
  }

  @media only screen and (max-width: 435px) {
    .roomInput-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      width: 90%;

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 60%;
        margin-top: 2%;
        align-content: center;
      }
    }
  }
`;
