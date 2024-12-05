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

  .modal-container {
    background-color: rgba(38, 45, 57, 0.5);
    height: 20%;
    width: 25%;
    z-index: 0;
    top: 50%;
    left: 55%;
    transform: translate(65%, -200%);
    position: absolute;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nav {
    width: 80%;
    display: flex;
    justify-content: end;
    align-items: center;
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

    .form {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

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
      border: 2px solid green;
      border-radius: 10px;
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

  @media only screen and (max-width: 1850px) {
    .roomInput-container {
      /* display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column; */
      padding: 1rem;
      gap: 1rem;
      width: 40%;

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        width: 90%;
      }

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 20%;
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
      /* padding: 1rem; */
      gap: 1rem;
      width: 90%;
      margin: 0;

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        width: 90%;
      }

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 70%;
        margin-top: 0%;
        align-content: center;
      }
    }
  }

  @media only screen and (max-width: 1400px) {
    .roomInput-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      width: 90%;
      margin: 0;

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        width: 90%;
      }

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 63%;
        margin-top: 1%;
        align-content: center;
      }
    }
  }

  /* @media only screen and (max-width: 435px) {
    p {
      font-size: 15px;
      margin-bottom: 10px;
    }
    .nav {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;

      p {
        font-size: 16px;
      }

      .modal-container {
        width: 80%;
        height: 30%;
        z-index: 0;
        top: 45%;
        left: 2%;
        position: absolute;
        transform: translate(10%, -120%);
        background-color: rgba(38, 45, 57, 1);
      }
    }
    .roomInput-container {
      padding: 1rem;
      gap: 1rem;
      width: 90%;

      .roomInput-container p {
        font-size: 12px;
      }

      .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        width: 100%;
      }

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        width: 100%;
      }

      .icon {
        margin-left: 65%;
        margin-top: 2%;
        align-content: center;
      }
    }
  } */

  /* @media only screen and (min-width: 1020px) {
    .roomInput-container {
      padding: 1rem;
      gap: 1rem;
      width: 90%;

      .room-input {
        border: 2px solid green;
        border-radius: 10px;
        max-width: 100%;
      }

      .icon {
        margin-left: 65%;
        margin-top: 1%;
        align-content: center;
      }
    }
  } */
`;
