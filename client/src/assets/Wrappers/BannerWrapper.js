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
    width: 40rem;
    height: 4rem;
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
      cursor: pointer;
    }

    /** text input for room */
    .room-input {
      width: 20rem;
      height: 3rem;
      color: black;
      border: 1px solid white;
      padding: 5px;
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
`;
